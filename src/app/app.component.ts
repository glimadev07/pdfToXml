import { Component } from '@angular/core';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Configuração do worker com uma URL diferente
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  extractedText: string = '';

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      debugger;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      this.extractedText = await this.extractTextFromPdf(pdf);
    }
  }

  async extractTextFromPdf(pdf: any): Promise<string> {
    let text = '';
    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      text += textContent.items.map((item: any) => item.str).join(' ') + '\n';
    }
    debugger;
    console.log(text)

    return text;
  }
}


