import { Router } from "express";
import auth from "../../middleware/auth";

const router = Router();

router.use(auth)



export default router;
