/* The one-size-fits-all key to Grunt.js happiness - http://bit.ly/grunt-happy */

/*global module:false*/
module.exports = function(grunt) {

    'use strict';

    var config, dependency;

    config = {
        pkg: grunt.file.readJSON('package.json'),
        build: ['build'],
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },
        jshint: {
            files: ['test/**/*.js'],
            options: {
                "boss": true, // true: Tolerate assignments where comparisons would be expected
                "curly": true, // true: Require {} for every new block or scope
                "eqeqeq": true, // true: Require triple equals (===) for comparison
                "eqnull": true, // true: Tolerate use of `== null`
                "immed": true, // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
                "latedef": true, // true: Require variables/functions to be defined before being used
                "newcap": true, // true: Require capitalization of all constructor functions e.g. `new F()`
                "noarg": true, // true: Prohibit use of `arguments.caller` and `arguments.callee`
                "sub": true, // true: Tolerate using `[]` notation when it can still be expressed in dot notation
                "undef": true, // true: Require all non-global variables to be declared (prevents global leaks)
                "unused": true,
                "node": true, // Node.js
                "-W117": true, // true: Ignore `not defined` errors as an example of using a rule (W117) by code.
                reporterOutput: ""
            }



        },

        clean: {
            build: ['build']
        },
        uglify: {
            build: {
                files: {
                    'build/main.min.js': ['src/**/*.js']
                }
            }
        },
        htmlmin: { // Task
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            compile: {
                files: {
                    'build/index.html': 'src/index.html'
                }
            }
        },
        copy: {
            src: {
                files: [{
                    cwd: 'src/',
                    src: '**/*.html',
                    expand: true,
                    dest: 'build'
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/',
                    ext: '.min.css'
                }]
            }
        },
        sass: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/css/sass',
                    src: ['**/*.scss'],
                    dest: 'src/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            examples: {
                files: ['src/**/*'],
                tasks: 'build'
            },
            sass: {
                files: ['src/css/**/*.scss'],
                tasks: 'sass'
            }
        }


    };

    // Initialise grunt
    grunt.initConfig(config);

    // Load development dependencies specified in package.json
    for (dependency in config.pkg.devDependencies) {
        if (/^grunt-/.test(dependency)) {
            grunt.loadNpmTasks(dependency);
        }
    }

    // Load tasks from the `grunt-tasks/` folder
    grunt.registerTask('build', [
        'clean:build',
        'uglify',
        'htmlmin',
        'copy',
        'sass',
        'cssmin'
    ]);
    grunt.registerTask('default', ['jshint', 'build']);

};
