import excel = require("exceljs");
import { browser } from "protractor";
const filePath = browser.configData.excelFilePath; //"./src/data/"

export class ExcelReaderUtil {
    
    public static async readFile(fileName:string, sheetName:string, testCaseName:string) {
        const workbook = (await new excel.Workbook().xlsx).readFile(filePath+fileName);
        let sheet = (await workbook).getWorksheet(sheetName);
        //console.log("Row Count: "+sheet.actualRowCount);
        let cellValue:string;
        let dataMap = {};
        for(let i=2; i<= sheet.actualRowCount; i++) {
            cellValue = sheet.getRow(i).getCell(1).toString().trim();
            //console.log(cellValue);
            if(cellValue.localeCompare(testCaseName)==0) {
                //console.log("Found at ROW: "+i);
                for(let j=1; j<=sheet.actualColumnCount; j++){
                    dataMap[sheet.getRow(1).getCell(j).toString().trim()]
                    = sheet.getRow(i).getCell(j).toString().trim();
                }
                return dataMap;
            }
        }        
    }
}
