import { Router } from "express";
import { uploadImage } from "../Controllers/uploads-controllers"; 

const router = Router();

router.post("/upload", uploadImage);

export default router;
