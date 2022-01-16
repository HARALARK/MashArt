import jwt from "jsonwebtoken"

const generateToken = (id, expiresIn, jwtSecret) => {
  return jwt.sign({ id }, jwtSecret ? jwtSecret : process.env.JWT_SECRET, {
    expiresIn: expiresIn ? expiresIn : "30d",
  })
}

export default generateToken
