// Controller for bands endpoint
// Each route and method checks authentication beforehand
const express = require('express')
const router = express.Router()
const queryModel = require('../models/query.model')
const auth = require('../utils/auth')

// GET all bands
router.get('/', auth.checkAuthentication('USER'), async function (request, response) {
    let bandData = await queryModel.listBands()
    response.render('bands', {
        data: bandData,
        type: 'USER'
    })
})

// GET every bands sales
router.get('/sales', auth.checkAuthentication('USER'), async function (request, response) {
    let bandData = await queryModel.listBandsSales()
    response.render('bandsales', {
        data: bandData,
        type: 'USER'
    })
})

// GET bands members
router.get('/members', auth.checkAuthentication('USER'), async function (request, response) {
    let bandData = await queryModel.listMembers()
    response.render('members', {
        data: bandData,
        type: 'USER'
    })
})

// GET sales per band member
router.get('/sales/member', auth.checkAuthentication('USER'), async function (request, response) {
    let bandData = await queryModel.listMemberSales()
    response.render('membersales', {
        data: bandData,
        type: 'USER'
    })
})

module.exports = router 