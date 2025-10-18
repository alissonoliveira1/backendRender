"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarConta = void 0;
const firebase_1 = require("../../utils/firebase");
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const criarConta = async (req, res) => {
    try {
        const { nome, sobrenome, email, senha } = req.body;
        if (!nome || !sobrenome || !email || !senha)
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        const firebaseUser = await firebase_1.auth.createUser({
            email,
            password: senha,
            displayName: `${nome} ${sobrenome}`,
        });
        const usuario = await prismaClient_1.default.usuarios.create({
            data: {
                firebase_uid: firebaseUser.uid,
                nome,
                sobrenome,
                email,
                verificado: firebaseUser.emailVerified || false,
            },
        });
        return res.status(201).json({ message: "Usuário criado com sucesso", usuario });
    }
    catch (err) {
        if (err.code === "auth/email-already-exists")
            return res.status(400).json({ error: "Email já cadastrado" });
        return res.status(500).json({ error: err.message });
    }
};
exports.criarConta = criarConta;
//# sourceMappingURL=usersController.js.map