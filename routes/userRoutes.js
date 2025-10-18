"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/criar-conta", usersController_1.criarConta);
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map