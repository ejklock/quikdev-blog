import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

import storageConfig from 'src/config/storage.config';

import { normalizeUrl, trimChars } from 'src/utils/app.utils';
import StorageService from './storage.service';

@Injectable()
export class LocalStorageService extends StorageService {
  relativePath(filename: string, filepath?: string): string {
    let pathFile = normalizeUrl(this.config.localDir);
    if (filepath) {
      pathFile = normalizeUrl(path.join(pathFile, filepath));
    }
    pathFile = normalizeUrl(path.join(pathFile, filename));
    return pathFile;
  }
  setStorageHmlParams() {
    throw new Error('Method not implemented.');
  }
  fileExists(filename: string, filePath: string): Promise<boolean> | boolean {
    let pathFile = normalizeUrl(this.config.localDir);

    if (filePath) {
      pathFile = normalizeUrl(path.join(pathFile, filePath));
    }

    pathFile = normalizeUrl(path.join(pathFile, filename));

    const dirname = path.dirname(pathFile);

    return fs.existsSync(dirname);
  }
  constructor(
    @Inject(storageConfig.KEY) private config: ConfigType<typeof storageConfig>,
  ) {
    super();
  }

  public async upload(
    stream: any,
    filename: string,
    mimetype: string,
    filePath?: string,
  ): Promise<string> {
    let pathFile = normalizeUrl(path.join(this.config.localDir));

    if (filePath) {
      pathFile = normalizeUrl(path.join(pathFile, filePath));
    }

    pathFile = normalizeUrl(path.join(pathFile, filename));

    const dirname = path.dirname(pathFile);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }

    fs.writeFile(pathFile, stream, (err) => {
      if (!err) console.log('Data written');
    });

    return normalizeUrl(filename);
  }

  public url(filename: string, filePath?: string): string {
    let resultPath =
      trimChars(this.config.localUrl, '/') +
      '/' +
      normalizeUrl(this.config.localDir) +
      '/';
    if (filePath) {
      resultPath = new URL(path.join(resultPath, filePath)).toString();
    }
    resultPath = new URL(path.join(resultPath, filename)).toString();

    return resultPath;
  }

  public delete(fileName: string, filepath?: string): Promise<any> {
    let pathFile = path.join(this.config.localDir);

    pathFile = path.join(fileName);
    return fs.promises.unlink(pathFile); //TODO talvez retornar um boolean aqui
  }
}
