import { Module } from '@nestjs/common';
// modules
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
// Controllers
import { AuthController } from './auth.controller';
// SERVICES 
import { AuthService } from './auth.service';
import { LocalStrategy } from './jwt-verify/local.strategy';
import { JwtStrategy } from './jwt-verify/jwt.strategy';

// constants
import { jwtConstants } from './jwt-verify/auth.constants';

@Module({
    imports: [UserModule, PassportModule,
        JwtModule.register({
            secret: jwtConstants.SECRET,
            signOptions: { expiresIn: '3d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy,JwtStrategy],
})
export class AuthModule { }
