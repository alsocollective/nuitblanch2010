var LOAD = {
	images: [],

	init: function(user_type) {

		//Local storage is an option

		console.log(user_type); //if user type is then load these images and stuff

		LOAD.image_array_generator([{
			"directory": "/assets/img/background/cellular/cellular_general/",
			"image_num": 11
		}, {
			"directory": "/assets/img/background/water/water_general/",
			"image_num": 6
		}, {
			"directory": "/assets/img/background/wave/wave_general/",
			"image_num": 6
		}, {
			"directory": "/assets/img/background/human/human_general/",
			"image_num": 6
		}]);

		var image = new Image();

		console.log(LOAD.images);

		image.onload = function() {
			var current_image = LOAD.images.shift();
			if (current_image) {
				this.src = current_image;
			}
		};
		image.onerror = function() {
			//console.log("err");
		};
		image.src = LOAD.images.shift();
	},
	image_array_generator: function(arr) {

		for (i = 0; i < arr.length; i++) {
			for (j = 0; j < arr[i].image_num; j++) {
				LOAD.images.push(arr[i].directory + "Cell_" + j + ".jpg");
			}
		}
	}
}