import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";


interface UsersAttributes {
    id: number;
    user_name: string;
    email: string;
    email_verifier: boolean;
    phone_number: string;
    phone_number_verifier: boolean;
    password_hashed: string;
    user_type: number;
    status: boolean;
    is_deleted: boolean;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

}

export interface UsersInput extends Optional<UsersAttributes, 'id'> { }
export interface UsersOutput extends Required<UsersAttributes> { }

class Users
    extends Model<UsersAttributes, UsersInput>
    implements UsersAttributes {

    public id!: number;
    public user_name!: string;
    public email!: string;
    public email_verifier!: boolean;
    public phone_number!: string;
    public phone_number_verifier!: boolean;
    public password_hashed!: string;
    public user_type!: number;
    public status!: boolean;
    public is_deleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    static Sync: any;

}
Users.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_verifier: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number_verifier: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        password_hashed: {
            type: DataTypes.STRING,
        },
        user_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true,
    }
);

export default Users