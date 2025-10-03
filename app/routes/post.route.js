import Upload from "../middlewares/multer.middleware.js";
import AuthorizationMiddleware from '../middlewares/authorization.middleware.js'
import PostController from "../controllers/post.controller.js";

class PostRoute {
  constructor(Server) {
    this.Server = Server;
    this.API = this.Server.API;
    this.routePrefix = '/post';
    this.PostController = new PostController(this.Server);
    this.AuthorizationMiddleware = new AuthorizationMiddleware(this.Server);
    this.route();
  }

  route() {
    this.API.post(this.routePrefix + '/create', this.AuthorizationMiddleware.check(), Upload.single('file'),
      (req, res) => this.PostController.createPost(req, res)
    );
  }
}

export default PostRoute;