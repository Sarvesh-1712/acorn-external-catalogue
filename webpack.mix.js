const mix = require('laravel-mix');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

mix.ts('resources/ts/app.tsx', 'public/js')
    .react()
    .css('resources/css/app.css', 'public/css')
    .copy('resources/assets', 'public/images')
    .sourceMaps();
    /*.webpackConfig({
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: 'bundle-report.html',
                openAnalyzer: false,
            }),
        ],
    });*/