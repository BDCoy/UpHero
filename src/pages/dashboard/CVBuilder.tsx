import { useCVBuilderStore } from "@lib/store/cv-builder";
import { Editor } from "@components/cv-builder/Editor";
import { Preview } from "@components/cv-builder/Preview";
import { StylesEditor } from "@components/cv-builder/StylesEditor";
import { Button } from "@components/Button";
import { Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CVPDF } from "@components/cv-builder/CVPDF";

export function CVBuilder() {
  const { cvData, styles, setCVData, setStyles, reset } = useCVBuilderStore();

  // Only render the PDFDownloadLink when we have the minimum required data
  const canGeneratePDF = cvData.fullName && cvData.title;
  console.log(styles);
  const pdfDownloadLink = (
    <PDFDownloadLink
      document={<CVPDF cvData={cvData} styles={styles} />}
      fileName="cv.pdf"
    >
      {({ loading }) => (
        <Button disabled={loading}>
          <Download className="w-4 h-4 mr-2" />
          {loading ? "Preparing..." : "Export PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-upwork-gray">CV Builder</h1>
          <p className="mt-1 text-sm text-upwork-gray-light">
            Create a professional CV with our easy-to-use builder
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
          {canGeneratePDF ? (
            pdfDownloadLink
          ) : (
            <Button disabled>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Editor cvData={cvData} onUpdate={setCVData} />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <StylesEditor styles={styles} onUpdate={setStyles} />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-lg shadow-sm p-6 overflow-auto max-h-[calc(100vh-8rem)]">
            <CVPDF cvData={cvData} styles={styles} />
            <Preview cvData={cvData} styles={styles} />
          </div>
        </div>
      </div>
    </div>
  );
}
