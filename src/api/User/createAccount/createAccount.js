import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const userNameExists = await prisma.$exists.user({
        username
      });
      const emailExists = await prisma.$exists.user({
        email
      });
      if (userNameExists) {
        throw Error("이미 존재하는 닉네임입니다.");
      } else if (emailExists) {
        throw Error("이미 존재하는 이메일입니다.");
      }
      //  const exists = await prisma.$exists.user({
      //    OR: [
      //      {
      //        username
      //      },
      //      { email }
      //    ]
      //  });
      //  if (exists) {
      //    throw Error("This username / email is already taken");
      //  }
      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      return true;
    }
  }
};
