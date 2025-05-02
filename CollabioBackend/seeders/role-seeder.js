const db = require('../services/connectionDb'); 
const mongoose = require('mongoose');
const RoleSchema = require('../models/Role');
const { ROLES, PERMISSIONS } = require('../enums/roleEnum');
const seedRoles = async () => {
    console.log('Seeding roles started...');

    try {
        await db();
        const session = await mongoose.startSession();
        session.startTransaction();

        console.log("Cleaning up existing roles...");
        await RoleSchema.deleteMany({}, { session });

        for (const roleName of Object.values(ROLES)) {
            const role = roleName;
            const permissions = PERMISSIONS[roleName];

            const existingRole = await RoleSchema.findOne({ name: role }).session(session);
            if (existingRole) {
                console.log(`Role ${role} already exists. Skipping creation.`);
            } else {
                const newRole = new RoleSchema({ name: role, permissions });
                await newRole.save({ session });
                console.log(`Role ${role} created with permissions: ${permissions}`);
            }
        }

        await session.commitTransaction();
        console.log('Transaction committed. Roles seeded successfully.');

        session.endSession();
        console.log('Transaction session ended.');

    } catch (error) {
        console.error('Error seeding roles:', error);
    }
}

seedRoles().then(() => {
    console.log('Seeding roles completed.');
}).catch((error) => {
    console.error('Error during seeding:', error);
});