import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface OtpAttributes {
    id: number;
    otp: number;
    ph_number: string;


    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface OtpInput extends Optional<OtpAttributes, "id"> { }

export interface OtpOutput extends Required<OtpAttributes> { }

class Otps
    extends Model<OtpAttributes, OtpInput>
    implements OtpAttributes {
    public id!: number;
    public otp!: number;
    public ph_number!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Otps.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
     
        otp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ph_number: {
            type: DataTypes.STRING,
            allowNull:false
            
        }

    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true,
    }
);

export default Otps;



