var express = require('express');
const router = express.Router();
const { executeQuery, config, sql } = require('./database');

 //GET API
 router.get("/", function(req , res){
    // console.log(req.body);
    var query = "select A.*, B.pname from [tblBillOfMaterial] A INNER JOIN tblProductMaster B ON A.productid = B.productid";
    executeQuery (res, query);
});

//GET API
router.get("/:id", function(req , res){
    var query = '';
    // console.log(req.params);
    if(req.params.id == 'getall')
    {
        query = "select bomid,bname from [tblBillOfMaterial]";
    }
    else if(req.params.id.substr(0,2) == 'pi')
    {
        query = "select * from [tblBillofMaterialItems] where bomid=" + req.params.id.substr(2);
    }
    else 
    {
        query = "select * from [tblBillOfMaterial] where bomid=" + req.params.id;
    }
    // console.log(query);
    executeQuery (res, query);
});


//POST API
router.post("/", function(req , res){
    var query = "INSERT INTO [tblBillOfMaterial] (bname, productid, bqty,bcreatedby,isactive,isdeleted) VALUES ('" + req.body.Name + "'," + req.body.ProductId + "," + req.body.Quantity + "," + req.body.CreatedBy + "," + req.body.Active + "," + req.body.IsDeleted + ");";
    query = query + " SELECT SCOPE_IDENTITY() AS id;";
    
    var conn = new sql.Connection(config);
    conn.connect().then(function () {
        var request = new sql.Request(conn);
        console.log(query);
		request.query(query)
		.then(function (result) {
            console.log(result);
            bomid = result[0].id;
            console.log(bomid);
            conn.close();
            if(bomid > 0)
            {
                const itemString = req.body.items;
                items = JSON.parse(JSON.stringify(itemString));
                for(var i = 0; i < items.length; i++) {
                      query = "INSERT INTO [tblBillofMaterialItems] (bomid, itemorproduct, itemorproductid, itemquantity, productid) VALUES (" + bomid + "," + items[i].itemorproduct +"," + items[i].itemorproductid + "," + items[i].iquantity + "," + items[i].productid + ")";
                    executeQuery (res, query);
                }
            }    
        }).catch(function (err) {
            // console.log(err);
			conn.close();
        });
    }).catch(function (err) {
		// console.log(err);
    });  
});

//PUT API
router.put("/:id", function(req , res){
    var query = "UPDATE [tblBillOfMaterial] SET bname= '" + req.body.Name  +  "' ,productid=" + req.body.ProductId+  " ,bqty=" + req.body.Quantity +  ", bmodifiedon=" + req.body.ModifiedOn +  ", bmodifiedby=  " + req.body.ModifiedBy + " WHERE bomid= " + req.params.id;
    var conn = new sql.Connection(config);
    conn.connect().then(function () {
        var request = new sql.Request(conn);
        console.log(query);
		request.query(query)
		.then(function (result) {
            console.log(result);
            bomid = req.params.id;
            console.log(bomid);
            conn.close();
            if(bomid > 0)
            {
                conn = new sql.Connection(config);
                conn.connect().then(function () {
                    var request = new sql.Request(conn);
                    query = "delete from [tblBillofMaterialItems] where bomid=" + bomid;
                    console.log(query);
                    request.query(query)
                    .then(function (result) {
                        const itemString = req.body.items;
                        items = JSON.parse(JSON.stringify(itemString));
                        for(var i = 0; i < items.length; i++) {
                            query = "INSERT INTO [tblBillofMaterialItems] (bomid, itemorproduct, itemorproductid, itemquantity) VALUES (" + bomid + "," + items[i].itemorproduct +"," + items[i].itemorproductid + "," + items[i].iquantity + ")";
                            executeQuery (res, query);
                        }
                    }).catch(function (err) {
                        // console.log(err);
                        conn.close();
                    });
                }).catch(function (err) {
                    // console.log(err);
                });  
            }    
        }).catch(function (err) {
            // console.log(err);
			conn.close();
        });
    }).catch(function (err) {
		// console.log(err);
    });  
});

// DELETE API
router.delete("/:id", function(req , res){
    var query = "DELETE FROM [tblBillOfMaterial] WHERE bomid=" + req.params.id;
    executeQuery (res, query);

    var query = "DELETE FROM [tblBillofMaterialItems] WHERE bomid=" + req.params.id;
    executeQuery (res, query);
});

module.exports = router;