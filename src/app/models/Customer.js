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
    static associations(models) {
        this.hasMany(models.Contact)
    }
}

export default Customers
