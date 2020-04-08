import { Injectable } from '@nestjs/common';
import TestService from './modules/test.service';
// import RepoService from './repo.service'

@Injectable()
export class AppService {
  constructor (private readonly testService: TestService){}
  async getHello(): Promise<string> {
    // return 'Hello World!';
    return `Total books are ${await this.testService.testRepo.count()}`;
  }
}
