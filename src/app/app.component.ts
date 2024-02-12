import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { PdfService } from './pdf.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Convert_To_PDF';
  @ViewChild('content') content!: ElementRef;
  data: any;
  name: any;

  constructor(private pdfService: PdfService) { }

  ngOnInit(): void {
    this.downloadPDFAPI();
  }

  downloadPDFAPI() {
    let formData = new FormData();
    formData.append('vendor_id', "8");
    formData.append('language', "en");
    this.pdfService.getDataFromApi(formData).subscribe((res: any) => {
      this.data = res.questionnaires_list;
    });
  }

  downloadPDF() {
    const contentElement = this.content.nativeElement;
    this.pdfService.generatePDF(contentElement, 'my-pdf');
  }
}
