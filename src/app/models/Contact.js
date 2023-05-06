import { Model, DataTypes } from 'sequelize'

class Contacts extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                status: DataTypes.ENUM('ACTIVE', 'ARCHIVED'),
            },
            {
                sequelize,
                modelName: 'Contacts',
            }
        )
    }

    static associations(models) {
        this.belongsTo(models.Customer, { foreignKey: 'customer_id' })
    }
}

export default Contacts
