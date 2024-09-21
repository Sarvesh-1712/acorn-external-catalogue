<?php

namespace App\Enums;

enum ContentType: string
{
    case COURSE = 'Course';
    case LIVE_LEARNING = 'Live Learning';
    case PROGRAM = 'Program';
}