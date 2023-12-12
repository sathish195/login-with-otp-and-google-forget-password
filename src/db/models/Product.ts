import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface ProductAttributes {
    id: number;
    product_name: string;
    product_cost:string;



    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface OtpInput extends Optional<ProductAttributes, "id"> { }

export interface OtpOutput extends Required<ProductAttributes> { }

class Products
    extends Model<ProductAttributes, OtpInput>
    implements ProductAttributes {
    public id!: number;
    public product_name!: string;
    public product_cost!: string;


    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    static Update: any;
}

Products.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            // allowNull:false
        },
        product_cost: {
            type: DataTypes.STRING,
            // allowNull: false,
        }

    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true,
    }
);

export default Products;



