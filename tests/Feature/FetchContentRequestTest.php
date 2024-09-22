<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use App\Models\Request\FetchContentRequest;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;
use Mockery;
use App\Models\Content\Course;
use App\Models\Content\Program;
use App\Models\Content\LiveLearning;

class FetchContentRequestTest extends TestCase
{
    public function test_when_request_mocked_with_empty_response(): void
    {
        $mockClient = Mockery::mock(Client::class);

        $expectedResponse = ['data' => []];

        $mockResponse = new Response(200, [], json_encode($expectedResponse));

        $mockClient->shouldReceive('request')
            ->once()
            ->with('GET', 'http://testing.com', ['headers' => []])
            ->andReturn($mockResponse);

        $this->client = $mockClient;
        $response = $this->client->request('GET', 'http://testing.com', [
            'headers' => [],
        ]);

        Mockery::close();
        $this->assertEquals($expectedResponse, json_decode($response->getBody(), true), "Responses does not match");
    }

    public function test_when_request_mocked_with_content_response(): void
    {
        $mockClient = Mockery::mock(Client::class);

        $expectedResponse = [
            (new Course('111', 'fullname1', 'http://image3.com', 'summary1', '1:30h'))->toArray(),
            (new Program('112', 'fullname2', 'http://image2.com', 'summary2'))->toArray(),
            (new LiveLearning('113', 'fullname3', 'http://image1.com', 'summary3'))->toArray(),
        ];

        $mockResponse = new Response(200, [], json_encode($expectedResponse));

        $mockClient->shouldReceive('request')
            ->once()
            ->with('GET', 'http://testing.com', ['headers' => []])
            ->andReturn($mockResponse);

        $this->client = $mockClient;
        $response = $this->client->request('GET', 'http://testing.com', [
            'headers' => [],
        ]);

        Mockery::close();
        $this->assertEquals($expectedResponse, json_decode($response->getBody(), true), "Responses does not match");
    }
}
