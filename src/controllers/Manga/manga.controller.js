import { Manga } from "../../models/Manga/manga.model.js";
import { Scan } from "../../models/Scan/scan.model.js";
import { User } from "../../models/User/user.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createManga = async (req, res) => {
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
      artists,
      scanId,
      demography,
      score,
      popularity,
      authorId,
      urlContent,
    } = req.body;

    const img = req.files?.image;
    let pathImage = __dirname + "/../../public/manga/" + img?.name;
    img?.mv(pathImage);
    let url = (pathImage = "https://apix.moelist.online//manga/" + img?.name);
    if (!img) url = "google.com";
    const manga = await Manga.create(
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
        artists,
        score,
        scanId,
        popularity,
        urlContent,
        authorId,
        demography,
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

    res.status(200).json(manga);
  } catch (error) {
    console.log(error);
  }
};

export const lastMangas = async (req, res) => {
  try {
    const mangas = await Manga.findAll({
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
    res.status(200).json(mangas);
  } catch (error) {
    console.log(error);
  }
};

export const getMangas = async (req, res) => {
  try {
    const mangas = await Manga.findAll({
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
    res.status(200).json(mangas);
  } catch (error) {
    console.log(error);
  }
};

export const getMangaById = async (req, res) => {
  try {
    const { id } = req.params;
    const manga = await Manga.findOne({
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
        "score",
        "popularity",
        "urlContent",
        "demography",
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
    res.status(200).json(manga);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateManga = async (req, res) => {
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
    console.log(img, id);
    let pathImage = __dirname + "/../../public/manga/" + img?.name;
    img?.mv(pathImage);
    let url = (pathImage = "https://apix.moelist.online//manga/" + img?.name);
    if (!img) url = "google.com";

    const manga = await Manga.update(
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
        artists,
        score,
        popularity,
        demography,
      },
      { where: { id } }
    );
    res.status(200).json(manga);
  } catch (error) {
    console.log(error);
  }
};

export const deleteManga = async (req, res) => {
  try {
    const { id } = req.params;
    const manga = await Manga.destroy({ where: { id } });
    res.status(200).json(manga);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
