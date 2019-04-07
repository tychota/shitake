import { Entity, PrimaryColumn, Unique, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryColumn('uuid', { nullable: false })
  id!: string;

  @Index({ unique: true })
  @Column('text', { unique: true, nullable: false })
  email!: string;

  @Column('text', { nullable: false })
  hashedPassword!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
