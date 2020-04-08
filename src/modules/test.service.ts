import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Test from '../database/entitys/test.entity'

@Injectable()
class TestService {
  public constructor (
    @InjectRepository(Test) public readonly testRepo: Repository<Test>
  ){}
}

export default TestService
