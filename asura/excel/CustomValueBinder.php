<?php

namespace asura\excel;

use \PhpOffice\PhpSpreadsheet\Cell\{DefaultValueBinder, DataType};
use PhpOffice\PhpSpreadsheet\RichText\RichText;

class CustomValueBinder extends DefaultValueBinder
{
    public static function dataTypeForValue($pValue): string
    {
//        //只重写dataTypeForValue方法，去掉一些不必要的判断
//        if (is_null($pValue)) {
//            return DataType::TYPE_NULL;
//        } elseif ($pValue instanceof RichText) {
//            return DataType::TYPE_INLINE;
//        } elseif ($pValue[0] === '=' && strlen($pValue) > 1) {
//            return DataType::TYPE_FORMULA;
//        } elseif (is_bool($pValue)) {
//            return DataType::TYPE_BOOL;
//        } elseif (is_float($pValue) || is_int($pValue)) {
//            return DataType::TYPE_NUMERIC;
//        }
//        return DataType::TYPE_STRING;
        // Match the value against a few data types
        if ($pValue === null) {
            return DataType::TYPE_NULL;
        } elseif (is_float($pValue) || is_int($pValue)) {
            return DataType::TYPE_NUMERIC;
        } elseif (is_bool($pValue)) {
            return DataType::TYPE_BOOL;
        } elseif ($pValue === '') {
            return DataType::TYPE_STRING;
        } elseif ($pValue instanceof RichText) {
            return DataType::TYPE_INLINE;
        } elseif (is_string($pValue) && $pValue[0] === '=' && strlen($pValue) > 1) {
            return DataType::TYPE_FORMULA;
        } elseif (is_string($pValue)) {
            $errorCodes = DataType::getErrorCodes();
            if (isset($errorCodes[$pValue])) {
                return DataType::TYPE_ERROR;
            }
        }
        return DataType::TYPE_STRING;
    }
}