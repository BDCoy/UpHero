import * as pdfjsLib from 'pdfjs-dist';

// Set worker source using CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface TextItem {
  str: string;
  transform: number[];
  width: number;
  height: number;
  dir: string;
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useWorkerFetch: true,
      isEvalSupported: true,
      useSystemFonts: true
    });

    const pdf = await loadingTask.promise;
    let fullText = '';
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      
      const content = await page.getTextContent({
        normalizeWhitespace: true,
        disableCombineTextItems: false,
        includeMarkedContent: true
      });
      
      const lineMap = new Map<number, Array<{text: string, x: number}>>();
      
      content.items.forEach((item: any) => {
        if (!item || typeof item !== 'object' || !('str' in item) || !('transform' in item)) return;
        
        const textItem = item as TextItem;
        const text = textItem.str;
        
        if (!text || !text.trim()) return;
        
        const transform = textItem.transform;
        if (!Array.isArray(transform) || transform.length < 6) return;
        
        const y = Math.round(transform[5]);
        const x = transform[4];
        
        if (!lineMap.has(y)) {
          lineMap.set(y, []);
        }
        
        const line = lineMap.get(y);
        if (line) {
          line.push({ text: text.trim(), x });
        }
      });
      
      const sortedYPositions = Array.from(lineMap.keys()).sort((a, b) => b - a);
      
      for (const y of sortedYPositions) {
        const lineItems = lineMap.get(y);
        if (!lineItems || lineItems.length === 0) continue;
        
        lineItems.sort((a, b) => a.x - b.x);
        
        const lineText = lineItems
          .map(item => item.text)
          .join(' ')
          .trim();
        
        if (lineText) {
          fullText += lineText + '\n';
        }
      }
      
      fullText += '\n';
    }
    
    const cleanedText = fullText
      .replace(/\s+/g, ' ')
      .replace(/([a-z])- ([a-z])/gi, '$1$2')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[^\x20-\x7E\n]/g, '')
      .trim();

    if (!cleanedText) {
      throw new Error('No text content found in the PDF');
    }

    return cleanedText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    if (error instanceof Error) {
      if (error.message.includes('No text content found')) {
        throw new Error('The PDF appears to be empty or unreadable. Please ensure you have uploaded a valid PDF file.');
      }
      throw new Error(`Failed to extract text from PDF: ${error.message}. Please ensure you are uploading a valid PDF file.`);
    }
    throw new Error('Failed to extract text from PDF. Please ensure you have uploaded a valid PDF file.');
  }
}