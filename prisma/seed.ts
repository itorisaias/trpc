import { prisma } from "../src/server/db/prisma";

async function main() {
  // const id = 1;
  // await prisma.user.upsert({
  //   where: {
  //     id,
  //   },
  //   create: {
  //     id,
  //     email: 'random@gmail.com'
  //   },
  //   update: {},
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });