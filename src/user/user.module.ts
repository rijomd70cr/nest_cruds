import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// SERVICES
import { UserService } from './user.service';
// scehma
import { UserDecerotorSchema } from '../schema/userDecerotorSchema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserDecorator', schema: UserDecerotorSchema },
    ]),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
