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

export default routes;
export { routesMap };
