import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { Stream } from './stream.entity';

@Entity()
@Unique(['streamId', 'version'])
export class Event {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public sequenceNum!: number;

  @ManyToOne(type => Stream)
  @JoinColumn({ name: 'streamId' })
  public streamId!: string;

  @Column('int')
  public version!: number;

  @Column('jsonb')
  public data!: unknown;

  @Column('text')
  public type!: string;

  @Column('jsonb')
  public meta!: unknown;

  @CreateDateColumn()
  public logDate!: number;
}
