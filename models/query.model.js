// Model for database queries
// Function names should be descriptive enough...
pool = require('../utils/db.js')
module.exports = {
    async listArtistsSales() {
        try {
            conn = await pool.getConnection()
            sql = 'SELECT * FROM ArtistSales'
            const rows = await conn.query(sql)
            conn.end()
            return rows
        } catch (err) {
            throw err
        }
    },
    async listArtists() {
        try {
            conn = await pool.getConnection()
            sql = 'SELECT * FROM artists'
            const rows = await conn.query(sql)
            conn.end()
            return rows
        } catch (err) {
            throw err
        }
    },
    async listBandsSales() {
        try {
            conn = await pool.getConnection()
            sql = 'SELECT * FROM BandSales'
            const rows = await conn.query(sql)
            conn.end()
            return rows
        } catch (err) {
            throw err
        }
    },
    async listBands() {
        try {
            conn = await pool.getConnection()
            sql = 'SELECT * FROM bands'
            const rows = await conn.query(sql)
            conn.end()
            return rows
        } catch (err) {
            throw err
        }
    },
    async listMemberSales() {
        try {
            conn = await pool.getConnection()
            sql = 'SELECT * FROM BandSalesPerMember'
            const rows = await conn.query(sql)
            conn.end()
            return rows
        } catch (err) {
            throw err
        }
    },
    async listMembers() {
        try {
            conn = await pool.getConnection()
            sql = `SELECT bandid,bandname,artistid,lastname,firstname FROM bands INNER JOIN members ON bands.bandid = members.bands_bandid
            INNER JOIN artists ON members.artists_artistid = artists.artistid
            ORDER BY bandid`
            const rows = await conn.query(sql)
            conn.end()
            return rows
        } catch (err) {
            throw err
        }
    },
    async readArtist(id) {
        try {
            conn = await pool.getConnection()
            sql = 'SELECT artistid,firstname,lastname,contract FROM artists WHERE artistid = ?'
            const rows = await conn.query(sql,id)
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
    async writeArtist(data) {
        try {
            conn = await pool.getConnection()
            sql = `UPDATE artists SET firstname = '${data.firstname}',
                    lastname = '${data.lastname}',
                    contract = '${data.contract}'
                    WHERE artistid = ${data.artistId};`
            await conn.query(sql)
            conn.end()
            conn = await pool.getConnection()
            sql = `SELECT artistid,firstname,lastname,contract FROM artists WHERE artistid = ${data.artistId}`
            const rows = await conn.query(sql)
            if (rows.length == 1) {
                return rows[0]
            } else {
                return false
            }
        } catch (err) {
                throw err
        }
    },
    async deleteArtist(data) {
        try {
            conn = await pool.getConnection()
            sql = `DELETE FROM artists WHERE artistid = '${data.artistId}';`
            await conn.query(sql)
            conn.end()
            return true
        } catch (err) {
            throw err
        }
    },
    async addArtist(data) {
        try {
            conn = await pool.getConnection()
            sql = `INSERT INTO artists (firstname,lastname,contract)
                    VALUES ('${data.firstname}','${data.lastname}','${data.contract}');`
            await conn.query(sql)
            conn.end()
            return true
        } catch (err) {
            throw err
        }
    },

}
