import { App } from "../core/index.js";
import { plugin } from "./builderPlugin.js";

App.withPlugin(plugin);

/**
 * @name App#route
 * @function
 * @param {RouteBuilder} route
 * @return {App}
 */
App.prototype.route = function(route) {
  this.callHook("addRoute", true, route);

  return this;
};
