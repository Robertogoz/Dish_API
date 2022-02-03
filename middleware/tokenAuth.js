const jwt = require('jsonwebtoken');
var JWTSecret = "MasterKey";

function tokenAuth(req, res, next) {
    let authToken = req.headers['authorization'];

	if(authToken != undefined) {
		const bearer = authToken.split(' ');
		var token = bearer[1];
        

		jwt.verify(token, JWTSecret, (err, data) => {
			if(err) {
				res.status(401);
				res.json({err: "Invalid token"});
			} else {
				req.token = token;
				req.loggedUser = {id: data.id, email: data.email};
				next();
			}
		});
	} else {
		res.status(401);
		res.json({err: "Undefined token"});
	}
}

module.exports = tokenAuth;