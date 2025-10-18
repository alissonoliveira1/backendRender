"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mailServices_1 = require("../services/mailServices");
const router = express_1.default.Router();
const codes = {};
router.post("/send-code", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "E-mail é obrigatório" });
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    codes[email] = { code, expiresAt };
    try {
        await (0, mailServices_1.sendVerificationEmail)(email, code);
        console.log(`Código enviado para ${email}: ${code}`);
        res.json({ success: true, message: "Código enviado com sucesso!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao enviar e-mail" });
    }
});
router.post("/verify-code", (req, res) => {
    const { email, code } = req.body;
    const record = codes[email];
    if (!record) {
        return res.status(400).json({ valid: false, message: "Código não encontrado" });
    }
    if (Date.now() > record.expiresAt) {
        delete codes[email];
        return res.status(400).json({ valid: false, message: "Código expirado" });
    }
    if (record.code === code) {
        delete codes[email];
        return res.json({ valid: true, message: "Código verificado com sucesso!" });
    }
    res.status(400).json({ valid: false, message: "Código incorreto" });
});
exports.default = router;
//# sourceMappingURL=emailRoutes.js.map