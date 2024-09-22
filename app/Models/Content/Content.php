<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

abstract class Content 
{
    protected $fullname; 
    protected $imageurl;
    protected $summary;
    protected $contentid;
    protected $contenttype;
    protected $badgecolor;

    public function __construct($contentid, $fullname, $imageurl, $summary) {
        $this->contentid = $contentid;
        $this->fullname = $fullname;
        $this->summary = $summary;
        $this->imageurl = $imageurl;
        $this->contenttype = $this->getContentType();
        $this->badgecolor = $this->getBadgeColor();
    }

    public function getFullname() {
        return $this->fullname;
    }

    public function getSummary() {
        return $this->summary;
    }

    public function getImageurl() {
        return $this->imageurl;
    }

    public function getContentId() {
        return $this->contentid;
    }

    abstract function getContentType();

    abstract function getBadgeColor();

    public function toArray(): array {
        return array(
            "fullname" => $this->getFullname(),
            "summary" => $this->getSummary(),
            "imageurl" => $this->getImageurl(),
            "contentid" => $this->getContentId(),
            "contenttype" => $this->getContentType(),
            "badgecolor" => $this->getBadgeColor(),
        );
    }
}