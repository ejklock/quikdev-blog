import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private readonly users = [
    {
      id: 1,
      name: 'john',
      email: 'johndoe@me.com',
      password: 'changeme',
    },
    {
      id: 2,
      name: 'maria',
      email: 'mariamaria@me.com',
      password: 'guess',
    },
  ];

  async store(name: string, email: string, password: string): Promise<User> {
    return this.userRepository.save({
      name,
      email,
      password,
    });
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findOneMock(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
