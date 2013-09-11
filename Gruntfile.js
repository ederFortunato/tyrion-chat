module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("tyrion-chat.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/client/js/*.js"],
				dest: "dist/client/js/jquery.tyrion-chat.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/client/js/*.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/client/js/jquery.tyrion-chat.js"],
				dest: "dist/client/js/jquery.tyrion-chat.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		less: {
			production: {
				options: {
					paths: ["src/client/less/"],
					yuicompress: true
				},
				files: {
					"dist/client/css/jquery.tyrion-chat.min.css": "src/client/less/jquery.tyrion-chat.less"
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			files: "src/client/less/*",
			tasks: ["less"]
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["jshint", "concat", "uglify", "less"]);

};
