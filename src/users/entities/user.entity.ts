import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    id: string

    @Column()
    pw: string
  
    @Column()
    name: string
  
    @Column()
    age: number
}
