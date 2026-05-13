import express from "express";
import {
	createUser,
	deleteUser,
	getAllUser,
	updateUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;