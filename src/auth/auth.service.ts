// common modules
import { Injectable, Logger, Inject } from '@nestjs/common';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// type of modal
import { UserDecerotorDocument } from '../schema/userDecerotorSchema';

// service of user
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);
  @Inject(ConfigService)
  public config: ConfigService;

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDecerotorDocument | undefined> {
    let user = await this.userService.findByLogin(email);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
    } else {
      return null; 
    }
  }

  async login(user: any): Promise<{ access_token: string; user: Object }> {
    const payload = { email: user.email, _id: user._id };
    let access_token = this.jwtService.sign(payload);
    let data = {
      access_token: access_token,
      user: { email: user.email },
    };
    return data;
  }

  // async validateUser(email: string, password: string): Promise<IUser | undefined> {
  //     try {
  //         let user = await this.userService.findByLogin(email);
  //         if (user) {
  //             if (bcrypt.compareSync(password, user.password)) {
  //                 return user;
  //             }
  //             else {
  //                 throw new UnauthorizedException(this.config.get('AUTH_FAILED'));
  //             }
  //         }
  //         else {
  //             throw new NotFoundException(this.config.get('USER_NOT_EXIST'));
  //         }
  //     } catch (error) {
  //         this.logger.error(error);
  //         throw new Error(error);
  //     }
  // }
}
