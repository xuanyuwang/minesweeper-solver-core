module.exports = function(grunt){
    'use strict';
    grunt.initConfig({
        ts: {
            default: {
                tsconfig: './tsconfig.json'
            }
        },
        copy: {
            html: {
                expand: true,
                cwd: '.',
                src: './src/**/*.html',
                dest: 'dist'
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', [
        'ts',
        'copy'
    ]);
}