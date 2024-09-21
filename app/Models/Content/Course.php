<?php

namespace App\Models\Content;

use App\Enums\ContentType;

class Course extends Content
{
    protected $duration;

    public function __construct($contentid, $fullname, $imageurl, $summary, $duration) {
        parent::__construct($contentid, $fullname, $imageurl, $summary);
        $this->duration = $duration;
    }

    public function getContentType() {
        return ContentType::COURSE->value;
    }

    public function getDuration() {
        return $this->duration;
    }

    public function toArray(): array {
        return array_merge(parent::toArray(), [
            'duration' => $this->getDuration(),
        ]);
    }
}