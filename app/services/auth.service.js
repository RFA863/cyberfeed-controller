import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from "../models/handler.model.js";

class AuthService {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
  }

  generateToken(id) {
    const token = jwt.sign(
      { userid: id }, this.Server.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: this.Server.env.JWT_EXPIRED_KEY }
    );

    const refreshToken = jwt.sign(
      { userid: id }, this.Server.env.JWT_REFRESH_TOKEN_SECRET
    );

    return { token, refreshToken };
  }

  async register(req) {
    const findUser = await prisma.users.findUnique({
      where: { username: req.username }
    })

    if (findUser) return -1;

    const hashPassword = await bcrypt.hash(req.password, 10);

    const userData = await prisma.users.create({
      data: {
        username: req.username,
        password: hashPassword
      }
    });

    delete userData.password

    return userData;
  }

  async login(req) {

    const user = await prisma.users.findUnique({
      where: {
        username: req.username,
      }
    });

    if (!user) return -1;

    const matchPassword = await bcrypt.compare(req.password, user.password);

    if (!matchPassword) return -2;

    const token = this.generateToken(user.id);
    delete user.password

    return { user, token };
  }

  async refreshToken(dataToken, refreshToken) {
    try {

      const decoded = jwt.verify(refreshToken, this.Server.env.JWT_SECRET_KEY);

      if (decoded.userid !== dataToken.userid) {
        throw new Error('Token Mismatch');
      }

      return this.generateToken(dataToken.userid);

    } catch (error) {
      console.log(error);
      throw new Error('Invalid or Expired Refresh Token');
    }
  }
}

export default AuthService;