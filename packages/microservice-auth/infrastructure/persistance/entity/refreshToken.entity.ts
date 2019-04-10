import { Entity, PrimaryColumn, Unique, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'refreshToken' })
export class RefreshTokenEntity {
  @PrimaryColumn('uuid', { nullable: false })
  public id!: string;

  @Index({ unique: true })
  @Column('text', { unique: true, nullable: false })
  public refreshToken!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
