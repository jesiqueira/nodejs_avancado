import { Op } from 'sequelize'
import { parseISO } from 'date-fns'
import * as Yup from 'yup'
import User from '../models/User'

class UsersController {
    async index(req, res) {
        const { name, email, createdBefore, createdAfter, updatedBefore, updatedAfter, sort } = req.query
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
            const data = await User.findAll({
                attributes: { exclude: ['password', 'password_hash'] },
                where,
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

    async show(req, res) {
        const user = await User.findOne({
            where: {
                id: req.params.id,
            },
            attributes: { exclude: ['password_hash'] },
        })

        if (!user) {
            return res.status(404).json()
        }

        return res.json(user)
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            passwordConfirmation: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Error ao validar schema' })
        }

        const { id, name, email, updatedAt, createdAt } = await User.create(req.body)

        return res.status(201).json({ id, name, email, updatedAt, createdAt })
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string().when('oldPassword', {
                is: (oldPassword) => !!oldPassword,
                then: () => Yup.string().min(8).required('A senha é obrigatória quando a senha antiga é fornecida.'),
            }),
            // O bloco then é executado quando a condição definida em is for verdadeira
            passwordConfirmation: Yup.string().when('password', {
                is: (password) => !!password, //is: (oldPassword) => !!oldPassword: Esta é a condição da validação condicional. Ela verifica se o campo "oldPassword" existe e não é uma string vazia ou nula. Se isso for verdadeiro, a validação condicional será ativada.
                then: () =>
                    Yup.string()
                        .oneOf([Yup.ref('password')])
                        .required(),
            }),
            // O oneOf()faz com que a validação siga pelo menos um tipo específico a ser definido em uma lista que é passada como parâmetro
            //  já o ref() retorna a referência de um item quando passado o nome do mesmo.
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Campos password e passwordConfirmation são Obrigatório quando informado oldPassword.' })
        }

        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.status(404).json()
        }

        const { oldPassword } = req.body

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Senha de Usuário não confere!' })
        }

        const { id, name, email, updatedAt, createdAt } = await user.update(req.body)

        return res.status(201).json({ id, name, email, updatedAt, createdAt })
    }

    async destroy(req, res) {
        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.status(404).json()
        }

        await user.destroy()

        return res.json()
    }
}

export default new UsersController()
