import { Model, DataTypes } from 'sequelize'

class Users extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password_hash: DataTypes.STRING,
                provaider: DataTypes.BOOLEAN,
            },
            {
                sequelize,
                modelName: 'Users',
            }
        )
    }
}

export default Users
