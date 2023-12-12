// import { DataTypes, Model, Optional } from "sequelize";
// import sequelizeConnection from "../config";



// interface UserAttributes {
//     id: number,
//     user_name: string,
//     first_name:string,
//     password: string,
//     ph_no: string,
//     e_mail: string,

//     created_at?: Date,
//     updated_at?: Date,
//     deleted_at?: Date
// }

// export interface userInput extends Optional<UserAttributes, "id"> { }

// export interface userOutput extends Required<UserAttributes> { }

// class User
//     extends Model<UserAttributes, userInput>
//     implements UserAttributes {
   


//     public id!: number;
//     public user_name!: string;
//     public first_name!:string;
//     public last_name!:string;
//     public password!: string;
//     public ph_no!: string;
//     public e_mail!: string;

//     public readonly created_at!: Date;
//     public readonly updated_at!: Date;
//     public readonly deleted_at!: Date;
// }
// User.init(
//     {
//         id: {
//             type: DataTypes.INTEGER.UNSIGNED,
//             allowNull: false,
//             unique: true,
//             primaryKey: true,
//             autoIncrement: true
//         },
      
//         user_name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         first_name:{
//             type:DataTypes.STRING,
//             allowNull: true
//         },
      
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         ph_no: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         e_mail: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     },

//     {
//         timestamps: true,
//         sequelize: sequelizeConnection,
//         paranoid: true,
//     })

// export default User


