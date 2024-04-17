import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import session from "express-session";
import cors from "cors";
import "dotenv/config";
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import ModuleRoutes from "./Kanbas/modules/routes.js";


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: "https://kanbas-node-server-app-a6-91qt.onrender.com",

}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));

// Add the following code to enable CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://a6--shiny-queijadas-6fd8c8.netlify.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
  
CourseRoutes(app);
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app);
app.listen(4000);