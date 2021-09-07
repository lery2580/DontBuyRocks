import React from "react";
import { HomeIndex, AdminIndex, AboutUsIndex } from "../page";
export type RouterType = {
  path: string;
  component: React.LazyExoticComponent<any>;
  root: string[];
  notExect?: boolean;
};

const HomeRouter: RouterType = {
  path: "/",
  component: HomeIndex,
  root: [],
};

const AdminRouter: RouterType = {
  path: "/admin",
  component: AdminIndex,
  root: [],
};
const AboutUsRouter: RouterType = {
  path: "/about",
  component: AboutUsIndex,
  root: [],
};

const Routers: RouterType[] = [HomeRouter, AdminRouter, AboutUsRouter];
export { Routers };
