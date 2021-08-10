const express = require('express')
const router = express.Router()
const queryModel = require('../models/query.model')
const auth = require('../utils/auth')

router.get('/', auth.checkAuthentication('USER'), async function (request, response) {
    let artistData = await queryModel.listArtists()
    response.render('artists', {
        data: artistData,
        type: 'USER',
        deleted: false,
        added: false
    })
})

router.get('/sales', auth.checkAuthentication('USER'), async function (request, response) {
    let artistData = await queryModel.listArtistsSales()
    response.render('artistsales', {
        data: artistData,
        type: 'USER'
    })
})

router.get('/add', auth.checkAuthentication('USER'), async function (request, response) {
    response.render('addartist', {
        type: 'USER'
    })
})

router.get('/:id', auth.checkAuthentication('USER'), async function (request, response) {
    let artistData = await queryModel.readArtist(request.params.id)
    response.render('artist', {
        data: artistData,
        type: 'USER',
        update: false
    })
})


router.post('/edit', auth.checkAuthentication('USER'), async function (request, response,next) {
    let artistData = await queryModel.writeArtist(request.body)
    response.render('artist', {
        data: artistData,
        type: 'USER',
        update: true
    })
})

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