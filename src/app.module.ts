import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; //mongoose
import { ConfigModule } from '@nestjs/config'; // for env files

// modules
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PublishModule } from './publish/publish.module';

// Controllers
import { AppController } from './app.controller';
// SERVICES
import { AppService } from './app.service';

// for env file path for config
import { getEnvPath } from './common/helpers/env.helper';
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'sample',
    }),
    UserModule,
    AuthModule,
    PublishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
