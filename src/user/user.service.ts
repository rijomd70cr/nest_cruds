import { Injectable, Logger, Inject } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDecerotorDocument } from '../schema/userDecerotorSchema';
import { RegisterDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('UserDecorator')
    private userDeceratorModel: Model<UserDecerotorDocument>,
  ) {}
  private readonly logger = new Logger(UserService.name);

  @Inject(ConfigService)
  public config: ConfigService;

  // crreate user
  async createUser(userData: RegisterDto): Promise<UserDecerotorDocument> {
    try {
      const { email } = userData;
      const user = await this.userDeceratorModel.findOne({ email });
      if (user) {
        throw new NotAcceptableException(this.config.get('USER_EXIST'));
      } else {
        const saltOrRounds = 10;
        const salt = bcrypt.genSaltSync(saltOrRounds);
        const hash = bcrypt.hashSync(userData.password, salt);
        userData.password = hash;

        const createdUser = new this.userDeceratorModel(userData);
        await createdUser.save();
        return createdUser;
      }
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  // find one item
  async findByLogin(
    emailId: string,
  ): Promise<UserDecerotorDocument | undefined> {
    try {
      const user = await this.userDeceratorModel
        .findOne({ email: emailId })
        .select('email password _id');
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
