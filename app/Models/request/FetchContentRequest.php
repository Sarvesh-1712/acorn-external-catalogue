<?php

namespace App\Models\request;

use App\Enums\RequestContentType;
use App\Enums\RequestType;

use Exception;

class FetchContentRequest extends BaseRequest {

    public function getUrl(): string {
        $baseUrl = env('SERVER_BASE_URL');
        $tenancyId = env('TENANCY_ID');
        if ($baseUrl && $tenancyId) {
            return $baseUrl.'/local/acorn_coursemanagement/index.php/api/1.1/external_catalogue/'.$tenancyId.'?perPage=16';
        }
        throw new Exception('ENV error. Server url or tenancy id not found.');
    }

    public function getType(): RequestType {
        return RequestType::GET;
    }

    public function getHeaders(): array {
        $token = env('SERVER_AUTHORISATION_TOKEN');
        $contentType = RequestContentType::APPLICATION_JSON->value;

        if ($token) {
            return array(
                'Accept' => $contentType,
                'Authorization' => 'Bearer '.$token,
                'Content-Type' => $contentType,
            );
        }
        throw new Exception('ENV error. Server bearer token not found.');
    }
}
