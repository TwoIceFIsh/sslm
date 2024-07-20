//import { PrismaClient } from "@prisma/client";


const {PrismaClient} = require("@prisma/client");
/*
Seed data is used to populate the database with initial data.
*/
const moduleData = require("../initial-data/system_Modules_Enabled.json");
const logData = require("../initial-data/logs.json");
const userData = require("../initial-data/users.json");

const db = new PrismaClient();

async function main() {
    // Your seeding logic here using Prisma Client
    console.log("-------- Seeding DB --------");


    const users = await db.users.findMany();
    if (users.length === 0) {
        await db.users.createMany({
            data: userData,
        });
        console.log("Users seeded successfully");
    }

    //Seed Menu Items
    const modules = await db.system_Modules_Enabled.findMany();

    if (modules.length === 0) {
        await db.system_Modules_Enabled.createMany({
            data: moduleData,
        });
        console.log("Modules seeded successfully");
    } else {
        console.log("Modules already seeded");
    }

    //Seed Menu Items
    const logs = await db.logs.findMany();
    if (logs.length === 0) {
        await db.logs.createMany({
            data: logData,
        });
        console.log("Modules seeded successfully");
    }


    console.log("-------- Seed DB completed --------");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });