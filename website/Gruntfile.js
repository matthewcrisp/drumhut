/*
 * Generated on 2015-05-20
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');

// Load local build configuration without overwriting values supplied by CI.
var envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, 'utf8').split(/\r?\n/).forEach(function (line) {
    var match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || typeof process.env[match[1]] !== 'undefined') {
      return;
    }

    var value = match[2].replace(/^['"]|['"]$/g, '');
    if (value && value.charAt(0) !== '#') {
      process.env[match[1]] = value;
    }
  });
}

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml,json}'],
        tasks: ['assemble']
      },
      copy: {
        files: ['<%= config.src %>/assets/**/*'],
        tasks: ['copy:assets']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 8000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: {
			  target: 'http://localhost:8000'
		  },
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: 'default.hbs',
          layoutdir: '<%= config.src %>/templates/layouts/',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          helpers: '<%= config.src %>/helpers/*.js'
      },
      pages: {
        files: {
            '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      },
      djembes: {
        options: {
          layout: 'product-djembe.hbs',
          pages: grunt.file.readJSON('src/data/djembes.json')
        },
        files: {
            '<%= config.dist %>/': ['<%= config.src %>/templates/pages/dummy.hbs']
        }
      },
      dununs: {
        options: {
          layout: 'product-dunun.hbs',
          pages: grunt.file.readJSON('src/data/dunun.json')
        },
        files: {
            '<%= config.dist %>/': ['<%= config.src %>/templates/pages/dummy.hbs']
        }
      },
      accessories: {
        options: {
          layout: 'product-accessory.hbs',
          pages: grunt.file.readJSON('src/data/accessories.json')
        },
        files: {
            '<%= config.dist %>/': ['<%= config.src %>/templates/pages/dummy.hbs']
        }
      }
    },

    copy: {
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: 'jquery.min.js',
        dest: '<%= config.dist %>/assets/js/'
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: '**',
        dest: '<%= config.dist %>/assets/'
      },
      assets: {
        expand: true,
        cwd: 'src/assets/',
        src: '**/*',
        dest: '<%= config.dist %>/assets/'
      },
      cname: {
        expand: true,
        cwd: 'src/',
        src: '_CNAME',
        dest: '<%= config.dist %>/',
        rename: function (dest, src) {
          return dest + src.replace('_', '');
        }
      }
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'https://github.com/matthewcrisp/drumhut.git',
          branch: 'gh-pages'
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: [
      '!<%= config.dist %>/.git*',
      '<%= config.dist %>/**/*'
    ]


  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'buildcontrol:pages'
  ]);

};
