var BROWSER = {
	init: function() {
		$.getJSON("/safdkasdfsfsdasfadsdfasadf.json", BROWSER.sucess)
	},
	sucess: function(agent) {
		agent = agent.toLowerCase();
		if ((agent.indexOf("iphone") > 0 || agent.indexOf("ipad") > 0) &&
			(agent.indexOf("mozilla/") !== -1) &&
			(agent.indexOf("applewebkit/") !== -1) &&
			(agent.indexOf("mobile/") !== -1) &&
			(agent.indexOf("safari") === -1)) {

			alert("apple Captive Network Assistant")
		} else if (agent.indexOf("wv") > 0) {
			alert("in an android wv...")
		} else {
			console.log("not an appce captive network...")

		}
		alert(agent);
	}
}