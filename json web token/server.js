const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, "profilePics");
    },
    filename:  (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  })
  
  const upload = multer({ storage: storage })


let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("profilePics", express.static("profilePics"));

app.post("/signup", upload.single("profilePic"), async (req,res)=>{
   console.log(req.body);
   console.log(req.files);
   console.log(req.file);

   try{
    let newUser = new User({
        firestName:req.body.firstName,
        lastName:req.body.lastNmae,
        age:req.body.age,
        email:req.body.email,
        password:req.body.password,
        mobileNo:req.body.mobileNo,
        profilePic:req.file.path,
       });
    
       await User.insertMany([newUser]);
    
    
       res.json({ status: "success", msg:"User created successfully." });
   
    }catch(err){
     res.json({status:"failure",msg:"Unable to create account."});
   }

});

app.post("/login",upload.none(),async (req,res)=>{
    console.log(req.body);


    let userDetailsArr = await User.find().and({email:req.body.email});

      console.log(userDetailsArr);

      if(userDetailsArr.length > 0){
       if(userDetailsArr[0].password === req.body.password){

        let token = json.sign({email:req.body.email,password:req.body.password},
          "blablabla"
        );

            let dataToClient ={
                firstName:userDetailsArr[0].firstName,
                lastName:userDetailsArr[0].lastName,
                age:userDetailsArr[0].age,
                email:userDetailsArr[0].email,
                password:userDetailsArr[0].password,
                mobileNo:userDetailsArr[0].mobileNo,
                profilePic:userDetailsArr[0].profilePic,
                token: token,
            };

            res.json({status:"success",data:dataToClient});

        }else {
            res.json({status:"failure",msg:"Invalid Password"})
        }
        
      }else{
        res.json({status:"failure",msg:"Invalid Email"});
      }
  });

app.post("/validateToken",upload.none(),async(req,res)=>{
  console.log(req.body.token);

  let decryptedToken = jwt.verify(req.body.token,"blablabla")

  console.log(decryptedToken);

  let userDetailsArr = await User.find().and({email:decryptedToken.email});

      console.log(userDetailsArr);

      if(userDetailsArr.length > 0){
       if(userDetailsArr[0].password === decryptedToken.password){

        
            let dataToClient ={
                firstName:userDetailsArr[0].firstName,
                lastName:userDetailsArr[0].lastName,
                age:userDetailsArr[0].age,
                email:userDetailsArr[0].email,
                password:userDetailsArr[0].password,
                mobileNo:userDetailsArr[0].mobileNo,
                profilePic:userDetailsArr[0].profilePic,
              
            };

            res.json({status:"success",data:dataToClient});

        }else {
            res.json({status:"failure",msg:"Invalid Password"})
        }
        
      }else{
        res.json({status:"failure",msg:"Invalid Email"});
      }
});

app.listen(5000,()=>{
    console.log("Listening to port 5000");
});


let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:String,
    profilePic:String,
});

let User = new mongoose.model("users",userSchema,"users");

    try{
        let newUser = new User({
            firstName:"Vedha",
            lastName:"K",
            age:20,
            email:"vedha@gmail.com",
            password:"vedha",
            mobileNo:"+918968899473",
            
           });
        
           User.insertMany([newUser]);
           console.log("inserted data into db successfully");
        
    }catch(err){
       console.log("Unable to insert data into DB")
    }
    
    
    let connectToMDB = async ()=>{

      try{
        mongoose.connect("mongodb+srv://santhoshikumari:santhoshikumari@bath2408cluster.vp7w6.mongodb.net/BatchID?retryWrites=true&w=majority&appName=Bath2408Cluster");

       console.log("Successfully connected to MDB");

     

    }catch (err){
    console.log("Unable to connect to MDB"); 
    console.log(err);  
    }
    
};

connectToMDB();