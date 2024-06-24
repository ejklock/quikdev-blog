import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/utils/abstract.repository';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService extends BaseRepository<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }
}
