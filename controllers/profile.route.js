// Controller for /profile endpoint

const express = require('express')
const router = express.Router()
const userModel = require('../models/user.model')
const auth = require('../utils/auth')

// GET check if user is logged in as USER type and render data accordingly
router.get('/user', auth.checkAuthentication('USER'), async function (request, response) {
    let userData = await userModel.read(request.user.username)
    response.render('profile', {
        user: userData,
        type: 'USER'
    })
})

// GET check if user is logged in as ADMIN and render data accordingly
router.get('/admin', auth.checkAuthentication('ADMIN'), async function (request, response) {
    let userData = await userModel.read(request.user.username)
    let listData = await userModel.list()
    response.render('profile', {
        user: userData,
        data: listData,
        type: 'ADMIN'
    })
})

module.exports = router