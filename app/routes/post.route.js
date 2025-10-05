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

    this.API.get(this.routePrefix + '/get', this.AuthorizationMiddleware.check(),
      (req, res) => this.PostController.getPost(req, res)
    );

    this.API.get(this.routePrefix + '/get/my-post', this.AuthorizationMiddleware.check(),
      (req, res) => this.PostController.getPostByUserId(req, res)
    );

    this.API.get(this.routePrefix + '/get/:postId', this.AuthorizationMiddleware.check(),
      (req, res) => this.PostController.getPostById(req, res)
    );

    this.API.put(this.routePrefix + '/update/:postId', this.AuthorizationMiddleware.check(), Upload.single('file'),
      (req, res) => this.PostController.editPost(req, res)
    );

    this.API.delete(this.routePrefix + '/delete/:postId', this.AuthorizationMiddleware.check(),
      (req, res) => this.PostController.deletePost(req, res)
    );
  }
}

export default PostRoute;