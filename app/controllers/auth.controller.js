import Ajv from 'ajv';

import AuthService from "../services/auth.service.js";
import AuthValidator from '../validators/auth.validator.js';
import ResponsePreset from "../helpers/responsePreset.helper.js";

class AuthController {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
    this.ajv = new Ajv();

    this.AuthValidator = new AuthValidator();
    this.ResponsePreset = new ResponsePreset();
    this.AuthService = new AuthService(this.Server);
  }

  async register(req, res) {
    const schemaValidate = this.ajv.compile(this.AuthValidator.input);
    if (!schemaValidate(req.body))
      return res.status(400).json(this.ResponsePreset.resErr(
        400, schemaValidate.errors[0].message, 'validator, ', schemaValidate.errors[0]
      ));

    const data = req.body;

    const authSrv = await this.AuthService.register(data);

    if (authSrv === -1)
      return res.status(403).json(this.ResponsePreset.resErr(
        403, "Forbiden, Username is already have", "service", { code: -1 }
      ))

    return res.status(200).json(this.ResponsePreset.resOK("Success", authSrv));
  };

  async login(req, res) {
    const schemaValidate = this.ajv.compile(this.AuthValidator.input);
    if (!schemaValidate(req.body))
      return res.status(400).json(this.ResponsePreset.resErr(
        400, schemaValidate.errors[0].message, 'validator, ', schemaValidate.errors[0]
      ));

    const data = req.body;

    const authSrv = await this.AuthService.login(data);

    if (authSrv === -1)
      return res.status(403).json(this.ResponsePreset.resErr(
        403, "Forbiden, Incorect username or password", "service", { code: -1 }
      ));

    return res.status(200).json(this.ResponsePreset.resOK("Success", authSrv));
  }

}

export default AuthController;