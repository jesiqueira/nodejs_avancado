import { Model, DataTypes } from 'sequelize'

class Customer extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                status: DataTypes.ENUM('ACTIVE', 'ARCHIVED'),
            },
            {
                sequelize,
                modelName: 'Customer',
            }
        )
    }
    static associate(models) {
        this.hasMany(models.Contact)
    }
}

export default Customer
