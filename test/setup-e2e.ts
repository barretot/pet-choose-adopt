// import { PrismaClient } from '@prisma/client';
// import 'dotenv/config';
// import { execSync } from 'node:child_process';
// import { randomUUID } from 'node:crypto';

// const prisma = new PrismaClient();
// const schemaId = randomUUID();

// function generateUniqueDatabaseUrl(schemaId) {
//   const url = new URL(process.env.DATABASE_URL);
//   url.searchParams.set('schema', `testSchema-${schemaId}`);
//   return url.toString();
// }

// beforeAll(async () => {
//   process.env.DATABASE_URL = generateUniqueDatabaseUrl(schemaId);
//   execSync('pnpm prisma migrate dev');
// });

// afterAll(async () => {
//   await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "testSchema-${schemaId}" CASCADE`);
//   await prisma.$disconnect();
// });