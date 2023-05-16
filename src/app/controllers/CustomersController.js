import { Op } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import Customer from '../models/Customer'
import Contact from '../models/Contact'

class CustomersController {
    async index(req, res) {
        const { name, email, status, createdBefore, createdAfter, updatedBefore, updatedAfter, sort } = req.query
        const page = req.query.page || 1
        const limit = req.query.limit || 25

        let where = {}
        let order = []

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.iLike]: name,
                },
            }
        }
        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            }
        }
        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(',').map((item) => item.toUpperCase()),
                },
            }
        }
        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore), //lê uma String data e transforma em objeto data
                },
            }
        }
        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter), //lê uma String data e transforma em objeto data
                },
            }
        }
        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore), //lê uma String data e transforma em objeto data
                },
            }
        }
        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter), //lê uma String data e transforma em objeto data
                },
            }
        }

        if (sort) {
            order = sort.split(',').map((item) => item.split(':'))
        }

        try {
            const data = await Customer.findAll({
                where,
                include: [
                    {
                        model: Contact,
                        attributes: ['id', 'status'],
                    },
                ],
                order,
                limit,
                offset: limit * page - limit,
            })
            return res.json(data)
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
    //recuperar 1 Customer
    async show(req, res) {
        const customer = await Customer.findByPk(req.params.id)

        if (!customer) {
            return res.status(404).json()
        }

        return res.json(customer)
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Error ao validar schema' })
        }

        const customer = await Customer.create(req.body)

        return res.status(201).json(customer)
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Error ao validar schema' })
        }

        const customer = await Customer.findByPk(req.params.id)

        if (!customer) {
            return res.status(404).json()
        }

        await customer.update(req.body)

        return res.json(customer)
    }

    async destroy(req, res) {
        const customer = await Customer.findByPk(req.params.id)

        if (!customer) {
            return res.status(404).json()
        }

        await customer.destroy()
        return res.json()
    }
}

export default new CustomersController()
