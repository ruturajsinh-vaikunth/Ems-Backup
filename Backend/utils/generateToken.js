import jwt from 'jsonwebtoken'

// generate token that expires in 12 hours
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5m' })
}

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '5m' })
}

const Tokens = { generateToken, generateRefreshToken }

export default Tokens
