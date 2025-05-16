const authRoutes = require('./authRoutes')
const projectRoutes = require('./projectRoutes')
const taskRoutes = require('./taskRoutes')
const commentRoutes = require('./commentRoutes')
const logRoutes = require('./logRoutes')
const attachmentRoutes = require('./attachmentRoutes')

const express = require('express')
const router = express.Router()

// Import all routes here
router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/tasks', taskRoutes)
router.use('/comments', commentRoutes)
router.use('/logs', logRoutes)
router.use('/attachments', attachmentRoutes)


module.exports = router