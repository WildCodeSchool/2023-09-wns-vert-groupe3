import cors from "cors";
import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const app = express();
const port = 8000;

app.use(cors());

app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res
      .status(201)
      .json({ status: "success", filename: "/files/" + req.file.filename });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.get("/files/:filename", (req: Request, res: Response) => {
  const file = path.join(__dirname, "../uploads", req.params.filename);

  fs.readFile(file, (err, content) => {
    if (err) {
      console.error("Error reading file:", err);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("File Not Found!");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "application/octet-stream" });
      res.write(content);
      res.end();
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
