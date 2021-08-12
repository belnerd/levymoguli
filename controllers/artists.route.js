// Controller for artists endpoint
// Each route and method checks authentication beforehand
const express = require('express')
const router = express.Router()
const queryModel = require('../models/query.model')
const auth = require('../utils/auth')

// GET all artists
router.get('/', auth.checkAuthentication('USER'), async function (request, response) {
    let artistData = await queryModel.listArtists()
    response.render('artists', {
        data: artistData,
        type: 'USER',
        deleted: false,
        added: false
    })
})

// GET every artists sales
router.get('/sales', auth.checkAuthentication('USER'), async function (request, response) {
    let artistData = await queryModel.listArtistsSales()
    response.render('artistsales', {
        data: artistData,
        type: 'USER'
    })
})

// GET add a new artist
router.get('/add', auth.checkAuthentication('USER'), async function (request, response) {
    response.render('addartist', {
        type: 'USER'
    })
})

// GET a single artist specified by the id
router.get('/:id', auth.checkAuthentication('USER'), async function (request, response) {
    let artistData = await queryModel.readArtist(request.params.id)
    response.render('artist', {
        data: artistData,
        type: 'USER',
        update: false
    })
})


// POST artists data when editing an artist
router.post('/edit', auth.checkAuthentication('USER'), async function (request, response,next) {
    let artistData = await queryModel.writeArtist(request.body)
    response.render('artist', {
        data: artistData,
        type: 'USER',
        update: true
    })
})

// POST delete an artist based on artistid
router.post('/delete', auth.checkAuthentication('USER'), async function (request, response,next) {
    let result = await queryModel.deleteArtist(request.body)
    if (result) {
        let artistData = await queryModel.listArtists()
        response.render('artists', {
            data: artistData,
            type: 'USER',
            deleted: true,
            added: false
        })
    }
})

// POST add a new artist to the database
router.post('/save', auth.checkAuthentication('USER'), async function (request, response,next) {
    let result = await queryModel.addArtist(request.body)
    if (result) {
        let artistData = await queryModel.listArtists()
        response.render('artists', {
            data: artistData,
            type: 'USER',
            deleted: false,
            added: true
        })
    }
})

module.exports = router