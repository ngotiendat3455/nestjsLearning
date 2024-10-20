import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeader, ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { UploadsService } from './providers/uploads.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enum/auth-type.enum';
import { diskStorage } from 'multer';

@Auth(AuthType.None)
@Controller('uploads')
export class UploadsController {

    constructor(
        private readonly uploadService: UploadsService
    ){}

    @UseInterceptors(FileInterceptor('file'))
    @ApiHeaders([
        { name: 'Content-Type', description: 'multipart/form-data' },
        { name: 'Authorization', description: 'Bearer Token' },
    ])
    @ApiOperation({
        summary: `Upload a new image to the server`,
    })
    @Post('file')
    public uploadFile(@UploadedFile() file: Express.Multer.File){
        console.log(file); // Handle file here
        return this.uploadService.uploadFile(file);
    }
}
