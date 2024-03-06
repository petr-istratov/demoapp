import { AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { PROFILE_TYPES } from '../constants/profile';
import { Contract } from './Contract';

@Table
export class Profile extends Model<Profile> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  profession!: string;

  @Column(DataType.DECIMAL(12, 2))
  balance?: number;

  @Column(DataType.ENUM(...Object.values(PROFILE_TYPES)))
  type?: string;

  @HasMany(() => Contract, 'contractorId')
  contractorContracts: Contract[];

  @HasMany(() => Contract, 'clientId')
  clientContracts: Contract[];
}
