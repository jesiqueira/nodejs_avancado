import './database'

import Customers from './app/models/Customer'

class Playground {
    static async play() {
        const customers = await Customers.findAll()
        console.log(JSON.stringify(customers, null, 2));
    }
}

Playground.play()