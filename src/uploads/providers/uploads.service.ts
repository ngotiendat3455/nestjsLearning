import { Injectable } from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadsService {
    constructor(
        private readonly uploadToAwsProvider: UploadToAwsProvider,
        @InjectRepository(Upload)
        private usersRepository: Repository<Upload>,
    ){}

    public async uploadFile(file: Express.Multer.File) {
        // upload to the file to AWS s3
        const name = await this.uploadToAwsProvider.fileupload(file);
        // generate to a new  entry in database
    }
}
