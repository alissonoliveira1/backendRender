"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.profile = exports.me = exports.login = void 0;
const firebase_1 = require("../utils/firebase");
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha)
            return res.status(400).json({ error: "Email e senha obrigatórios" });
        const user = await firebase_1.auth.getUserByEmail(email);
        if (!user)
            return res.status(404).json({ error: "Usuário não encontrado" });
        const customToken = await firebase_1.auth.createCustomToken(user.uid);
        return res.status(200).json({ token: customToken, user: { uid: user.uid, email: user.email, nome: user.displayName } });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
exports.login = login;
const me = async (req, res) => {
    return res.status(200).json({ usuario: req.user });
};
exports.me = me;
const profile = async (req, res) => {
    const usuario = req.user;
    return res.status(200).json({
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
        verificado: usuario.verificado,
    });
};
exports.profile = profile;
const logout = async (req, res) => {
    try {
        return res.status(200).json({ message: "Usuário deslogado com sucesso" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map