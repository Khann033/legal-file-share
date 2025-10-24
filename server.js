// server.js (simple prototype)
// Note: For production, replace mock auth with real JWT/OAuth and use S3 presigned uploads for large files.

const express = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());

// mock auth middleware (replace with JWT in prod)
function auth(req, res, next) {
  const token = req.headers.authorization || '';
  if (!token) return res.status(401).json({ error: 'unauth' });
  req.user = { email: 'demo@example.com' };
  next();
}

// upload endpoint
app.post('/api/upload', auth, upload.single('file'), (req, res) => {
  const f = req.file;
  // Ideally store metadata in DB here
  res.json({ id: f.filename, name: f.originalname, size: f.size, uploaderEmail: req.user.email });
});

// list files
app.get('/api/files', auth, (req, res) => {
  const files = fs.readdirSync(uploadDir).map(fn => {
    const stats = fs.statSync(path.join(uploadDir, fn));
    return { id: fn, name: fn.split('-').slice(1).join('-'), size: stats.size, uploaderEmail: 'demo@example.com' };
  });
  res.json({ files });
});

// download
app.get('/api/download/:id', auth, (req, res) => {
  const filePath = path.join(uploadDir, req.params.id);
  if (!fs.existsSync(filePath)) return res.status(404).send('Not found');
  res.download(filePath);
});

app.listen(4000, () => console.log('API on http://localhost:4000'));
