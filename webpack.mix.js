const mix = require('laravel-mix');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

mix.ts('resources/ts/app.tsx', 'public/js')
    .css('resources/css/app.css', 'public/css')
    .react()
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