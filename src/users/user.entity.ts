import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryColumn()
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
}