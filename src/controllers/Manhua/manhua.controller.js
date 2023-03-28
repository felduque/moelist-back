import { Manhua } from "../../models/Manhua/manhua.model.js";
import { Scan } from "../../models/Scan/scan.model.js";
import { User } from "../../models/User/user.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createManhua = async (req, res) => {
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
      urlContent,
      genres,
      authors,
      artists,
      score,
      demography,
      authorId,
      scanId,
      popularity,
    } = req.body;

    const img = req.files?.image;
    let pathImage = __dirname + "/../../public/manhua/" + img?.name;
    img?.mv(pathImage);
    let url = (pathImage = "https://apix.moelist.online//manhua/" + img?.name);
    if (!img) url = "google.com";
    const manhua = await Manhua.create(
      {
        title,
        description,
        image: url,
        status,
        day,
        type,
        source,
        urlContent,
        chapters,
        volumes,
        rating,
        genres,
        authors,
        demography,
        artists,
        authorId,
        score,
        popularity,
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

    res.status(201).json(manhua);
  } catch (error) {
    console.log(error);
  }
};

export const lastManhuas = async (req, res) => {
  try {
    const manhua = await Manhua.findAll({
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
    res.status(200).json(manhua);
  } catch (error) {
    console.log(error);
  }
};

export const getManhua = async (req, res) => {
  try {
    const manhua = await Manhua.findAll({
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
    res.status(200).json(manhua);
  } catch (error) {
    console.log(error);
  }
};

export const getManhuaById = async (req, res) => {
  try {
    const { id } = req.params;
    const manhua = await Manhua.findOne({
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
        "demography",
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
    res.status(200).json(manhua);
  } catch (error) {
    console.log(error);
  }
};

export const updateManhua = async (req, res) => {
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
      scans,
    } = req.body;

    const img = req.files?.image;
    let pathImage = __dirname + "/../../public/manhua/" + img?.name;
    img?.mv(pathImage);
    let url = (pathImage = "https://apix.moelist.online//manhua/" + img?.name);
    if (!img) url = "google.com";

    const manhua = await Manhua.update(
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
        scans,
      },
      { where: { id } }
    );
    res.status(200).json(manhua);
  } catch (error) {
    console.log(error);
  }
};

export const deleteManhua = async (req, res) => {
  try {
    const { id } = req.params;
    const manhua = await Manhua.destroy({ where: { id } });
    res.status(200).json(manhua);
  } catch (error) {
    console.log(error);
  }
};
