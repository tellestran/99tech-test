import { Router } from "express";
import { getAllUsers } from "../controllers/getAllUsers";

const router = Router();

router.get("/", getAllUsers);
// router.get("/:id", getUserById);
// router.post("/:id", createUser)
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser)

export default router;