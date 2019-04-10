import { Entity, PrimaryColumn, Unique, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryColumn('uuid', { nullable: false })
  public id!: string;

  @Index({ unique: true })
  @Column('text', { unique: true, nullable: false })
  public email!: string;

  @Column('text', { nullable: false })
  public hashedPassword!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
