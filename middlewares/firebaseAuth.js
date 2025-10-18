"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAuth = void 0;
const firebase_1 = require("../../utils/firebase");
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const firebaseAuth = async (req, res, next) => {
    // 1️⃣ Extrair token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.error("Header Authorization não encontrado");
        return res.status(401).json({ error: "Token não fornecido" });
    }
    if (!authHeader.startsWith("Bearer ")) {
        console.error("Header Authorization mal formatado:", authHeader);
        return res.status(401).json({ error: "Token mal formatado" });
    }
    const token = authHeader.substring(7); // Remove "Bearer "
    // 2️⃣ Verificar token no Firebase
    let decoded;
    try {
        decoded = await firebase_1.auth.verifyIdToken(token);
        console.log("Token verificado com sucesso. UID:", decoded.uid);
    }
    catch (err) {
        console.error("Erro ao verificar token:", err);
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
    // 3️⃣ Buscar usuário no banco
    let usuario;
    try {
        usuario = await prismaClient_1.default.usuarios.findUnique({
            where: { firebase_uid: decoded.uid },
        });
        if (!usuario) {
            console.warn("Usuário não encontrado no banco. UID:", decoded.uid);
            return res.status(404).json({ error: "Usuário não encontrado no banco" });
        }
    }
    catch (err) {
        console.error("Erro ao consultar usuário no banco:", err);
        return res.status(500).json({ error: "Erro interno no banco" });
    }
    // 4️⃣ Anexa usuário à requisição e continua
    req.user = usuario;
    next();
};
exports.firebaseAuth = firebaseAuth;
//# sourceMappingURL=firebaseAuth.js.map