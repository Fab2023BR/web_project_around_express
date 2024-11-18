import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar } from "../controllers/users.js";
const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.patch("/", updateUserProfile);
router.patch("/", updateUserAvatar);

export default router;
