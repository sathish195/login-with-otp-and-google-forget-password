import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface OtpAttributes {
    id: number;
    user_id: number;
    otp: number;
    email: string;


    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface OtpInput extends Optional<OtpAttributes, "id"> { }

export interface OtpOutput extends Required<OtpAttributes> { }

class Otp
    extends Model<OtpAttributes, OtpInput>
    implements OtpAttributes {
    public id!: number;
    public user_id!: number;
    public otp!: number;
    public email!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Otp.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        otp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        }

    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true,
    }
);

export default Otp;



