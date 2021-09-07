import { lazy } from "react";
const HomeIndex = lazy(() => import("./home/homeIndex"));
const AdminIndex = lazy(() => import("./admin/adminIndex"));
const AboutUsIndex = lazy(() => import("./aboutUs/aboutUsIndex"));
export { HomeIndex, AdminIndex, AboutUsIndex };
