import AuthController from '../controllers/auth.controller.js';

class AuthRoute {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
    this.routePrefix = '/auth';
    this.AuthController = new AuthController(this.Server);
    this.route();
  }

  route() {
    this.API.post(this.routePrefix + '/register', (req, res) =>
      this.AuthController.register(req, res)
    );

    this.API.post(this.routePrefix + '/login', (req, res) =>
      this.AuthController.login(req, res)
    );
  }
}

export default AuthRoute;