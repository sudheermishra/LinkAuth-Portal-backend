import express from "express";
import cors from "cors";
import linkedinRoutes from "./routes/linkedinRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
  console.log("Server is running 🚀");
});

app.use("/auth", linkedinRoutes);

export default app;