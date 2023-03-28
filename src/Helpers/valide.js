import jwt from "jsonwebtoken";

function veryToleken(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const expire = jwt.decode(token);
    if (expire.exp < Date.now() / 1000) {
      console.log("Token expirado");
      return res.status(401).json({ msg: "Token expired" });
    }

    if (expire.role !== "Author") {
      return res.status(401).json({ msg: "You are not an Author" });
    }

    console.log(expire);

    const veryToken = jwt.verify(
      token,
      "HOXmtwgjUmhOtDutUaXK/PQX5RGV4lSbgU1CbAq+wFc="
    );
    req.user = veryToken;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}
export default veryToleken;
