<?php

namespace Tests\Unit;

use App\Models\Content\Course;
use App\Models\Content\Program;
use App\Models\Content\LiveLearning;

use PHPUnit\Framework\TestCase;

class ContentTest extends TestCase
{
    public function test_course_content(): void
    {
        $contentid = '111';
        $fullname = 'fullname1';
        $image = 'http://image3.com';
        $summary = 'summary1';
        $duration = '1:30h';

        $course =  new Course($contentid, $fullname, $image, $summary, $duration);
        $this->assertEquals($contentid, $course->getContentId(), "Id does not match correctly");
        $this->assertEquals($fullname, $course->getFullName(), "Full name does not match correctly");
        $this->assertEquals($image, $course->getImageUrl(), "Image url does not match correctly");
        $this->assertEquals($summary, $course->getSummary(), "Summary does not match correctly");
        $this->assertEquals($duration, $course->getDuration(), "Duration does not match correctly");
        $this->assertEquals('Course', $course->getContentType(), "Course type does not match correctly");
        $this->assertEquals('#ffccbc', $course->getBadgeColor(), "Badge color does not match correctly");
    }

    public function test_program_content(): void
    {
        $contentid = '111';
        $fullname = 'fullname1';
        $image = 'http://image3.com';
        $summary = 'summary1';
        $program =  new Program($contentid, $fullname, $image, $summary);
        $this->assertEquals($contentid, $program->getContentId(), "Id does not match correctly");
        $this->assertEquals($fullname, $program->getFullName(), "Full name does not match correctly");
        $this->assertEquals($image, $program->getImageUrl(), "Image url does not match correctly");
        $this->assertEquals($summary, $program->getSummary(), "Summary does not match correctly");
        $this->assertEquals('Program', $program->getContentType(), "Program type does not match correctly");
        $this->assertEquals('#c8e6c9', $program->getBadgeColor(), "Badge color does not match correctly");
    }

    public function test_live_learning(): void
    {
        $contentid = '111';
        $fullname = 'fullname1';
        $image = 'http://image3.com';
        $summary = 'summary1';
        $liveLearning =  new LiveLearning($contentid, $fullname, $image, $summary);
        $this->assertEquals($contentid, $liveLearning->getContentId(), "Id does not match correctly");
        $this->assertEquals($fullname, $liveLearning->getFullName(), "Full name does not match correctly");
        $this->assertEquals($image, $liveLearning->getImageUrl(), "Image url does not match correctly");
        $this->assertEquals($summary, $liveLearning->getSummary(), "Summary does not match correctly");
        $this->assertEquals('Live Learning', $liveLearning->getContentType(), "Live Learning type does not match correctly");
        $this->assertEquals('#bbdefb', $liveLearning->getBadgeColor(), "Badge color does not match correctly");
    }
}
