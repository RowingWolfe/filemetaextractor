const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = 3000;
const fileDir = __dirname + '/files';

//Middleware
app.use(fileUpload());


//Routes
app.get('/', (req, res, next)=>{
    res.send(`
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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});