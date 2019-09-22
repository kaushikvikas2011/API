const sql = require("mssql");

//Initiallising connection string
const config = {
    user:  "sa",
    password: "SCStech@123",
    server: "139.180.136.177",
    database: "europa"
};

//Function to connect to database and execute query
function executeQuery(res, query)
{             
	var conn = new sql.Connection(config);
    conn.connect().then(function () {
        var request = new sql.Request(conn);
		request.query(query)
		.then(function (result) {
            // console.log(result);
			conn.close();
			res.send(result);
        }).catch(function (err) {
			conn.close();
			res.send(err);
        });
    }).catch(function (err) {
		res.send(err);
    });     
}

module.exports = {
	executeQuery,
    config,
    sql
};