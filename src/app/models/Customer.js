import { Model, DataTypes } from 'sequelize'

class Customers extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
            },
            {
                sequelize,
                modelName: 'Customers',
            }
        )
    }
}

export default Customers
