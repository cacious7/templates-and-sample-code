const mix = require('laravel-mix');

mix.react('resources/react/main.js', 'Webcontent/js')
   .sass('resources/sass/app.scss', 'Webcontent/css');