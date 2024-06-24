import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';

export default interface IService<T extends BaseEntity> {
  getRepository(): Repository<T>;
}
