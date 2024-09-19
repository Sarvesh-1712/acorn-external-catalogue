const mix = require('laravel-mix');

mix.ts('resources/ts/app.tsx', 'public/js')
    .css('resources/css/app.css', 'public/css')
    .react()
    .sourceMaps()
    .version();