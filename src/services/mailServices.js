"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = sendVerificationEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendVerificationEmail(email, code) {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'alissonoliveira201339@gmail.com',
        subject: "Código de Verificação",
        text: `Seu código de verificação é: ${code}`,
    };
    await transporter.sendMail(mailOptions);
}
//# sourceMappingURL=mailServices.js.map