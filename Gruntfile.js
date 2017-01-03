module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    // 'src/assets/stylesheets/dist.css': ['src/assets/stylesheets/layout.css',
                    //     'src/assets/stylesheets/screen.css']
                }
            }
        },
        sass: {
            options: {
                sourcemap: 'none'
            },
            dist: {
                files: {
                    // 'web-app/app/css/allant.min.css': ['web-app/app/css/stylesheets/main.scss']  // to add sass files
                }
            }
        },
        watch: {
            css: {
                files: ['src/assets/stylesheets/**/*.css']
                //tasks: ['sass', 'cssmin']
            }
        },
        shell: {
            options: {
                stdout: true
            },
            install: {
                command: "./node_modules/.bin/bower update --force --quiet --offline"
            },

            webInstall: {
                command: "./node_modules/.bin/bower update --quiet"
            },
            commitId: {
                // this task is not being used
                command: 'git log --format="%H" -n 1',
                options: {
                    callback: function log(err, stdout, stderr, cb) {
                        grunt.config.set('version', stdout.replace('\n', ''));
                        var version = grunt.config.get("version");
                        grunt.file.write('web-app/app/appInfo.json', "{" + //todo : change this path later.
                            "\"version\":\"" + version + "\"" +
                            "}");
                        cb();
                    }
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true, flatten: true, src: ['bower_components/jquery/dist/jquery.min.js',
                        'bower_components/babel/browser.min.js',
                        'bower_components/bootstrap/dist/js/bootstrap.min.js',
                        'bower_components/jquery-ui/jquery-ui.min.js',
                        'bower_components/marked/marked.min.js',
                        'bower_components/react/react.min.js',
                        'bower_components/react/react-dom.min.js',
                        'bower_components/spin.js/spin.js',
                        'bower_components/d3/d3.js'

                    ]
                        , dest: 'src/assets/javascripts/vendors/'
                    }


                ]
            },
            css: {
                files: [
                    {
                        expand: true, flatten: true, src: [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/bootstrap/dist/css/bootstrap.css.map',
                        'bower_components/font-awesome/css/font-awesome.css',
                        'bower_components/jquery-ui/themes/base/jquery-ui.css',
                        'bower_components/jquery-selectric/public/selectric.css'
                    ]
                        , dest: 'src/assets/stylesheets/vendors/'
                    }
                ]
            }
        }

    });

    grunt.registerTask('copy-all', ['copy:main', 'copy:css']);
    grunt.registerTask("install", ["shell:install"]);
    grunt.registerTask("webInstall", ["shell:webInstall"]);
    grunt.registerTask("default", ["install", "copy-all"]);

};