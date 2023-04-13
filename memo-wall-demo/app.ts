import { MemoService } from "./services/MemoService";
import { MemoController } from "./controllers/MemoController";

// Prepare the Services and Controllers
export const memoService = new MemoService(client);
export const memoController = new MemoController(memoService, io);

import { memoRoutes } from "./routers";
app.use("/memos", memoRoutes);

// Setup Static Files
app.use(express.static("public"));
app.use(isLoggedIn, express.static("frontend"));

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
