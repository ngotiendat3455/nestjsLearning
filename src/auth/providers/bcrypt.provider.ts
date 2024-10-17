import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider extends HashingProvider{
    async comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
        return await bcrypt.compare(data, encrypted);
    }
    async hashPassword(data: string | Buffer): Promise<string> {
        // Generate the salt
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(data, salt);
    }
}
