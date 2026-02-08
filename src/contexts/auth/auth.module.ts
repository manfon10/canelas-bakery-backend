import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import {
  GoogleLoginUseCase,
  RegisterUserUseCase,
  SendLoginCodeUseCase,
  VerifyLoginCodeUseCase,
} from './application';

import { GoogleOAuthAdapter, JwtAdapter } from './infraestructure/adapters';
import {
  GoogleLoginController,
  RegisterUserController,
  SendLoginCodeController,
  VerifiLoginCodeController,
} from './infraestructure/controllers';
import { getJwtConfig } from './infraestructure/config';
import { JwtAuthGuard } from './infraestructure/guards';
import { JwtStrategy } from './infraestructure/strategies';

import { MailModule } from '@/contexts/shared/adapters/email';

import { UserModule } from '@/contexts/users/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    MailModule,
    UserModule,
  ],
  controllers: [
    SendLoginCodeController,
    RegisterUserController,
    GoogleLoginController,
    VerifiLoginCodeController,
  ],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    {
      provide: 'AuthAdapter',
      useClass: GoogleOAuthAdapter,
    },
    {
      provide: 'JwtAdapter',
      useClass: JwtAdapter,
    },
    SendLoginCodeUseCase,
    RegisterUserUseCase,
    GoogleLoginUseCase,
    VerifyLoginCodeUseCase,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
