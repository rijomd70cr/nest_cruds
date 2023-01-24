import { existsSync } from 'fs';
import { resolve } from 'path';

// for environmental path
export function getEnvPath(envPath: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${envPath}/.env`);
  const filename: string = env ? `${env}.env` : '.env';

  let filePath: string = resolve(`${envPath}/${filename}`);
  if (!existsSync(filePath)) {
    filePath = fallback;
  }
  return filePath;
}

// for files
export class Helper {
  static customFileName(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = 'jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = 'png';
    } else {
      var extension = file.originalname.split('.').pop();
      fileExtension = extension;
    }
    const originalName = file.originalname.split('.')[0];
    cb(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
  }

  static destinationPath(req, file, cb) {
    cb(null, './images/');
  }
}
