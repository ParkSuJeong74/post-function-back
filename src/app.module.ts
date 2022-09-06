import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validation } from './commons/utils';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

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
    }),
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
