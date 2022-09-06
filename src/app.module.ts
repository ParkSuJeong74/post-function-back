import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validation } from './commons/utils';
import config from './commons/utils/config';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'development'
          ? '.development.env'
          : '.env',
      isGlobal: true,
      validationSchema: validation,
      load: [config],
    }),
    UserModule,
    PostModule,
    PrismaModule,
    HttpModule,
  ],
})
export class AppModule {}
