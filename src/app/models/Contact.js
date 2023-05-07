import { Model, DataTypes } from 'sequelize'

class Contact extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                status: DataTypes.ENUM('ACTIVE', 'ARCHIVED'),
            },
            {
                sequelize,
                modelName: 'Contact',
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: 'customer_id' })
    }
}

export default Contact
