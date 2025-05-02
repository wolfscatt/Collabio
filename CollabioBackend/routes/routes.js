const authRoutes = require('./authRoutes')
const projectRoutes = require('./projectRoutes')

const express = require('express')
const router = express.Router()

// Import all routes here
router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)

module.exports = router