import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { CONTRACT_STATUSES } from '../constants/contract';
import { Job } from './Job';
import { Profile } from './Profile';

@Table
export class Contract extends Model<Contract> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  terms!: string;

  @Column(DataType.ENUM(...Object.values(CONTRACT_STATUSES)))
  status?: string;

  @ForeignKey(() => Profile)
  @Column(DataType.UUIDV4)
  contractorId: string;

  @BelongsTo(() => Profile, 'contractorId')
  contractor: Profile;

  @ForeignKey(() => Profile)
  @Column(DataType.UUIDV4)
  clientId: string;

  @BelongsTo(() => Profile, 'clientId')
  client: Profile;

  @HasMany(() => Job)
  jobs: Job[];
}
