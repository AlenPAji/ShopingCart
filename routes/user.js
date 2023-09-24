var express = require('express');
var userlogin = require('../helpers/userhelpers/userlogin')
var usrhelpers = require("../helpers/getproductsforusers")
var adhelpers = require("../helpers/addproductbyadmin")
var router = express.Router();

const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  
  async function c(){
  let user=req.session.user;
  console.log(user)

  const products=await usrhelpers.fnd();
  
    
    
    res.render('user/index', {products,admin:false,user});
  }

 c();


 
  

})

router.get('/login',(req,res,next)=>{
  if(req.session.loggedIn){

    res.redirect("/");

    
  }
  else{
  res.render('user/userlogin',{"loginErr":req.session.loginErr})
  req.session.loginErr=null;
  }
})

router.get('/signup',(req,res,next)=>{
  res.render('user/usersignup')
})

router.post('/signup',(req,res)=>{
  userlogin.register(req.body).then((response)=>{
    console.log(response)
    res.redirect("/");
  })
})

router.post('/login',(req,res)=>{

  


userlogin.login(req.body).then((response)=>{
  if(response.status){
    req.session.loggedIn=true;
    req.session.user=response.val;
    res.redirect("/");
  }else{
    req.session.loginErr="Invalid login credentials please try again";
    res.redirect("/login");
  }
})
  
})

router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect("/");
})

router.get("/cart",verifyLogin,(req,res,next)=>{

  res.render('user/cart');
})

module.exports = router;
