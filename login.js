const express=require("express");
const request=require("request");
const bodyparse=require("body-parser");
const https= require("https");
 const app= express();
 app.use(bodyparse.urlencoded({extended:true}));
 app.use(express.static("public"));

 app.get("/",function(req,res){
     res.sendFile(__dirname+"/index.html");
 })
 app.post("/",function(req,res){
const firstname=req.body.fname;
const lastname =req.body.lname;
const email=req.body.emails;
const addres=req.body.adress;
const phone =req.body.phone;
const  data ={
    members:[
        {
        email_address : email,
        status : "subscribed",
        merge_fields :{
            FNAME:firstname,
            LNAME:lastname,
            ADDRESS:addres,
            PHONE:phone

        }
      }
    ]
   };
   const newdata=JSON.stringify(data);
   const url="https://us6.api.mailchimp.com/3.0/lists/6a058e944e";
   const option={
       method: "POST",
       auth: "vinay:6c1b826f9734cbd1db834764b48accf7-us6"
   }
    const request=https.request(url,option,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/succes.html");
        }
        else{
            res.sendFile(__dirname+"/fali.html");
        }
     

    })
    request.write(newdata);
    request.end();
});

  app.listen(process.env.PORT||250,function(){
      console.log("your server is ready");
  })
