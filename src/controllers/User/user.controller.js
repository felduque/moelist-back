import { User } from "../../models/User/user.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Anime } from "../../models/Anime/anime.model.js";
import { Manga } from "../../models/Manga/manga.model.js";
import { Manhua } from "../../models/Manhua/manhua.model.js";
import { Manhwa } from "../../models/Manhwa/manhwa.model.js";

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const verfiEmail = await User.findOne({ where: { email } });
    console.log(userName, email, password);

    if (verfiEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const veryEmail = await User.findOne({ where: { email } });

    if (!veryEmail)
      return res.status(400).json({ error: "Invalid credentials" });

    // check if password is correct
    const isMatch = await bcrypt.compare(password, veryEmail.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // create token
    const payload = {
      id: veryEmail.id,
      role: veryEmail.role,
    };
    jwt.sign(
      payload,
      "HOXmtwgjUmhOtDutUaXK/PQX5RGV4lSbgU1CbAq+wFc=",
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const addFavorite = async (req, res) => {
  console.log(req.body);
  try {
    const { type, idContent, idUser } = req.body;

    const userFound = await User.findByPk(idUser);

    if (!userFound) {
      return res.status(400).json({ error: "User not found" });
    }

    let content;
    switch (type) {
      case "anime":
        content = await Anime.findByPk(idContent);
        const anime = await userFound.addAnime(content);
        break;
      case "manga":
        content = await Manga.findByPk(idContent);
        const manga = await userFound.addManga(content);

        break;
      case "manhua":
        content = await Manhua.findByPk(idContent);
        const manhua = await userFound.addManhua(content);
        break;
      case "manhwa":
        content = await Manhwa.findByPk(idContent);
        const manhwa = await userFound.addManhwa(content);
        break;
      default:
        break;
    }

    res.status(200).json(content);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { id } = req.params;

    const userFound = await User.findByPk(id);

    if (!userFound) {
      return res.status(400).json({ error: "User not found" });
    }

    const anime = await userFound.getAnimes({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "contentType",
        "demography",
        "genres",
      ],
    });

    const manga = await userFound.getMangas({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "contentType",
        "demography",
        "genres",
      ],
    });

    const manhua = await userFound.getManhuas({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "contentType",
        "demography",
        "genres",
      ],
    });

    const manhwa = await userFound.getManhwas({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "contentType",
        "demography",
        "genres",
      ],
    });

    const favorites = [...anime, ...manga, ...manhua, ...manhwa];

    res.status(200).json(favorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findByPk(id, {
      attributes: [
        "id",
        "email",
        "role",
        "avatar",
        "userName",
        "paypal",
        "binanceId",
        "twitter",
      ],
    });

    const animes = await userFound.getAnimes({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "contentType",
        "contentType",
        "demography",
        "genres",
        "status",
      ],
    });

    const mangas = await userFound.getMangas({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "contentType",
        "contentType",
        "demography",
        "genres",
        "status",
      ],
    });

    const manhuas = await userFound.getManhuas({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "contentType",
        "contentType",
        "demography",
        "genres",
        "status",
      ],
    });

    const manhwas = await userFound.getManhwas({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "contentType",
        "contentType",
        "demography",
        "genres",
        "status",
      ],
    });

    if (!userFound) {
      return res.status(400).json({ error: "User not found" });
    }

    const favorites = [...animes, ...mangas, ...manhuas, ...manhwas];

    res.status(200).json({ user: userFound, favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const { type, idContent, idUser } = req.body;
    console.log(type, idContent, idUser);

    const userFound = await User.findByPk(idUser);

    if (!userFound) {
      return res.status(400).json({ error: "User not found" });
    }
    let content;
    switch (type) {
      case "anime":
        content = await Anime.findByPk(idContent);
        const anime = await userFound.removeAnime(content);
        break;
      case "manga":
        content = await Manga.findByPk(idContent);
        const manga = await userFound.removeManga(content);
        break;
      case "manhua":
        content = await Manhua.findByPk(idContent);
        const manhua = await userFound.removeManhua(content);
        break;
      case "manhwa":
        content = await Manhwa.findByPk(idContent);
        const manhwa = await userFound.removeManhwa(content);
        break;
      default:
        break;
    }

    res.status(200).json(content);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUserData = async (req, res) => {
  const { userName, paypal, binanceId, twitter } = req?.body;

  const img = req?.files?.image;

  const { id } = req?.params;

  const userFind = await User.findByPk(id);

  if (!userFind) {
    return res.status(400).json({ error: "Usuario Inexistente" });
  }

  let pathImage = __dirname + "/../../public/users/" + img?.name;
  img?.mv(pathImage);
  let url = "https://apix.moelist.online//users/" + img?.name;

  if (!img) url = userFind.avatar;

  const updateData = await User.update(
    {
      userName: userName,
      paypal: paypal,
      binanceId: binanceId,
      twitter: twitter,
      avatar: url,
    },
    {
      where: {
        id: id,
      },
    }
  );

  res.json(updateData);
};
