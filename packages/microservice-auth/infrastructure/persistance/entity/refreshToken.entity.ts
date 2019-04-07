import { Entity, PrimaryColumn, Unique, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'refreshToken' })
export class RefreshTokenEntity {
  @PrimaryColumn('uuid', { nullable: false })
  id!: string;

  @Index({ unique: true })
  @Column('text', { unique: true, nullable: false })
  refreshToken!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
