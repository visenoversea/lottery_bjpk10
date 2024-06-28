<?php
/**
 * Excel操作类库
 */

namespace asura\excel;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Exception;

class Excel
{

    /**
     * 读取文件数据
     * @param string $filename
     * @param null $row                     读取行数(默认自动获取)
     * @param null $col                     读取最高列表(默认自动获取)
     * @param string $start
     * @param null $activeSheetIndex        读取活动表(获取默认表)
     * @return array
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     * @throws \PhpOffice\PhpSpreadsheet\Reader\Exception
     */
    public static function readFileData(string $filename, $row = null, $col = null, string $start = 'A2', $activeSheetIndex = null): array
    {
        //设置文件格式
        $reader = IOFactory::createReaderForFile($filename);
        //设置只读
        $reader->setReadDataOnly(true);
        //读取表
        $Excel = $reader->load($filename);
        if (is_null($activeSheetIndex)) {
            $spreadsheet = $Excel->getActiveSheet();
        } else {
            $spreadsheet = $Excel->setActiveSheetIndex($activeSheetIndex);
        }
        $maxRow = $spreadsheet->getHighestRow();
        $row = $row ?? $maxRow;
        if (is_null($row)) {
            //最高行数
            $row = $maxRow;
        } else {
            if ($row > $maxRow) {
                //读取限制
                $row = $maxRow;
            }
        }
        $maxCol = $spreadsheet->getHighestColumn();
        if (is_null($col)) {
            //最高列
            $col = $maxCol;
        } else {
            if (is_numeric($col)) {
                //是数字转成字母
                $col = Coordinate::stringFromColumnIndex($col);
            }
        }
        return $spreadsheet->rangeToArray("{$start}:{$col}{$row}");
    }

    /**
     * 导出数据
     * @param array $title         ['id'=>'id', 'name'=>'姓名', 'age'=>'年龄']
     */
    public static function exportData(array $title, $data, $fileName, $opt=['ColumnWidth'=>20,'RowHeight'=>15], $fileType = 'xlsx'): array
    {
        //判断值是数字还是字符串显示
        Cell::setValueBinder(new CustomValueBinder());
        $spreadsheet = new Spreadsheet();
        $worksheet = $spreadsheet->getActiveSheet();
        //设置工作表标题名称
//        $worksheet->setTitle('工作表格1');
        //设置默认值
        if($opt){
            if(isset($opt['ColumnWidth'])){
                //默认列宽
                $worksheet->getDefaultColumnDimension()->setWidth($opt['ColumnWidth']);
            }
            if(isset($opt['RowHeight'])){
                //默认行高
                $worksheet->getDefaultRowDimension()->setRowHeight($opt['RowHeight']);
            }
        }
        //表头
        $columnIndex = 0;
        foreach ($title as $k => $v) {
            $columnIndex++;
            //数字转字母
            $column = Coordinate::stringFromColumnIndex($columnIndex);
            if (is_array($v)) {
                //有列的设置  用于扩展
                $column_name = $v['name'];
                //设置成文本格式
                //$worksheet->getStyle($column)->getNumberFormat()->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);
                if(isset($v['ColumnWidth'])){
                    //设置列宽
                    $spreadsheet->getActiveSheet()->getColumnDimension($column)->setWidth($v['ColumnWidth']);
                }
                if(isset($v['RowHeight'])){
                    //设置行高
                    $spreadsheet->getActiveSheet()->getRowDimension('1')->setRowHeight($v['RowHeight']);
                }
            } else {
                $column_name = $v;
            }
            //设置值
            $worksheet->setCellValue($column . '1', $column_name);
            //保存key=>val关系
            $title[$k] = $column;
        }
        //从第二行开始
        $row = 2;
        foreach ($data as $item) {
            foreach ($title as $k => $column) {
                if (isset($item[$k])) {
                    $worksheet->setCellValue($column . $row,$item[$k]);
                }
            }
            $row++;
        }
        //1.下载到服务器
        $filePath = DS . 'upload' . DS . date('Ymd', SYS_TIME) . DS . $fileName . '.' . $fileType;
        $saveFile = INDEX_PATH . $filePath;
        if (!is_file($saveFile)) {
            $path = dirname($saveFile);
            if (!is_dir($path) && !mkdir($path, 0755, true)) {
                return ['code' => -2, 'msg' => '目录没有写入权限'];
            }
        }
        try{
            $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
            $writer->save($saveFile);
            return ['code' => 1, 'msg' => '导出成功', 'filePath' => $filePath];
        } catch (Exception $e) {
            return ['code' => -2, 'msg' => '导出异常'];
        }
//        //2.输出到浏览器
//        $writer = IOFactory::createWriter($spreadsheet, $fileType); //按照指定格式生成Excel文件
//        self::excelBrowserExport($fileName, $fileType);
//        $writer->save('php://output');
//        exit;
    }

    /**
     * 输出到浏览器(需要设置header头)
     * @param string $fileName 文件名
     * @param string $fileType 文件类型
     */
    private static function excelBrowserExport(string $fileName, string $fileType)
    {
        //文件名称校验
        if (!$fileName) {
            trigger_error('文件名不能为空', E_USER_ERROR);
        }
        //Excel文件类型校验
        $type = ['Excel2007', 'Xlsx', 'Excel5', 'xls'];
        if (!in_array($fileType, $type)) {
            trigger_error('未知文件类型', E_USER_ERROR);
        }
        if ($fileType == 'Excel2007' || $fileType == 'Xlsx') {
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="' . $fileName . '.xlsx"');
            header('Cache-Control: max-age=0');
        } else {
            //Excel5
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="' . $fileName . '.xls"');
            header('Cache-Control: max-age=0');
        }
    }

}