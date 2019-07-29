import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Semaine} from '../Entity/semaine.entity';
import {Astreinte} from '../Entity/astreinte.entity';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const API_URL = 'http://localhost:8000';

@Injectable({
    providedIn: 'root'
})
export class AccueilService {

    constructor(private http: HttpClient) {
    }

    getSemaines(): Observable<Semaine[]> {
        return this.http.get<Semaine[]>(API_URL + '/accueil/semaines');
    }

    getAstreintes(idSemaine, idVivier ): Observable<Astreinte[]> {
        return  this.http.get<Astreinte[]>(API_URL + '/accueil/astreinte/' + idSemaine + '/' + idVivier );
    }
    getURL(url) {
        return this.http.get(API_URL + url);
    }
    export(url){
        return this.http.get(API_URL + url);
    }
    public exportAsExcelFile( json: any[], excelFileName: string): void {
       if (json != null) {
           const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
           const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
           const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
           this.saveAsExcelFile(excelBuffer, excelFileName);
       }
    }
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
    }




    addAstreinte(json) {
        return this.http.post(API_URL + '/api/astreintes', json);
    }


}
