const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express=require("express");
const app= express();
const path=require("path");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password:"Bushra@0078"
});
app.get("/",(req,res)=>{
  let q="select count(*)from temp ";
    connection.query(q,(err,result)=>{
    try{
        if(err) throw err;
        console.log(result);
        let count=result[0]["count(*)"];
      res.render("home.ejs",{count});
    }
    catch(err){
        console.log(err);
        res.send("something wrong")
    }
     })
});
app.get("/users",(req,res)=>{
  let q="select * from temp";
  connection.query(q,(err,result)=>{
    try{
        if(err) throw err;
        console.log(result[0]);
      res.render("show.ejs",{result});
    }
    catch(err){
        console.log(err);
        res.send("something wrong")
    }
     })
});
app.get("/users/:id/edit",(req,res)=>{
  let {id}=req.params;
  console.log(id);
  let q=`select * from temp where id='${id}'`;
  connection.query(q,(err,result)=>{
    try{
        if(err) throw err;
        let users=(result[0]);
        res.render("edit.ejs",{users});
    }
    catch(err){
        console.log(err);
        res.send("something wrong")
    }
     })

});
app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let {password:newpass,username:newuser}=req.body;
  let q=`select * from temp where id='${id}'`;
  connection.query(q,(err,result)=>{
    try{
        if(err) throw err;
        let users=(result[0]);
        if(newpass!=users.password){
        res.send("wrong password");}
        else{
          let q2=`update temp set username ='${newuser}' where id='${id}'`;
          connection.query(q2,(err,result)=>{
       try{
        if(err) throw err;
        res.redirect("/users");
      }
       catch(err){
        console.log(err);
        res.send("something wrong")
    }
     })
        }
        // res.render("edit.ejs",{users});
    }
    catch(err){
        console.log(err);
        res.send("something wrong")
    }
     })
});
// let randomuser= ()=> {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// }

// let q= " insert into temp (id, username,email,password) values ?";
// let val=[];
// for(let i=1;i<=100;i++){
//   val.push(randomuser());
// }

// connection.query(q,[val],(err,result)=>{
//     try{
//         if(err) throw err;
//         console.log(result);
//     }
//     catch(err){
//         console.log(err);
//     }

// });
// connection.end();
let port =3000;
app.listen(port,()=>{
  console.log("server is listining at the port 3000");
})
