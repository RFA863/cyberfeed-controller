import AuthRoute from "./auth.route.js";
import PostRoute from "./post.route.js";

class HandlerRoute {
  constructor(Server) {
    new AuthRoute(Server);
    new PostRoute(Server);
  }
}

export default HandlerRoute;