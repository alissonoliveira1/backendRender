"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseAuth_1 = require("../middlewares/firebaseAuth");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/login", authController_1.login); // feito via Firebase no app
router.post("/logout", firebaseAuth_1.firebaseAuth, authController_1.logout);
router.get("/me", firebaseAuth_1.firebaseAuth, authController_1.me);
router.get("/profile", firebaseAuth_1.firebaseAuth, authController_1.profile);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map