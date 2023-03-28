import { Router } from "express";
import {
  createUser,
  loginUser,
  getUser,
  addFavorite,
  getFavorites,
  deleteFavorite,
  updateUserData,
} from "../../controllers/User/user.controller.js";

import veryToleken from "../../Helpers/valide.js";

const router = Router();

router.post("/register", createUser);
router.get("/getuserid/:id", getUser);
router.post("/login", loginUser);
router.post("/addfavorite", addFavorite);
router.get("/getfavorites/:id", getFavorites);
router.patch("/updateuser/:id", veryToleken, updateUserData);
router.delete("/deletefavorite", deleteFavorite);

export default router;
