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
      { userid: id }, this.Server.env.JWT_SECRET_KEY,
      { expiresIn: this.Server.env.JWT_EXPIRED_KEY }
    );

    const refreshToken = jwt.sign(
      { userid: id }, this.Server.env.JWT_SECRET_KEY
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

    console.log(userData);

    return { username: userData.username };
  }

  async login(req) {
    // const hashPassword = await bcrypt.hash(req.password, 10);

    const findUser = await prisma.users.findUnique({
      where: {
        username: req.username,
      }
    });

    if (!findUser) return -1;

    const matchPassword = await bcrypt.compare(req.password, findUser.password);

    if (!matchPassword) return -2;

    const token = this.generateToken(findUser.id);
    delete findUser.password

    return { findUser, token };
  }
}

export default AuthService;