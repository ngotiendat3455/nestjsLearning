import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from "typeorm";
import { postStatus } from "./enums/post-status.enum";
import { PostType } from "./enums/post-type.enum";
import { CreatePostMetaOptionsDto } from "src/meta-options/dtos/create-post-meta-options.dto";
import { MetaOption } from "src/meta-options/meta-options.entity";
import { User } from "src/users/user.entity";
import { Tag } from "src/tags/tag.entity";


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
        enum: PostType,
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
        enum: postStatus,
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

    // tags: string[];

    @JoinColumn()
    @OneToOne(() => MetaOption, {
      cascade: true,
      eager: true,
    })
    metaOptions?: MetaOption;


    @ManyToOne(() => User, (user) => user.posts, {
      eager: true,
    })
    author: User

    @ManyToMany(() => Tag, {
      eager: true,
    })
    @JoinTable()
    tags?: Tag[]
}