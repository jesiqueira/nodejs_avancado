import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import authConfig from '../../config/auth'

export default async (req, res, next) => {
    const authHeader = req.headers.authorization

    // console.log(authHeader)

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não autorizado!' })
    }

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY5ODQzNTM4OSwiZXhwIjoxNjk5MDQwMTg5fQ.AXXQgEJphLAqv1-QhdWX82GaAASO7DVgjN3r48PfpLM

    const [, token] = authHeader.split(' ')

    try {
        const decode = await promisify(jwt.verify)(token, authConfig.secret)
        console.log(decode)
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido!' })
    }
    // if (authHeader && authHeader === 'secret') {
    //     return next()
    // }
    // return res.status(401).json({ error: 'Usuario não permitido para acessar essa API!' })
    return next()
}
