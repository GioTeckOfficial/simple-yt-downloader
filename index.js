const ytdl=require("ytdl-core");
const express=require("express");
const fs=require("fs")
const app=express();
var crypto = require('crypto');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/download',express.static("tmp"))
app.use('/',express.static("public"));

app.post("/post", (req,res)=>{
    let url=req.body.url;
    let file=crypto.createHash('md5').update(url).digest('hex');
    ytdl(url,{format:'mp3',filter:'audioonly'})
        .pipe(fs.createWriteStream(`./tmp/${file}.mp3`))
        .on('finish',()=>{
            res.download(`./tmp/${file}.mp3`,(err)=>{
                if(err) return console.log(err)
                fs.unlinkSync(`./tmp/${file}.mp3`);
            });
        });
    
});

app.listen(8080,()=>{
    fs.mkdirSync("./tmp",{recursive:true});
    console.log("Ready!");
});