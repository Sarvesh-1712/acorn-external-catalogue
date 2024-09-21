<?php

namespace App\Models\Content;

use App\Enums\ContentType;

class LiveLearning extends Content
{
    public function getContentType() {
        return ContentType::LIVE_LEARNING->value;
    }
}
