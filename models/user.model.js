// Model for database queries regarding user profiles
pool = require('../utils/db.js')
module.exports = {
    async read(username) {
        try {
            conn = await pool.getConnection()
            sql = 'SELECT id,username,email,role FROM users WHERE username = ?'
            const rows = await conn.query(sql,username)
            conn.end()
            if (rows.length == 1) {
                return rows[0]
            } else {
                return false
            }
        } catch (err) {
                throw err
        }
    },
    async list() {
        try {
            conn = await pool.getConnection()
            sql = 'SELECT id,username,email,role FROM users'
            const rows = await conn.query(sql)
            conn.end()
            return rows
        } catch (err) {
            throw err
        }
    },

    async areValidCredentials(username,password) {
        try {
            conn = await pool.getConnection()
            sql = 'SELECT pass FROM users WHERE username = ?'
            const rows = await conn.query(sql,username)
            conn.end()

            if (rows.length == 1 && rows[0].pass === password) {
                return true
            } else {
                return false
            }
        } catch (err) {
            throw err
        }
    }
}
