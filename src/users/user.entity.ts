
import { Post } from "src/posts/post.entity"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
    })
    firstName: string
    
    @Column({
        type: 'varchar',
        length: 96,
        nullable: true,
    })
    lastName: string

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
        unique: true
    })
    email: string

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
      })
    password: string

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @Column({
        type: 'varchar'
    })
    googleId: string
}