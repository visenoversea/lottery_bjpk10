<?php
//

namespace service;
use Mobile_Detect;

class MobileDetectService extends Mobile_Detect
{
    private static $instance;

    /**
     * 不能被克隆
     */
    final protected function __clone(){}

    /**
     * @return MobileDetectService
     */
    public static function getInstance(): MobileDetectService
    {
        return static::$instance ?? static::$instance = new static();
    }

    /**
     * 获取平台信息
     */
    public function getPlatform(): string
    {
        if (!$this->isMobile()) {
            return 'PC';
        }
        if ($this->isiPhone()) {
            return 'iPhone';
        }
        if ($this->isAndroidOS()) {
            return 'Android';
        }
        if ($this->isTablet()) {
            if ($this->isiPad()) {
                return 'iPad';
            } else {
                return 'Tablet';
            }
        }
        return 'Other';
    }

}