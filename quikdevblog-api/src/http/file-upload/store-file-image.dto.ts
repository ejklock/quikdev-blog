import { IsMimeType } from 'class-validator';

export default class StoreFileImageDto {
  @IsMimeType()
  file: Express.Multer.File;
}
