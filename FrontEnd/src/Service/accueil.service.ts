import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Semaine} from '../Entity/semaine.entity';
import {Astreinte} from '../Entity/astreinte.entity';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import 'rxjs/add/operator/finally';
import {LoaderService} from './loader.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const API_URL = 'http://localhost:8000';

@Injectable({
    providedIn: 'root'
})
export class AccueilService {

    private loaderService;
    constructor(private http: HttpClient, loaderService: LoaderService) {
        this.loaderService = loaderService;
    }
    addRemplacement(json) {
        this.showLoader();
        return this.http.post(API_URL + '/api/remplacements', json)
            .finally(() => {
                this.onEnd();
            });
    }
    getSemaines(): Observable<Semaine[]> {
        this.showLoader();
        return this.http.get<Semaine[]>(API_URL + '/accueil/semaines')
            .finally(() => {
                this.onEnd();
            });
    }

    getAstreintes(idSemaine, idVivier ): Observable<Astreinte[]> {
        this.showLoader();
        return  this.http.get<Astreinte[]>(API_URL + '/accueil/astreinte/' + idSemaine + '/' + idVivier )
            .finally(() => {
                this.onEnd();
            });
    }
    getURL(url) {
        this.showLoader();
        return this.http.get(API_URL + url)
            .finally(() => {
                this.onEnd();
            });
    }
    export(url) {
        this.showLoader();
        return this.http.get(API_URL + url)
            .finally(() => {
                this.onEnd();
            });
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
        this.showLoader();
        return this.http.post(API_URL + '/api/astreintes', json)
            .finally(() => {
                this.onEnd();
            });
    }
    private onEnd(): void {
        this.hideLoader();
    }
    private showLoader(): void {
        console.log('show loading');
        this.loaderService.show();
    }
    private hideLoader(): void {
        console.log('hide loading');
        this.loaderService.hide();
    }
}
