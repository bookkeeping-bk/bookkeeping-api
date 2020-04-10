import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  imports: [TypeOrmModule.forRoot(require('./database/ormconfig'))],
  controllers: [],
  providers: [],
})
export class AppModule {}
