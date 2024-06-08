const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const file = new File({
            filename: req.file.originalname,
            mimetype: req.file.mimetype,
            data: req.file.buffer
        });
        await file.save();
        res.status(201).send('File uploaded successfully');
    } catch (error) {
        res.status(400).send('Error uploading file');
    }
});

// Endpoint to get all files
router.get('/files', async (req, res) => {
    try {
        const files = await File.find({});
        res.status(200).json(files);
    } catch (error) {
        res.status(500).send('Error fetching files');
    }
});

// Endpoint to get a single file by id
router.get('/files/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).send('File not found');
        }
        res.set('Content-Type', file.mimetype);
        res.send(file.data);
    } catch (error) {
        res.status(500).send('Error fetching file');
    }
});

module.exports = router;
