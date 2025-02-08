import express from "express";
import Url from "../models/Url.js";
import validator from "validator";

const router = express.Router();

// Create a shortened URL

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Healthy" });
});

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  // Use validator to check if the URL is valid
  if (
    !validator.isURL(originalUrl, {
      protocols: ["http", "https"],
      require_protocol: true,
    })
  ) {
    return res.status(400).json({
      message: "Invalid URL format. URL must start with http:// or https://",
    });
  }

  try {
    const url = new Url({ originalUrl });
    await url.save();

    res.status(201).json({
      message: "URL shortened successfully",
      shortUrl: `${req.protocol}://${req.get("host")}/${url.shortUrl}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error shortening URL", error });
  }
});

// Read all shortened URLs
router.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find();
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching URLs", error });
  }
});

// Redirect to the original URL
router.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const url = await Url.findOne({ shortUrl });
    console.log(url);
    if (!url) return res.status(404).json({ message: "URL not found" });
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ message: "Error fetching URL", error });
  }
});

// Delete a URL
router.delete("/urls/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const url = await Url.findByIdAndDelete(id);
    if (!url) return res.status(404).json({ message: "URL not found" });
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting URL", error });
  }
});

export default router;
