'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        src: 'src/**/*.js',
                        dest: 'dist/'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        src: 'src/**/*.html',
                        dest: 'dist/'
                    }
                ]
            }
        },
        clean: {
            js: {
                files: [
                    {
                        expand: true,
                        src: 'dist/**/*.js'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        src: 'dist/**/*.html'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', [
        'clean',
        'copy'
    ]);
}