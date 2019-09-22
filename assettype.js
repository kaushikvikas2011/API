var express = require('express');
const router = express.Router();
const { executeQuery } = require('./database');


 //GET API
 router.get("/", function(req , res){
    // console.log(req.body);
    var query = "select * from [tblAssetTypeMaster]";
    executeQuery (res, query);
});

//GET API
router.get("/:id", function(req , res){
    var query = '';
    // console.log(req.body);
    if(req.params.id == 'getall')
    {
        query = "select assettypeid,aname from [tblAssetTypeMaster]";
    }
    else 
    {
        query = "select * from [tblAssetTypeMaster] where assettypeid=" + req.params.id;
    }
    executeQuery (res, query);
});


//POST API
router.post("/", function(req , res){
    // console.log(req.body);
    var query = "INSERT INTO [tblAssetTypeMaster] (aname,acreatedby,isactive,isdeleted) VALUES ('" + req.body.Name + "'," + req.body.CreatedBy + "," + req.body.Active + "," + req.body.IsDeleted + ")";
    executeQuery (res, query);
});

//PUT API
router.put("/:id", function(req , res){
    var query = "UPDATE [tblAssetTypeMaster] SET aname= '" + req.body.Name  +  "' , amodifiedon=" + req.body.ModifiedOn +  ", amodifiedby=  " + req.body.ModifiedBy + " WHERE assettypeid= " + req.params.id;
    // console.log(query);
    executeQuery (res, query);
});

// DELETE API
router.delete("/:id", function(req , res){
    var query = "DELETE FROM [tblAssetTypeMaster] WHERE assettypeid=" + req.params.id;
    executeQuery (res, query);
});

module.exports = router;