const express = require('express')
const router = express.Router()
const queryModel = require('../models/query.model')
const auth = require('../utils/auth')

router.get('/', auth.checkAuthentication('USER'), async function (request, response) {
    let bandData = await queryModel.listBands()
    response.render('bands', {
        data: bandData,
        type: 'USER'
    })
})

router.get('/sales', auth.checkAuthentication('USER'), async function (request, response) {
    let bandData = await queryModel.listBandsSales()
    response.render('bandsales', {
        data: bandData,
        type: 'USER'
    })
})

router.get('/members', auth.checkAuthentication('USER'), async function (request, response) {
    let bandData = await queryModel.listMembers()
    response.render('members', {
        data: bandData,
        type: 'USER'
    })
})

router.get('/sales/member', auth.checkAuthentication('USER'), async function (request, response) {
    let bandData = await queryModel.listMemberSales()
    response.render('membersales', {
        data: bandData,
        type: 'USER'
    })
})

module.exports = router 