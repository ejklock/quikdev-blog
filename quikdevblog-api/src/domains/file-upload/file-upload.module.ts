import { Module } from '@nestjs/common';
import { StorageModule } from 'src/storage/storage.module';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [StorageModule],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
