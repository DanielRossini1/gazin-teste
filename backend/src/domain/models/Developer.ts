import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Nivel } from "./Nivel";

@Entity()
export class Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Nivel)
  @JoinColumn({ name: 'nivel_id' })
  nivelId: Nivel;

  @Column()
  nome: string;

  @Column({ type: 'char' })
  sexo: string;

  @Column({ name: 'data_nascimento' })
  dataNascimento: Date;

  @Column()
  idade: number;

  @Column()
  hobby: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at'  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at'  })
  deletedAt?: Date;
}