import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Nivel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nivel: string
}