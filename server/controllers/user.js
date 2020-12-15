const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password, profile_pic } = req.body

        const [existingUser] = await db.user.find_user_by_username([username])

        if (existingUser) {
            return res.status(409).send('Username taken')
        }
        const salt = bcrypt.genSaltSync(10)

        const hash = bcrypt.hashSync(password, salt)
        const [user] = await db.user.create_user([username, hash, profile_pic])

        req.session.user = {
            username: user.username,
            password: user.hash,
            profile_pic: user.profile_pic,
        }
        res.status(201).send(req.session.user)
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')
        const [userFound] = await db.user.find_user_by_username([username])
        if (!userFound) {
            return res.status(404).send('User not found.')
        }
        const result = bcrypt.compareSync(password, userFound.password)
        if (result) {
            req.session.user = {
                username: userFound.username,
                password: userFound.hash,
            }
            res.status(200).send(req.session.user)
        } else {
            return res.status(401).send('Incorrect username/password')
        }
    },
    logout: async (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: async (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('No session found')
        }
    },
}
