// Database connector module
const mariadb = require('mariadb')

// Create connection pool using mariadb module, data from dotenv variables.
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    allowPublicKeyRetrieval: true // Allowed for Digital Ocean services
})

// Some async stuff that I don't fully understand... But used by the models for SQL queries.
module.exports = {
    getConnection() {
        return new Promise(function (res,rej) {
            pool.getConnection()
            .then(function (conn) {
                res(conn)
            })
            .catch(function (error) {
                rej(error)
            })
        })
    },
}
