import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
// import * as jsPDF from 'jspdf';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }

  getDataFromApi(data: any) {
    return this.http.post('https://f141-2401-4900-1c2d-9b68-2851-623f-10ca-776c.ngrok-free.app/vendor/list_questionnaire/', data);
  }

  generatePDF(content: HTMLElement, filename: string) {
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      let pdf = new jsPDF;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename + '.pdf');
    });
  }
}
