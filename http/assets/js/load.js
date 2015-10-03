var LOAD = {
	images: [],

	init: function(user_type) {
		return false
		LOAD.image_array_generator([{
			"directory": "/assets/img/backgrounds/cellular/cellular_general/",
			"image_num": 81,
			"name": "cellular"
		}, {
			"directory": "/assets/img/backgrounds/water/water_general/",
			"image_num": 61,
			"name": "water"
		}, {
			"directory": "/assets/img/backgrounds/wave/wave_general/",
			"image_num": 81,
			"name": "wave"
		}, {
			"directory": "/assets/img/backgrounds/human/human_general/",
			"image_num": 81,
			"name": "human"
		}]);

		var image = new Image();
		image.onload = function() {
			var current_image = LOAD.images.shift();
			if (current_image) {
				this.src = current_image;
			}
		};
		image.src = LOAD.images.shift();
	},
	image_array_generator: function(arr) {
		for (i = 0; i < arr.length; i++) {
			for (j = 0; j < arr[i].image_num - 1; j++) {
				LOAD.images.push(arr[i].directory + arr[i].name + "_" + j + ".jpg");
			}
		}
	},
	interval_speed: 100,
	user_type: null,
	background_itterator: null,
	bk1: null,
	bk2: null,
	count: 0,
	special: null,
	loop_times: 0,
	background_lengths: {
		'cellular': 80,
		'water': 60,
		'wave': 80,
		'human': 80,
		'birds': 58,
		'city': 59,
		'farm': 39,
		'huricane': 59,
		'monsoon': 59,
		'nuke': 69,
		'oilspill': 79,
		'trees': 49,
		'volcanoe': 74
	},
	set_new_user_type_and_start: function(type) {
		//return false
		// console.log("set User tyep for load interval " + type)
		if (LOAD.user_type == type) {
			return false;
		};
		LOAD.user_type = type;
		if (LOAD.background_itterator == null) {
			LOAD.background_itterator = setInterval(LOAD.background_loop, LOAD.interval_speed);
			LOAD.bk1 = $("#background_container_a img");
			LOAD.bk2 = $("#background_container_b img");
		} else {
			// console.log("has already been set");
		}
	},
	background_loop: function() {
		if (!LOAD.special) {
			LOAD.bk2.attr("src", 'assets/img/backgrounds/' + LOAD.user_type + "/" + LOAD.user_type + "_general/" + LOAD.user_type + "_" + LOAD.count + '.jpg');

			LOAD.count += 1;
			if (LOAD.count > LOAD.background_lengths[LOAD.user_type] - 1) {
				LOAD.count = 0;
			}
		} else {
			LOAD.bk2.attr("src", 'assets/img/backgrounds/out_' + LOAD.special + "/" + LOAD.special + "_" + LOAD.count + '.jpg');
			LOAD.count += 1;

			// check to see if there are still more loops
			if (LOAD.count > LOAD.background_lengths[LOAD.special] - 1 && LOAD.loop_times > 0) {
				LOAD.loop_times -= 1;
				LOAD.count = 0;
			} else {
				// check if it's the last loop

				// exit animation begins
				if (LOAD.count + 15 > LOAD.background_lengths[LOAD.special]) {
					$("#wrapper").addClass("fade_out_in");
				}

				if (LOAD.count > LOAD.background_lengths[LOAD.special] - 1) {
					LOAD.special = null;
					GAME.phase3.init();
				}
			}

		}
	},
	set_special_animation: function(outcome_type) {
		// console.log("special animation");
		LOAD.special = outcome_type;
		LOAD.count = 0;
		LOAD.loop_times = 2;
		$("#wrapper").removeClass("fade_out_in");
		// $("#pairing_success_icon").removeClass("fade_out_in");
		$("#pairing_success_icon img").attr("src", "/assets/img/outcomes_icons_centered/" + outcome_type + ".png");
		if (LOAD.background_itterator == null) {
			LOAD.background_itterator = setInterval(LOAD.background_loop, LOAD.interval_speed);
			LOAD.bk1 = $("#background_container_a");
			LOAD.bk2 = $("#background_container_b");
		}
	}

}