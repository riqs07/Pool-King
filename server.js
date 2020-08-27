let express = require('express')
let server = express() 
const router = express.Router();

const PORT = process.env.PORT || 9001;

server.listen (PORT, ()=>{
    console.log(`Wassup, your server go Usain Bolt.`)
    
  });

// Middleware
server.use(express.json({extended:false}))




  server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

  