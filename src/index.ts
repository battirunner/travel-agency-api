// external import
import dotenv from "dotenv";
// internal import
import { logger } from "./application/logging";
import { app } from "./application/web";

//For env File
dotenv.config();

const PORT = process.env.PORT;
// app.use(loggerExpress);

app.listen(PORT, () => {
  logger.info(`App start in port:${PORT}`);
});
