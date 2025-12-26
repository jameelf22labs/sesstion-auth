import { DataTypes, Model } from "@sequelize/core";
import {
  Attribute,
  AutoIncrement,
  Default,
  NotNull,
  PrimaryKey,
  Unique,
  Table,
} from "@sequelize/core/decorators-legacy";
import { v4 as uuid } from "uuid";

@Table({ tableName: "userdetails" })
export default class User extends Model {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @Attribute(DataTypes.DATE)
  @Default(() => new Date())
  declare createdAt: Date;

  @Attribute(DataTypes.DATE)
  declare lastLoginAt: Date;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare isActive: boolean;

  @Attribute(DataTypes.STRING)
  @Default(() => uuid())
  declare uuid: string;
}
