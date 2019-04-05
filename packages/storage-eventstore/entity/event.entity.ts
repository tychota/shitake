import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { Stream } from './stream.entity';

@Entity()
@Unique(['streamId', 'version'])
export class Event {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  sequenceNum!: number;

  @ManyToOne(type => Stream)
  @JoinColumn({ name: 'streamId' })
  streamId!: string;

  @Column('int')
  version!: number;

  @Column('jsonb')
  data!: unknown;

  @Column('text')
  type!: string;

  @Column('jsonb')
  meta!: unknown;

  @CreateDateColumn()
  logDate!: number;
}
