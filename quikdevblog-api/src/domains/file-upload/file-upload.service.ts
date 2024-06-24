import { Injectable, InternalServerErrorException } from '@nestjs/common';
import StorageService from 'src/storage/storage.service';
import { generateFileNameUUID } from 'src/utils/app.utils';

@Injectable()
export class FileUploadService {
  constructor(private storageService: StorageService) {}

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${generateFileNameUUID()}.${file.mimetype.split('/')[1]}`;
    try {
      const filePath = await this.storageService.upload(
        file.buffer,
        fileName,
        file.mimetype,
      );

      return {
        path: this.storageService.relativePath(fileName),
        url: this.storageService.url(filePath),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error while uploading file');
    }
  }
}
