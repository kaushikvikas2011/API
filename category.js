var express = require('express');
const router = express.Router();
const { executeQuery } = require('./database');


 //GET API
 router.get("/", function(req , res){
    // console.log(req.body);
    var query = "select * from [tblCategoryMaster]";
    executeQuery (res, query);
});

//GET API
router.get("/:id", function(req , res){
    var query = '';
    // console.log(req.body);
    if(req.params.id == 'getall')
    {
        query = "select 0 as categoryid,'Select Parent Category' as cname union select categoryid,cname from [tblCategoryMaster] where pcategoryid = 0";
    }
    else 
    {
        query = "select * from [tblCategoryMaster] where categoryid=" + req.params.id;
    }
    executeQuery (res, query);
});


//POST API
router.post("/", function(req , res){
    // console.log(req.body);
    var query = "INSERT INTO [tblCategoryMaster] (cname,pcategoryid,ccreatedby,isactive,isdeleted) VALUES ('" + req.body.Name + "'," + req.body.PCategoryId + "," + req.body.CreatedBy + "," + req.body.Active + "," + req.body.IsDeleted + ")";
    executeQuery (res, query);
});

//PUT API
router.put("/:id", function(req , res){
    var query = "UPDATE [tblCategoryMaster] SET cname= '" + req.body.Name  +  "' , pcategoryid=  " + req.body.PCategoryId +  " , cmodifiedon=" + req.body.ModifiedOn +  ", cmodifiedby=  " + req.body.ModifiedBy + "  WHERE categoryid= " + req.params.id;
    // console.log(query);
    executeQuery (res, query);
});

// DELETE API
router.delete("/:id", function(req , res){
    var query = "DELETE FROM [tblCategoryMaster] WHERE categoryid=" + req.params.id;
    executeQuery (res, query);
});

module.exports = router;