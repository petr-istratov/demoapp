import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Contract } from './Contract';

@Table
export class Job extends Model<Job> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(12, 2))
  price!: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  paid?: boolean;

  @Column(DataType.DATE)
  paymentDate?: Date;

  @ForeignKey(() => Contract)
  @Column(DataType.UUIDV4)
  contractId: string;

  @BelongsTo(() => Contract)
  contract: Contract;
}
