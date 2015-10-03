var LOAD = {
	images: [],

	init: function(user_type) {
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
	user_type: null,
	background_itterator: null,
	bk1: null,
	bk2: null,
	count: 0,
	background_lengths: {
		'cellular': 80,
		'water': 60,
		'wave': 80,
		'human': 80
	},
	set_new_user_type_and_start: function(type) {
		console.log("set User tyep for load interval " + type)
		if (LOAD.user_type == type) {
			return false;
		};
		LOAD.user_type = type;
		if (LOAD.background_itterator == null) {
			LOAD.background_itterator = setInterval(LOAD.background_loop, 150);
			LOAD.bk1 = $("#background_container_a");
			LOAD.bk2 = $("#background_container_b");
		} else {
			console.log("has already been set");
		}
	},
	background_loop: function() {
		if (LOAD.bk1.hasClass("active")) {
			LOAD.bk2.addClass("active");
			LOAD.bk1.removeClass("active").css("background-image", 'url("assets/img/backgrounds/' + LOAD.user_type + "/" + LOAD.user_type + "_general/" + LOAD.user_type + "_" + LOAD.count + '.jpg")');
		} else {
			LOAD.bk1.addClass("active")
			LOAD.bk2.removeClass("active").css("background-image", 'url("assets/img/backgrounds/' + LOAD.user_type + "/" + LOAD.user_type + "_general/" + LOAD.user_type + "_" + LOAD.count + '.jpg")');
		}
		LOAD.count += 1;
		if (LOAD.count > LOAD.background_lengths[LOAD.user_type] - 1) {
			LOAD.count = 0;
		}
	}

}