import Ietm from "pages/ietm";
import Landing from "pages/landing";
import Page404 from "pages/404";

const routes = [
  {
    name: "landing",
    url: "/",
    component: Landing,
    exact: true,
  },
  {
    name: "ietm",
    url: "/ietm",
    component: Ietm,
    exact: true,
  },
  {
    name: "",
    url: "**",
    component: Page404,
  },
];

const routesMap: {
  [key: string]: string;
} = {};

routes.forEach((route) => {
  if (route.hasOwnProperty("name")) {
    routesMap[route.name] = route.url;
  }
});

const urlBuilder = function (name, params) {
  if (!routesMap.hasOwnProperty(name)) {
    return null;
  }

  let url = routesMap[name]; // news/:id

  for (const key in params) {
    url = url.replace(":" + key, params[key]);
  }

  return url;
};

export default routes;
export { routesMap, urlBuilder };
