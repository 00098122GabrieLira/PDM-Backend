import express from "express";
import { signUp } from "../controllers/authenticationController/signUp.js";
import { logIn } from "../controllers/authenticationController/logIn.js";
import { checkUsername } from "../controllers/authenticationController/checkUsername.js";
import { deleteAccount } from "../controllers/authenticationController/deleteAccount.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.get("/check-username/:username", checkUsername);
router.delete("/delete-account/:id", verifyToken, deleteAccount);

export default router;
