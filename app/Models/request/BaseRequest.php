<?php

namespace App\Models\request;

use App\Enums\RequestType;

abstract class BaseRequest 
{
    abstract public function getUrl(): string;

    abstract public function getType() : RequestType;

    abstract public function getHeaders(): array;
}
