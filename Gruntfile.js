module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'http/assets/scss',
					src: ['main.scss'],
					dest: 'http/assets/css',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			combine: {
				files: {
					'http/assets/css/main.min.css': [
						"http/assets/css/normalize.min.css",
						"http/assets/css/main.css",
					]
					// 'application/static/css/style.css': ['application/static/css/normalize.min.css', 'application/static/css/jquery.nouislider.css', 'application/static/css/slick.css', 'application/static/css/simple-style.css'],
					// 'application/static/css/tablet.min.css': 'application/static/css/tablet.css',
					// 'application/static/css/mobile.min.css': 'application/static/css/mobile.css'
				}
			}
		},
		uglify: {
			js: {
				files: {
					'http/assets/main.min.js': [
						'http/assets/js/lib/jquery-1.9.0.js',
						'http/assets/js/lib/screenfull.min.js',
						'http/assets/js/lib/js.cookie.js',
						'http/assets/js/*.js',
					]
				}
			}
		},
		nodemon: {
			script: 'main.js',
			options: {
				ignore: ['http/**']
			}
		},
		responsive_images: {
			options: {
				engine: 'gm',
				newFilesOnly: true,
				sizes: [{
					//name: 'small',
					width: 640
				}],
			},
			target: {
				files: [{
					expand: true,
					src: ['*/*/**.{jpg,gif,png}'],
					cwd: 'http/img_origin/img/',
					dest: 'http/assets/img/'
				}]
			}
		},
		watch: {
			css: {
				files: ['**/*.scss'],
				tasks: ['sass', 'cssmin']
			},

			// node: {
			// 	files: ['main.js', 'server/*.js'],
			// 	tasks: ['nodemon']
			// }
			js: {
				files: 'http/assets/js/*.js',
				tasks: ['uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('node', ['nodemon'])
	grunt.registerTask('img', ['responsive_images'])
};