import { Component, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn: boolean = false;
  receiveConfirmationMessages: boolean = true;
  pbColor: string = '#ff4fad';
  authorized = '';
  ExportToExcel(name: string, table: ElementRef, sheet: string)
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheet);
    XLSX.writeFile(wb, name+'.xlsx');
  }
}
