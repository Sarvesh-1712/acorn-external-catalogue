<?php

use Inertia\Inertia;
use App\Http\Controllers\CatalogueController;

Route::get('/', function () {
    return view('app');
});

Route::get('/contents', [CatalogueController::class, 'getContents']);

// Catch-all route for React Router
Route::get('/catalogue', function () {
    return view('app'); // Return the main Blade file
})->where('any', '.*');


