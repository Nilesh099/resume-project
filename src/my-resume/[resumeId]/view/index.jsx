import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import LocalStorageApi from "./../../../../service/LocalStorageApi";
import PDFExportService from "../../../service/PDFExportService";
import { RWebShare } from "react-web-share";
import { Download, Share, FileText } from "lucide-react";
import { toast } from "sonner";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  const [isExporting, setIsExporting] = useState(false);

  const GetResumeInfo = useCallback(() => {
    LocalStorageApi.GetResumeById(resumeId).then((resp) => {
      setResumeInfo(resp.data.data);
    }).catch(error => {
      console.error('Error loading resume:', error);
      toast.error('Resume not found. Please check the URL or create a new resume.');
      // Optionally redirect to dashboard
      // window.location.href = '/dashboard';
    });
  }, [resumeId]);

  useEffect(() => {
    GetResumeInfo();
  }, [GetResumeInfo]);

  const HandleDownload = async () => {
    if (!resumeInfo) {
      toast.error("Resume data not loaded");
      return;
    }

    setIsExporting(true);
    try {
      await PDFExportService.exportToPDF(resumeInfo);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed. Using print fallback...");
      PDFExportService.printResume();
    } finally {
      setIsExporting(false);
    }
  };

  const HandlePrint = () => {
    PDFExportService.printResume();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congratulations! Your AI-powered resume is ready! 🎉
          </h2>
          <p className="text-center text-gray-400 mt-2">
            Now you can download your professional resume or share it with others using the unique URL below.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 px-4 md:px-44 my-10">
            <Button 
              onClick={HandleDownload} 
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Download PDF"}
            </Button>

            <Button 
              variant="outline" 
              onClick={HandlePrint}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Print
            </Button>

            <RWebShare
              data={{
                text: `Check out ${resumeInfo?.firstName || 'this amazing'} ${resumeInfo?.lastName || 'professional'}'s resume!`,
                url: window.location.href,
                title: `${resumeInfo?.firstName || ''} ${resumeInfo?.lastName || ''} - Professional Resume`,
              }}
              onClick={() => toast.success("Share options opened!")}
            >
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="w-4 h-4" />
                Share
              </Button>
            </RWebShare>
          </div>

          {resumeInfo && (
            <div className="text-center text-sm text-gray-500 mt-4">
              <p>
                <strong>Shareable URL:</strong> 
                <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                  {window.location.href}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area" className="bg-white">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
