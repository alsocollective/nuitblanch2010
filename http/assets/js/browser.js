var BROWSER = {
	init: function(skip) {
		console.log(skip);
		$.getJSON("/safdkasdfsfsdasfadsdfasadf.json", BROWSER.sucess)
		if (skip) {
			BROWSER.make_captive_portal_active();
		}
	},
	sucess: function(agent) {
		agent = agent.toLowerCase();
		if ((agent.indexOf("iphone") > 0 || agent.indexOf("ipad") > 0) &&
			(agent.indexOf("mozilla/") !== -1) &&
			(agent.indexOf("applewebkit/") !== -1) &&
			(agent.indexOf("mobile/") !== -1) &&
			(agent.indexOf("safari") === -1)) {

			BROWSER.make_captive_portal_active();
			// alert("apple Captive Network Assistant")
		} else if (agent.indexOf("wv") > 0) {
			BROWSER.make_captive_portal_active();
			// alert("in an android wv...")
		} else {
			console.log("not an appce captive network...")

		}
		// alert(agent);
	},
	make_captive_portal_active: function() {
		console.log("captive portal");
		$("#wrapper").addClass("captive_portal_active")
	}
}