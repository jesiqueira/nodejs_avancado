import Customers from '../models/Customer'

// const customers = [
//     { id: 1, name: 'Dev Samurai', site: 'http://devsamurai.com.br' },
//     { id: 2, name: 'Google', site: 'http://google.com' },
//     { id: 3, name: 'UOL', site: 'http://uol.com.br' },
// ]

class CustomersController {
    async index(req, res) {
        try {
            const data = await Customers.findAll()
            return res.json(data)
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    show(req, res) {
        return res.json('show')
    }

    create(req, res) {
        return res.json('create')
    }

    update(req, res) {
        return res.json('create')
    }

    destroy(req, res) {
        return res.json('create')
    }
}

export default new CustomersController()
