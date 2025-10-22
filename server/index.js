import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import contactRouter from "./routes/contact.js";

dotenv.config();
const app = express();

app.use(cors());            // abilita CORS per il client Vite
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/contact", contactRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));