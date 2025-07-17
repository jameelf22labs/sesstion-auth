import application from "./app";
import { env } from "./config";

application()
  .then((app) => {
    app.listen(env.Port, () => {
      console.log("Application start on Port " + env.Port);
    });
  })
  .catch((error) => {
    console.error("Application Failed ", error);
    process.exit(1);
  });
