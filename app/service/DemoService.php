<?php
//

namespace service;

class DemoService
{
    private static $instance;

    /**
     * 不能被克隆
     */
    final protected function __clone(){}

    /**
     * 构造函数
     * Model constructor.
     */
    final protected function __construct(){}

    /**
     * @return DemoService
     */
    public static function getInstance(): DemoService
    {
        return static::$instance ?? static::$instance = new static();
    }

}