class FilesController {
    async create(req, res) {
        return res.json({ message: 'ok' })
    }
}

export default new FilesController()
