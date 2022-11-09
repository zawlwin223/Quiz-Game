let http=require ("http")
let path = require("path")
let url=require ("url")
let fs=require ("fs")

let file_extension_type={
    ".html":"text/html",
    ".css":"text/css",
    ".js":"application/javascript",
    ".jpg":"image/jpeg",
    ".png":"image/png",
    ".svg":"image/svg",

}

function check_file_acess(file_direction){
    return new Promise((resolve,reject)=>{
        fs.access(file_direction,fs.F_OK,(err)=>{
            if(err){
               reject("File doesnt exist")
            }else{
                resolve(file_direction)
            }
          })
    })
 
}
function read_file(file_direction){
    return new Promise((resolve,reject)=>{
       fs.readFile(file_direction,(err,data)=>{
          if(!err){
           resolve(data)
          }else{
            reject(err)
          }
       })
    })
}

let server=http.createServer((req,res)=>{
    let url_parsing=url.parse(req.url,true)
    let path_name=url_parsing.pathname=="/"?"/index.html":url_parsing.pathname
    let ext=path.extname(path_name)
    let file_direction=__dirname+path_name
    check_file_acess(file_direction)
    .then(read_file)
    .then((data)=>{
        res.writeHead(200,{"Content-Type":file_extension_type[ext]})
        res.end(data)
       
    })
    .catch((err)=>{console.log(err)})
})
server.listen(3000,()=>{
    console.log("Server is running")
})