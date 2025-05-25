const {PERMISSIONS} = require('../enums/permissions');


const ALL_PERMISSIONS = Array.from(new Set(Object.values(PERMISSIONS).flat()));

module.exports = { ALL_PERMISSIONS };