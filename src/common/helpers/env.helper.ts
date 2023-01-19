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