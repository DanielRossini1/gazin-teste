import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Nivel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nivel: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at'  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at'  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at'  })
  deletedAt?: Date;
}