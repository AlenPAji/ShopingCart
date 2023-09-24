var db=require('../../config/connection')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    name : String,
    email : String,
    password : String

  });

const user= mongoose.model('user', userSchema);

function register(userData){

    return new Promise(async(resolve,reject)=>{
        userData.password=await bcrypt.hash(userData.password,10)
        const newuser = new user();
        newuser.name=userData.name;
        newuser.email=userData.email;
        newuser.password=userData.password;

        newuser.save();

        resolve(newuser);
    })

}

function login(userdata){
    return new Promise(async(resolve,reject)=>{
        let response={};
        const eml=userdata.email;
        const psd=userdata.password;


        const filter={email:eml}
        const val=await user.findOne(filter).exec();
        if(val){

            bcrypt.compare(psd, val.password, function(err, result) {
                if(result){
                    response.val=val;
                    response.status=true;
                    resolve(response)
                }else{
                    console.log("wrong password");
                    resolve({status:false})
                }
            });
        }
        else{
           console.log("seen");
           resolve({status:false})
        }
    }
    )

   

    // async function fnd(){
    //     const filter={email:eml}
    //     const val=await user.findOne(filter).exec();
    //     if(val){

    //         bcrypt.compare(psd, val.password, function(err, result) {
    //             if(result){
    //                 console.log("success");
    //             }else{
    //                 console.log("wrong password");
    //             }
    //         });
    //     }
    //     else{
    //        console.log("seen");
    //     }
    // }

    // fnd();
}

module.exports = {
    register,
    login
}
  