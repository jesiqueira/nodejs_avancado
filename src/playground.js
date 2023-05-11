import './database'

import Customer from './app/models/Customer'
import Contact from './app/models/Contact'

import { Op } from 'sequelize'

class Playground {
    static async play() {
        // const customers = await Customers.findAll({
        //     include: [
        //         //join
        //         {
        //             model: Contact,
        //             where: {
        //                 status: 'ACTIVE',
        //             },
        //             required: false,
        //         },
        //     ],
        //     where: {
        //         [Op.or]: {
        //             status: {
        //                 [Op.in]: ['ACTIVE', 'ARCHIVED'],
        //             },
        //             name: {
        //                 [Op.like]: '%mar',
        //             },
        //         },
        //         createdAt: {
        //             [Op.between]: [new Date(2023, 3, 6), new Date(2023, 5, 6)],
        //         },
        //     },
        //     //Ordenar
        //     order: [['name', 'DESC'], ['createdAt']],
        //     limit: 2,
        //     offset: 2 * 1 - 2, //limit * page - limit
        // })
        // console.log(JSON.stringify(customers, null, 2))

        //UPDATE
        // const customer = await Customer.findByPk(1)
        // console.log('Antes: ', JSON.stringify(customer, null, 2))

        // const newCustomer = await customer.update({ status: 'ARCHIVED' })
        // console.log('Depois: ', JSON.stringify(newCustomer, null, 2))

        //DESTROY
        const customer = await Customer.destroy(1)
        console.log('Antes: ', JSON.stringify(customer, null, 2))

    }
}

Playground.play()
