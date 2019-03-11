import dotenv from "dotenv";
import path from "path";
import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid-transport";
import { adjectives, nouns } from "./words";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sendGridTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "info@prismagram.com",
    to: address,
    subject: "🔒[프리즈마그램] 인증코드를 입력해주세요 🔒",
    html: `
    시크릿코드 발송!<br/>
    <div style="width:100%; padding: 20px 0px; font-size: 20px; font-weight: 600;">
      ${secret}
    </div>
    로그인을 위해 복사 후 웹/앱에서 붙여넣기 해주세요.
    `
  };
  return sendMail(email);
};
