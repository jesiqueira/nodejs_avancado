import multer from 'multer'
import { extname, resolve } from 'path'
import crypto from 'crypto'

// Suporte diversos storage, ex.: files, aws s3, digital ocean  spaces, google, microsoft
//  vamos usar o diskStorage

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return callback(err)
                return callback(null, res.toString('hex') + extname(file.originalname))
            })
        },
    }),
}
