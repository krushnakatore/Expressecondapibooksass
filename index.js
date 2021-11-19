const express = require ("express");

const users = require("./MOCK_DATA .json");

const app = express();

app.use(express.json());
const authorise = (permission) => {
    return (req, res, next) => {
      const originalSendFunc = res.send.bind(res);
      res.send = function (body) {
        body.api_requested_by = "Krushna Katore";
        // console.log(body); // do whatever here
        return originalSendFunc(body);
      };
      next();
    };
  };

  const logger = (req,res,next) =>{
    //   console.log(users);
       
        req.name = {api_requested_by:"Krushna Katore"}
        // console.log(req)
        // console.log({name,users})
        // res.send({name,users});
      next();
    }
  app.get("/books/:id",logger ,(req,res)=>{
    // const newUsers = req.params.id;
    let b = req.name
    const newUsers = users.map(user=>{
        if(Number(req.params.id) === Number(user.id)){
            newUsers1 = user;
            
        }
        return user;
    });
    res.send({b,newUsers1});
 
})
app.get("/books",logger ,(req,res)=>{
    console.log("GET")
    // console.log(name)
    // console.log({users})
    let b = req.name
    res.send({b,users});
})
app.post("/:books",logger ,(req,res)=>{
    let b = req.name
    const newUsers = [...users,req.body];
    res.send({b,newUsers});
  
})
app.patch("/books/:id",logger ,(req,res)=>{
    console.log(req.params.id)
    // res.send("patch")
    let b = req.name
    const newUsers = users.map(user=>{
        if(Number(req.params.id) === Number(user.id)){
            user = req.body;
        }
        return user;
    });
    res.send({b,newUsers});
})
app.delete("/books/:id",logger ,(req,res)=>{
    const newUsers = users.filter((user) =>
    Number(user.id) !== Number(req.params.id));
        
    
    let b = req.name
    res.send({b,newUsers});
    
})
app.listen(3000,(req,res)=>{
    console.log("3000 working")
})