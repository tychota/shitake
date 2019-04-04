import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Stream {
  @PrimaryGeneratedColumn('uuid')
  streamId!: string;

  @Column('int')
  version!: number;

  @Column('text')
  type!: string;
}
