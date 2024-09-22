<?php

namespace App\Models\Content;

use App\Enums\ContentType;

class Program extends Content
{
    public function getContentType() {
        return ContentType::PROGRAM->value;
    }

    public function getBadgeColor() {
        return '#c8e6c9';
    }
}

