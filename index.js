const express = require('express');
const fileUpload = require('express-fileupload');

//Config
const app = express();
const PORT = 3000;

//Middleware
app.use(fileUpload());

//Routes
app.get('/', (req, res, next)=>{
    res.send(`
    <h1>File goes in</h1>
    <h2>Data comes out</h2>
    <h3>That's what skulljack labs web concern is all about.</h3>
    <form ref='uploadForm' 
    id='uploadForm' 
    action='/upload' 
    method='post' 
    encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />   
        </form>
    `);
});

//Upsy daisy.
app.post('/upload', (req,res,next) =>{
    if (!req.files)
    return res.status(400).send('No files were uploaded.');

    let file = req.files.sampleFile;
    let fileInfo = {
        'name': file.name,
        'type': file.mimetype,
        'size': `${file.data.length} bytes`,
        'dump': file
    };
    
    file.mv('./files');
    res.send(fileInfo);
});

//Wake up and do your job, server.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});