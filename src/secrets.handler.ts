import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SecretHandler {
  private readonly filePath = path.join(__dirname, '..', 'secrets.json');

  getSecret(key: string): any {
    const jsonData = fs.readFileSync(this.filePath, 'utf8');
    const data = JSON.parse(jsonData);
    return data[key];
  }
}