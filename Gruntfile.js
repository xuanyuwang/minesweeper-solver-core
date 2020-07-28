module.exports = function(grunt){
    'use strict';
    grunt.initConfig({
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        src: 'src/**/*.js',
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        src: 'src/**/*.html',
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        src: 'test/**',
                        dest: 'dist/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', [
        'copy'
    ]);
}