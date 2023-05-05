import Sequelize from 'sequelize'
import config from '../config/database'
import Customer from '../app/models/Customer'

const models = [Customer]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(config)

        models.forEach((model) => model.init(this.connection))
    }
}

export default new Database().connection

