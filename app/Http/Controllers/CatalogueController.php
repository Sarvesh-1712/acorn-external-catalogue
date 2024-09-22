<?php

namespace App\Http\Controllers;

use \App\Models\request\FetchContentRequest;
use GuzzleHttp\Client;

use App\Enums\ContentType;
use App\Models\Content\Course;
use App\Models\Content\LiveLearning;
use App\Models\Content\Program;

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

            if ($data['status'] == 'Complete') {
                $contents = [];

                foreach($data['data']['items'] as $content) {
                    if ($content['contenttype'] == ContentType::COURSE->value) {
                        $contents[] = (new Course($content['contentid'], $content['fullname'], $content['imageurl'], $content['summary'], $content['duration']))->toArray();
                    } else if($content['contenttype'] == ContentType::LIVE_LEARNING->value) {
                        $contents[] = (new LiveLearning($content['contentid'], $content['fullname'], $content['imageurl'], $content['summary']))->toArray();
                    } else if($content['contenttype'] == ContentType::PROGRAM->value) {
                        $contents[] = (new Program($content['contentid'], $content['fullname'], $content['imageurl'], $content['summary']))->toArray();
                    } 
                }
                return  response()->json($contents);
            } else {
                return response()->json(['error' => 'Encountered issues while fetching data. Status is not complete.'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to fetch data: ' . $e->getMessage()], 500);
        }
    }
}
