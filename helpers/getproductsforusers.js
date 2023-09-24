var adhelpers = require("../helpers/addproductbyadmin")

function getmydata(){

    return new Promise(async(resolve,reject)=>{

        const all =await adhelpers.Image.find({}).lean()
       

        resolve(all);
    })

}





async function fnd() {
const all =await adhelpers.Image.find({}).lean()

return all;
}

module.exports = {
    fnd,
    getmydata
}


