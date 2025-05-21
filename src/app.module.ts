// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_pg_user',
      password: 'your_pg_password',
      database: 'your_db_name',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // chỉ dùng ở môi trường dev!
    }),
    PostsModule,
  ],
})
export class AppModule {}
