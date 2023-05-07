import { Model, DataTypes } from 'sequelize'

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password_hash: DataTypes.STRING,
            },
            {
                sequelize,
                modelName: 'User',
            }
        )
    }
}

export default User
