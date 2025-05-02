const authRoutes = require('./authRoutes')
const projectRoutes = require('./projectRoutes')
const taskRoutes = require('./taskRoutes')

const express = require('express')
const router = express.Router()

// Import all routes here
router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/tasks', taskRoutes)

module.exports = router