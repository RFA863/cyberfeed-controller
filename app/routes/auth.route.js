import AuthController from '../controllers/auth.controller.js';
import AuthorizationMiddleware from '../middlewares/authorization.middleware.js';

class AuthRoute {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
    this.routePrefix = '/auth';
    this.AuthController = new AuthController(this.Server);
    this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);
    this.route();
  }

  route() {
    this.API.post(this.routePrefix + '/register', (req, res) =>
      this.AuthController.register(req, res)
    );

    this.API.post(this.routePrefix + '/login', (req, res) =>
      this.AuthController.login(req, res)
    );

    this.API.get(this.routePrefix + '/refresh-token', this.AuthorizationMiddleware.check(),
      (req, res) => this.AuthController.refresToken(req, res)
    );
  }
}

export default AuthRoute;