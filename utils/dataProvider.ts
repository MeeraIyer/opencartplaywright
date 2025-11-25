import fs from 'fs';
import {parse} from 'csv-parse/sync';

export class dataProvider{

    static getTestDatafromJson(filepath:string):any
    {
        let data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        return data;
    }

    static getTestDatafromCsv(filepath:string):any
    {
        let data = parse(fs.readFileSync(filepath), {columns:true, skip_empty_lines:true});
        return data;
    }


}