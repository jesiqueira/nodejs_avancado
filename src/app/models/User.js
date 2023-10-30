import { Model, DataTypes, Sequelize } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: DataTypes.STRING,
            },
            {
                sequelize,
                modelName: 'User',
                name: {
                    singular: 'user',
                    plural: 'users',
                },
            }
        )
        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        })
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User
