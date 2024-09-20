<?php

use Inertia\Inertia;
use App\Http\Controllers\CatalogueController;

Route::get('/', function () {
    return Inertia::render('AcornHome');
});

Route::get('/external-catalogue', [CatalogueController::class, 'getContents']);
