import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocalStorageApi from "./../../../../../service/LocalStorageApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (resumeInfo?.summery !== undefined) {
      setSummery(resumeInfo.summery);
    }
  }, [resumeInfo?.summery]);

  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, summery }));
  }, [summery, setResumeInfo]);

  const onSave = async (e) => {
    e.preventDefault();
    const value = summery.trim();
    if (!value) return;

    setLoading(true);
    try {
      const data = { data: { summery: value } };
      await LocalStorageApi.UpdateResumeDetail(params?.resumeId, data);
      enabledNext?.(true);
      toast.success("Details updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <Textarea
            className="mt-5"
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Summery;
