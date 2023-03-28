import { Manhwa } from "../../models/Manhwa/manhwa.model.js";
import { Scan } from "../../models/Scan/scan.model.js";
import { User } from "../../models/User/user.model.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createManhwa = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      day,
      type,
      source,
      chapters,
      volumes,
      rating,
      genres,
      authors,
      urlContent,
      artists,
      score,
      scanId,
      authorId,
      demography,
      popularity,
    } = req.body;

    const img = req.files?.image;
    let pathImage = __dirname + "/../../public/manhwa/" + img?.name;
    img?.mv(pathImage);
    let url = (pathImage = "https://apix.moelist.online//manhwa/" + img?.name);
    if (!img) url = "google.com";
    const manhwa = await Manhwa.create(
      {
        title,
        description,
        image: url,
        status,
        day,
        type,
        source,
        chapters,
        volumes,
        rating,
        urlContent,
        genres,
        authors,
        artists,
        authorId,
        score,
        popularity,
        demography,
        scanId,
      },

      {
        includes: [
          {
            model: Scan,
            as: "scanId",
            attributes: ["id"],
          },
          {
            model: User,
            as: "authorId",
            attributes: ["id"],
          },
        ],
      }
    );

    res.status(200).json(manhwa);
  } catch (error) {
    console.log(error);
  }
};

export const getManhwas = async (req, res) => {
  try {
    const manhwa = await Manhwa.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "status",
        "day",
        "type",
        "source",
        "chapters",
        "volumes",
        "rating",
        "genres",
        "authors",
        "artists",
        "score",
        "demography",
        "popularity",
        "urlContent",
        "contentType",
      ],
      include: [
        {
          model: Scan,
          as: "Scan",
          attributes: ["id", "name", "url", "image"],
        },
      ],
    });
    res.status(200).json(manhwa);
  } catch (error) {
    console.log(error);
  }
};

export const getManhwasById = async (req, res) => {
  try {
    const { id } = req.params;
    const manhwa = await Manhwa.findOne({
      where: { id },
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "status",
        "day",
        "type",
        "source",
        "chapters",
        "volumes",
        "rating",
        "genres",
        "authors",
        "artists",
        "demography",
        "score",
        "popularity",
        "urlContent",
        "contentType",
      ],
      include: [
        {
          model: Scan,
          as: "Scan",
          attributes: ["id", "name", "url", "image"],
        },
        {
          model: User,
          as: "User",
          attributes: [
            "id",
            "userName",
            "avatar",
            "paypal",
            "binanceId",
            "twitter",
          ],
        },
      ],
    });
    res.status(200).json(manhwa);
  } catch (error) {
    console.log(error);
  }
};

export const lastManhwas = async (req, res) => {
  try {
    const manhwa = await Manhwa.findAll({
      limit: 4,
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "status",
        "day",
        "type",
        "source",
        "chapters",
        "volumes",
        "rating",
        "genres",
        "authors",
        "artists",
        "score",
        "popularity",
        "urlContent",
        "contentType",
        "demography",
      ],
      include: [
        {
          model: Scan,
          as: "Scan",
          attributes: ["id", "name", "url", "image"],
        },
      ],
    });
    res.status(200).json(manhwa);
  } catch (error) {
    console.log(error);
  }
};

export const updateManhwa = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      status,
      day,
      type,
      source,
      chapters,
      volumes,
      rating,
      genres,
      authors,
      artists,
      demography,
      score,
      popularity,
    } = req.body;

    const img = req.files?.image;
    let pathImage = __dirname + "/../../public/manhwa/" + img?.name;
    img?.mv(pathImage);
    let url = (pathImage = "https://apix.moelist.online//manhwa/" + img?.name);
    if (!img) url = "google.com";

    const manhwa = await Manhwa.update(
      {
        title,
        description,
        image: url,
        status,
        day,
        type,
        source,
        chapters,
        volumes,
        rating,
        genres,
        authors,
        demography,
        artists,
        score,
        popularity,
      },
      { where: { id } }
    );
    res.status(200).json(manhwa);
  } catch (error) {
    console.log(error);
  }
};

export const deleteManhwa = async (req, res) => {
  try {
    const { id } = req.params;
    const manhwa = await Manhwa.destroy({ where: { id } });
    res.status(200).json(manhwa);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
