"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_controllers_1 = require("../Controllers/uploads-controllers");
const router = (0, express_1.Router)();
router.post("/upload", uploads_controllers_1.uploadImage);
exports.default = router;
