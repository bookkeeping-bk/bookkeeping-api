import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Test from '../database/entitys/test.entity';
import TestService from "./test.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Test])
  ],
  providers: [TestService],
  exports: [TestService]
})

class TestModule {}

export default TestModule
