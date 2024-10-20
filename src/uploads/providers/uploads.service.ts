import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/file-types.enum';

@Injectable()
export class UploadsService {
    constructor(
        private readonly uploadToAwsProvider: UploadToAwsProvider,
        private readonly configService: ConfigService,
        @InjectRepository(Upload)
        private uploadsRepository: Repository<Upload>,
    ){}

    public async uploadFile(file: Express.Multer.File) {
        // throw error for unsupported MIME types
        if (
            !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
              file.mimetype,
            )
          ) {
            throw new BadRequestException('MIME type not supported');
          }
        try{
            // upload to the file to AWS s3
            const name = await this.uploadToAwsProvider.fileupload(file);
            // generate to a new  entry in database
            const uploadObj: UploadFile = {
                name: name,
                path: `https://${this.configService.get<string>('appConfig.awsCloudfrontUrl')}/${name}`,
                type: fileTypes.IMAGE,
                mime: file.mimetype,
                size: file.size,
            }

            // create an upload
            const upload = this.uploadsRepository.create(uploadObj);
            // save the details to database
            return await this.uploadsRepository.save(upload);
        } catch (error) {
            throw new ConflictException(error);
          }
    }
}
