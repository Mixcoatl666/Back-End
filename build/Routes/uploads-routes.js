"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_controllers_1 = require("../Controllers/uploads-controllers");
const multer_1 = __importDefault(require("../libs/multer"));
class UploadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', uploads_controllers_1.uploadsController.getPhoto);
        this.router.get('/:id_imagen', uploads_controllers_1.uploadsController.getByPhoto);
        this.router.post('/', multer_1.default.single('image'), uploads_controllers_1.uploadsController.createPhoto);
        this.router.delete('/:id');
        this.router.put('/:id');
    }
}
const uploadsRoutes = new UploadRoutes();
exports.default = uploadsRoutes.router;
