import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  @Inject(ConfigService)
  public config: ConfigService;

  public getHello(): string {
    console.log("hhhhh")
    const databaseName: string = this.config.get('USER_NOT_EXIST');

    return databaseName;
  }

}
