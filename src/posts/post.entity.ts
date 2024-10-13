import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { postStatus } from "./enums/post-status.enum";
import { PostType } from "./enums/post-type.enum";
import { CreatePostMetaOptionsDto } from "./dtos/create-post-meta-options.dto";


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: false,
      })
    title: string;
    
    @Column({
        type: 'enum',
        nullable: false,
        default: PostType.POST
    })
    postType: PostType;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        unique: true,
      })
    slug: string;

    @Column({
        type: 'enum',
        nullable: false,
        default: postStatus.DRAFT
    })
    status: postStatus;

    @Column({
        type: 'text',
        nullable: true,
      })
    content: string;

    @Column({
        type: 'text',
        nullable: true,
      })
    schema: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true,
      })
    featuredImageUrl: string;

    @Column({
        type: 'timestamp', // 'datetime' in mysql
        nullable: true,
    })
    publishOn: Date;

    tags: string[];

    metaOptions?: CreatePostMetaOptionsDto[];
}