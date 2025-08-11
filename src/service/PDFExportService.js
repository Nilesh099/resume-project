import html2pdf from 'html2pdf.js'

export class PDFExportService {
  static async exportToPDF(resumeInfo, elementId = 'print-area') {
    const element = document.getElementById(elementId)
    
    if (!element) {
      throw new Error('Resume element not found')
    }

    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${resumeInfo?.firstName || 'Resume'}_${resumeInfo?.lastName || 'CV'}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: '.avoid-page-break'
      }
    }

    try {
      // Temporarily modify styles for better PDF output
      const originalStyles = this.preparePDFStyles()
      
      await html2pdf().set(options).from(element).save()
      
      // Restore original styles
      this.restoreStyles(originalStyles)
      
      return true
    } catch (error) {
      console.error('PDF export failed:', error)
      throw error
    }
  }

  static preparePDFStyles() {
    const element = document.getElementById('print-area')
    if (!element) return {}

    const originalStyles = {
      width: element.style.width,
      maxWidth: element.style.maxWidth,
      margin: element.style.margin,
      padding: element.style.padding,
      transform: element.style.transform,
      fontSize: element.style.fontSize
    }

    // Optimize for PDF
    element.style.width = '210mm'
    element.style.maxWidth = '210mm'
    element.style.margin = '0'
    element.style.padding = '20mm'
    element.style.transform = 'none'
    element.style.fontSize = '14px'

    // Hide any interactive elements
    const interactiveElements = element.querySelectorAll('button, .no-print, [contenteditable]')
    interactiveElements.forEach(el => {
      el.style.display = 'none'
    })

    return originalStyles
  }

  static restoreStyles(originalStyles) {
    const element = document.getElementById('print-area')
    if (!element || !originalStyles) return

    Object.entries(originalStyles).forEach(([property, value]) => {
      element.style[property] = value || ''
    })

    // Show interactive elements again
    const interactiveElements = element.querySelectorAll('button, .no-print, [contenteditable]')
    interactiveElements.forEach(el => {
      el.style.display = ''
    })
  }

  // Fallback to print dialog
  static printResume() {
    window.print()
  }
}

export default PDFExportService
