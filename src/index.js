if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const ejsMate = require("ejs-mate");
const express = require("express");
const rateLimit = require("express-rate-limit");
// Built-in module to access and interact with file system
const fs = require("fs");
const path = require("path");
// Parse front matter from Markdown files
let marked;
(async () => { // Immediately Invoked Async Function Expression (IIAFE)
  try {
    const { marked: importedMarked } = await import('marked');
    marked = importedMarked;
  } catch (error) {
    console.error("Failed to load 'marked' ES module:", error);
    process.exit(1);
  }
})();
// Get recursive file walk function
const gatherPaths = require("./public/javascripts/recursivePathWalk");

const app = express();
// Disable X-Powered-By header for your Express app (Snyk)
app.disable("x-powered-by");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
// Configure path to 'views' directory
app.set("views", path.join(__dirname, "views"));
// Configure path to 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("X-Frame-Options", "SAMEORIGIN");
  res.set("X-XSS-Protection", "1; mode=block");
  next();
});

// Main index page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about/about");
});

app.get("/sources", (req, res) => {
  const baseDir = path.join(
    __dirname,
    "views",
    "sources",
    "content",
    "entries"
  );
  // gathers resources from specific subdirectory
  const toolPaths = gatherPaths(path.join(baseDir, "tools"));

  res.render("sources/sources", {
    toolPaths: toolPaths,
  });
});

app.get("/ink", function (req, res) {
  const entriesDir = path.join(
    __dirname, // walks through 'content/entries' dir to render content
    "views",
    "works",
    "ink",
    "content",
    "entries"
  );
  const entryPaths = gatherPaths(entriesDir);
  res.render("works/ink/ink", { entryPaths: entryPaths });
});

app.get("/voice", (req, res) => {
  const entriesDir = path.join(
    // walks through 'content/entries' dir to render content
    __dirname,
    "views",
    "works",
    "voice",
    "content",
    "entries"
  );
  const entryPaths = gatherPaths(entriesDir);
  res.render("works/voice/voice", { entryPaths: entryPaths });
});

app.get("/changelog", (req, res) => {
  const markdownPath = path.join(
    __dirname,
    "views",
    "changelog",
    "changelog.md"
  );

  fs.readFile(markdownPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading changelog markdown: ", err);
      return res.status(500).send("Error loading changelog content.");
    }
    if (!marked) {
      console.error("Marked markdown parser is not ready yet.");
      return res.status(503).send("Server is not ready to parse markdown.");
    }
    const htmlContent = marked(data);
    res.render("layouts/boilerplate", { body: htmlContent });
  });
});

// Permitted Markdown pages exist in this directory
const MISC_DIR = path.resolve(__dirname, "views", "misc");
// Markdown to HTML rendering for entire pages
app.get("/:filename", (req, res) => {
  const { filename } = req.params;

  const INVALID_PATH_RE = /[/\\]/;
  const VALID_NAME_RE = /^\w[\w.-]*$/;
  if (INVALID_PATH_RE.test(filename) || !VALID_NAME_RE.test(filename)) {
    return res.status(400).render("utils/status400");
  }

  const candidatePath = path.join(MISC_DIR, `${filename}.md`);
  const resolvedPath = path.resolve(candidatePath);
  // Containment check - must remain in MISC_DIR
  if (!resolvedPath.startsWith(MISC_DIR + path.sep)) {
    console.warn(`Path-traversal attempt: ${filename} -> ${resolvedPath}`);
    return res.status(403).render("utils/status403");
  }
  
  fs.access(resolvedPath, fs.constants.R_OK, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.status(404).render("utils/status404");
      } 
      if (err.code === "EACCES" || err.code === "EPERM") {
        return res.status(403).render("utils/status403");
      }
      console.error(err);
      return res.status(500).render("utils/status500");
      
    } else {
      fs.readFile(resolvedPath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).render("utils/status500");
        
        } else {
          if (!marked) {
            console.error("Marked markdown parser is not ready yet.");
            return res.status(503).send("Server is not ready to parse markdown.");
          }
          const htmlContent = marked(data);
          res.render("layouts/boilerplate", { body: htmlContent });
        }
      });
    }
  });
});

// Error page routes
app.use((req, res, next) => {
  res.status(404);
  res.render("utils/status404");
});
app.use((req, res, next) => {
  res.status(429);
  res.render("utils/status429");
});
app.use((req, res, next) => {
  res.status(500);
  res.render("utils/status500");
});
app.use((req, res, next) => {
  res.status(503);
  res.render("utils/status503");
});

// Localhost server
app.listen(3000, () => {
  console.log("Serving on port 3000");
});

module.exports = app;
