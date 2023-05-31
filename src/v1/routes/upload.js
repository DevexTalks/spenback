const express = require('express');
const uploadRouter = express.Router();
const uploadController = require('../../controllers/upload.controller');

uploadRouter
    .post('/startProcessing' , uploadController.startProcess)

    .get('/uploaded/:foldername', uploadController.getUploadedFiles)

    .post('/', uploadController.up.single("files"), uploadController.uploadtoFTP)
    
    .post('/delete', uploadController.deleteFile);   

module.exports = uploadRouter;