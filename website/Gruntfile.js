module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower_concat: {
      dist: {
        dest: 'static/js/vendor.js',
        cssDest: 'static/css/vendor.css',
        mainFiles: {
          'map-icons': [
            'dist/js/map-icons.min.js',
            'dist/css/map-icons.css',
          ],
        },
      },
    },

    bowercopy: {
      options: {
        runBower: false,
        report: false,
      },
      dist: {
        options: {
          destPrefix: 'static',
        },
        files: {
          'fonts': 'map-icons/dist/fonts/*'
        },
      },
    },
  });

  grunt.registerTask('dist', ['bower_concat', 'bowercopy']);
  grunt.registerTask('default', ['dist']);
};
