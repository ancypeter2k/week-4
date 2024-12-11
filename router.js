var express = require("express");
var router = express.Router();

const credential={
    email:"admin@gmail.com",
    password:"admin123"
}
router.get("/",(req,res)=>{
    if(req.session.user){
        res.redirect('/dashboard')
    }
    else{
        res.redirect('/login')
    }
})
router.get('/login',(req,res)=>{
    if(req.session.user){
        res.redirect('/')
    }
    else{
        res.render("base",{title:"Login System"});
        
    }
})
//login user
router.post("/login",(req,res)=>{
   if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user = req.body.email;
        res.redirect('/')
       //res.end("Login Successful.......!");
       console.log('email and password is correct')
   }else{
        res.render('base',{error:'invalid password'})
   }
});

//route for dashboard
router.get("/dashboard",(req,res)=>{
    console.log(req.session)
    if(req.session.user){
        res.render("dashboard",{user:req.session.user})
    }else{
        res.redirect('/login');
    }
})

//route for logout
router.post("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render("base",{title:"Express",logout:"Logout Successfully.....!"})
        }
    })
})

module.exports=router;
