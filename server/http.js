var http = {

	init: function() {
		console.log("http starting")
		http.connect = require('connect');
		http.staticServer = require('serve-static');
		http.http = require('http');

		http.app = http.connect().use(function(req, res, next) {
			//next();
			//return false;
			if (req.url == "/safdkasdfsfsdasfadsdfasadf.json") {
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				res.end(JSON.stringify(req.headers["user-agent"]));
			} else if (req.headers.host != 'www.chthulu.org') {
				res.writeHead(302, {
					Location: 'http://www.chthulu.org'
				});
				res.end();
			} else next();
		}).use(http.staticServer(__dirname + "/../http", {
			maxAge: '1d',
			setHeaders: http.set_custom_cache_control
		}));
		http.server = http.http.createServer(http.app);
	},
	start: function() {
		// http.server.listen(80, "158.69.10.32");
		http.server.listen(80); //local
		console.log("http server starting on port 80")
	},
	set_custom_cache_control: function(res, path) {
		if (http.staticServer.mime.lookup(path) != "image/jpeg" && http.staticServer.mime.lookup(path) != "image/png") {
			res.setHeader('Cache-Control', 'public, max-age=0')
		}
	}
}

exports.http = http;