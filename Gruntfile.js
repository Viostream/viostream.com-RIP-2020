'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        'assets/js/plugins/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        }
      }
    },
//    sass: {
//    	dist: {
//    		files:{
//    			'assets/css/style.min.css' :[
//    				'assets/css/*.css',
//    				'!assets/css/style.min.css'
//    			]
//    		}
//    	}
//    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images/'
        }]
      }
    },
    cssmin: {
      target: {
        files: {
          'assets/css/style.min.css':[
          	'assets/css/*.css',
          	'assets/css/*/*.css',
          	'!assets/css/style.min.css'
          ]
        }
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.svg',
          dest: 'images/'
        }]
      }
    },
    watch: {
      scripts: {
        files: [
          '<%= jshint.all %>',
          'assets/css/vendor/*.css'
        ],
        tasks: ['uglify', 'cssmin']
      },
      
    },
    clean: {
      dist: [
        'assets/js/scripts.min.js'
      ]
    }
  });

  // Load tasks
//  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'uglify',
    'imagemin',
    'svgmin',
    'cssmin'
//    'sass'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};