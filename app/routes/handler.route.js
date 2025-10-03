import AuthRoute from "./auth.route.js";

class HandlerRoute {
  constructor(Server) {
    new AuthRoute(Server);
  }
}

export default HandlerRoute;