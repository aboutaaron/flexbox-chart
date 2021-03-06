// Generated on 2014-01-29 using generator-newsapp 0.2.14
'use strict';

module.exports = function (grunt) {

  // configurable paths
  var yeoman = {
    app: 'app',
    dist: 'dist'
  };

  // load all grunt tasks from package.json
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    yeoman: yeoman,
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      css: {
        
        files: ['app/styles/scss/*.scss'],
        tasks: ['sass', 'autoprefixer'],
      },
      src: {
        
        files: ['app/*.html', 'app/scripts/*.js', 'app/scripts/**/*.js', 'Gruntfile.js'],
      }
    }, // watch

    // grunt server
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          open: true,
          base: 'app',
          livereload: 35729
        }
      }
    },
    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
            '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    // svgmin: {
    //     dist: {
    //         files: [{
    //             expand: true,
    //             cwd: '<%= yeoman.app %>/images',
    //             src: '{,*/}*.svg',
    //             dest: '<%= yeoman.dist %>/images'
    //         }]
    //     }
    // },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '{,*/}*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'bower_components/font-awesome/fonts/*.*',
            'styles/fonts/{,*/}*.*',
            'bower_components/' + 'sass-' + 'bootstrap/' + 'fonts/' +'*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    inject: {
      single: {
        scriptSrc: 'workflow.js',
        files: 'app/index.html'
      }
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      }
    },

    sass: { // Task
      dist: { // Target
        files: { // Dictionary of files
          // 'dest': 'source'
          
          'app/styles/main.css': 'app/styles/scss/main.scss'
        }
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // files to concatenate
      }
    },
    'bower-install': {
      target: {
        src: ['app/index.html'],
        ignorePath: ['app'],
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    shell: {
      ghPages: {
        command: 'git subtree push --prefix dist origin gh-pages',
        options: {
          stdout: true
        }
      }
    },
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'app/scripts/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          Handlebars: true,
          L: true,
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'sass', 
    'watch'
  ]);


  grunt.registerTask('serve', [
    'inject',
    'bower-install',
    'sass',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    //'concurrent:dist',
    'autoprefixer',
    'cssmin',
    'concat',
    'uglify',
    'copy',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('deploy', [
    'shell:ghPages'
  ]);

}
