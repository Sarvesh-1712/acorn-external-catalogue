<?php

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('AcornHome');
});

Route::get('/external-catalogue', function () {
    return Inertia::render('ExternalCatalogue');
});