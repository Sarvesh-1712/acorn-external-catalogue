<?php

namespace App\Http\Controllers;

use \App\Models\request\FetchContentRequest;
use GuzzleHttp\Client;
use Inertia\Inertia;

use Exception;

class CatalogueController extends Controller {

    protected $client; 

    public function __construct() {
        $this->client = new Client();
    }

    public function getContents() {
        try {
            $fetchContentRequest = new FetchContentRequest();

            // run the request
            $response = $this->client->request($fetchContentRequest->getType()->value, $fetchContentRequest->getUrl(), [
                'headers' => $fetchContentRequest->getHeaders(),
            ]);
            $data = json_decode($response->getBody(), true);

            return  Inertia::render('ExternalCatalogue', [
                'contents' => $data,
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to fetch data: ' . $e->getMessage()], 500);
        }
    }
}
