import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import router from "./routers/Router.js";

const app = express();
const port = process.env.PORT || 3000;

export const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.json());
app.use(router)

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowedProtoMethodsByDeafult: true,
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

try {
  app.listen(port, () => {
    console.log("Server was started on localhost:" + port);
  });
} catch {
  (err) => {
    console.log(err);
  };
}
