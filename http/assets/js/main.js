var APP = {
	fullscreen: false,
	IP: "192.168.2.1:80",
	//IP: "10.0.1.7:8000",
	init: function() {
		BROWSER.init(false);
		GAME.init();
		LOAD.init();
	},
	pr: function(message) {
		$("#jsmessage")[0].innerHTML = message;
	},
	print_data: function(data) {
		if (typeof(data) !== "object" && !data.length) {
			console.log(data);
			return false;
		}
		if (!data.length) {
			console.log("\n\n");
			for (var key in data) {
				console.log(key);
				console.log(data[key]);
			}
			console.log("\n\n");
			return false;
		};
	}
}