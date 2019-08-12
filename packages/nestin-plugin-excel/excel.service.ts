import * as Excel from 'exceljs/dist/exceljs.min.js'; // 由于exceljs 1.9.0的bug，所以使用临时替代方案
import * as fs from 'fs';

import { AppException } from 'nestin-common/exception/app.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcelService {
  async read(path, worksheetName) {
    // read from a file
    const workbook = new Excel.Workbook();
    return workbook.xlsx.readFile(path).then(
      data => {
        const worksheet = data.getWorksheet(worksheetName);
        const values = worksheet.getSheetValues();
        return values;
      },
      () => {
        throw new AppException('表格读取未成功', { code: 10000 });
      },
    );
  }
  async write(path, worksheetName, columns, rows) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(worksheetName);
    worksheet.columns = columns;
    worksheet.addRows(rows);
    return workbook.xlsx.writeFile(path).then(() => {
      return {
        path,
      };
    });
  }

  async saveAndRead(buffer, path, worksheetName) {
    // 写入文件并获取表格信息
    try {
      fs.writeFileSync(path, buffer);
    } catch (err) {
      throw new AppException(
        {
          err,
          msg: '表格保存失败',
        },
        { code: 10103 },
      );
    }
    return this.read(path, worksheetName);
  }
}
