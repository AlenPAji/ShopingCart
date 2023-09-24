var express = require("express");


var router = express.Router();
var adhelpers = require("../helpers/addproductbyadmin");
var usrhelpers = require("../helpers/getproductsforusers");
const fs = require("fs");

const upload = adhelpers.upload;

/* GET users listing. */
router.get("/", function (req, res, next) {
  usrhelpers.getmydata().then((responce) => {
    console.log(responce);
    var m="alen"
    res.render("admin/view-products", { responce, admin: true });
  });


});

router.get("/add-product", (req, res) => {
  res.render("admin/add-product");
});
//

router.post("/add-product", upload.single("image"), (req, res) => {

  var productDetails = {
    productname: req.body.productname,
    productdescription: req.body.productdescription,
    productcategory: req.body.productcategory,
    productprice: req.body.productprice,
  };

  console.log(productDetails);

  var imgDetails = {
    imgData: fs.readFileSync(req.file.path),
    imgContentType: req.file.mimetype,
  };

  adhelpers.addProdduct(productDetails, imgDetails);

  res.redirect("/admin");
});

router.get("/delete-product", (req, res) => {
  const productId = req.query.id;

  console.log(productId);
  adhelpers.deleteproduct(productId).then((responce) => {
    console.log(responce);
    res.redirect("/admin");
  });
});

module.exports = router;
