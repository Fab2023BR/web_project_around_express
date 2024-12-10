import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar } from "../controllers/users.js";
const router = Router();

router.get("/me", getUsers);
router.get("/me:userId", getUserById);
router.post("/me", createUser);
router.patch("/me", updateUserProfile);
router.patch("/me/avatar", updateUserAvatar);

export default router;
