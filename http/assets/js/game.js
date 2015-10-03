var GAME = {
	fullscreen: false,
	init: function() {

		if (Cookies.get('element')) {
			GAME.phase3.init();
		} else {
			GAME.phase1.init();
		}

	}
}

// PREAMBLE
GAME.phase1 = {
	first: true,
	init: function() {
		$(document.body).removeClass().addClass("phase1");

		if (GAME.phase1.first) {
			$("#user_to_phase2").click(GAME.phase1.next_phase);
			GAME.phase1.first = false;
		}
	},
	next_phase: function(event) {
		event.preventDefault();
		if (APP.fullscreen && screenfull.enabled) {
			screenfull.request();
		}
		if (screenfull.enabled && GAME.fullscreen == true) {
			screenfull.request();
		}
		GAME.phase2.init();
		return false;
	}
}

// Element Type
GAME.phase2 = {
	first: true,
	init: function() {
		$(document.body).removeClass().addClass("phase2");
		if (GAME.phase2.first) {
			GAME.phase2.first = false;
			$("#user_choose_type a").click(GAME.phase2.set_type);
		}
	},
	set_type: function(event) {
		event.preventDefault();
		var userElement = this.href.split("#").pop();
		Cookies.set('element', userElement);
		$("#background_element_color").addClass(userElement);
		$("#wrapper").addClass("fade_out_in");
		GAME.phase2.next_phase(event);
		return false;
	},
	next_phase: function(event, userElement) {
		event.preventDefault();
		if (!userElement) {
			var userElement = PAIR.D.element;
		}
		$("#background_element_color").addClass("open");
		LOAD.set_new_user_type_and_start(userElement);

		setTimeout(function() {
			GAME.phase3.init();
			return false;
		}, 2500);
	}
}

// The first step in pairing!
GAME.phase3 = {
	init: function(error) {
		PAIR.D.element = Cookies.get('element');
		PAIR.init();

		if (!PAIR.D.element) {
			GAME.phase2.init();
			return false;
		}
		if (!error) {
			error = "";
		} else {
			$("#user_errors").removeClass().addClass(error + " fade_remove");
			setTimeout(function() {
				$("#user_errors").removeClass();
			}, 3000);
		}
		LOAD.set_new_user_type_and_start(PAIR.D.element);
		APP.pr(error); //for debugging
		//$(document.body).removeClass().addClass("phase3 " + PAIR.D.element + error);
		$(document.body).removeClass().addClass("phase3 " + PAIR.D.element);
		//Start the pairing process
	}
}





GAME.phase4 = {
	init: function() {
		$(document.body).removeClass().addClass("phase4 " + PAIR.D.element);
	}
}

GAME.phase5 = {
	// first: true,
	//>> {"outcome":"nuke","become_element":"human"}
	init: function(elements) {
		$(document.body).removeClass().addClass("phase5 " + PAIR.D.element);
		console.log("===========\nphase5\n===========")
		$("#pairing_success").html(elements["outcome"]);

		//set up the new user type
		LOAD.user_type = elements["become_element"];
		Cookies.set('element', elements["become_element"]);

		// animate the explosion one cylce
		LOAD.set_special_animation(elements["outcome"]);



		// if (GAME.phase5.first) {
		// 	GAME.phase5.first = false;
		// 	$("#paired_keep_playing").click(GAME.phase5.keep_playing);
		// }
	},
	set_out_come_icon: function(type) {

	},
	keep_playing: function(event) {
		event.preventDefault();
		GAME.phase3.init();
		return false;
	},
	element_swap: function(elements) {
		// console.log(elements);
	}
}