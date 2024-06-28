<?php
//基础类

namespace main\classes;

use service\GlobalService;

class base
{
    protected $GlobalService;

    public function __construct()
    {
        $this->GlobalService = GlobalService::getInstance();
    }

}