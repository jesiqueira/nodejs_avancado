import { Model, DataTypes } from 'sequelize'

class Customers extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                status: DataTypes.ENUM('ACTIVE', 'ARCHIVED'),
            },
            {
                sequelize,
                modelName: 'Customers',
            }
        )
    }
    static associations(models) {
        this.hasMany(models.Contact)
    }
}

export default Customers
