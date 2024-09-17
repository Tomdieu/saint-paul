import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PdfDownloadButton = ({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement>;
}) => {
  const generatePdf = async () => {
    if (targetRef.current) {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2, // Increase resolution
        useCORS: true,
        logging: false,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [297, 210],
      });
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save("tableau_honneur.pdf");
    }
  };

  return (
    <Button
      onClick={generatePdf}
      className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
    >
      Générer PDF
    </Button>
  );
};

export default function HonorRollTemplate() {
  const [formData, setFormData] = useState({
    studentName: "",
    className: "",
    average: "",
    rank: "",
    mention: "",
    trimester: "",
    date: new Date().toDateString(),
    councilDate: "",
    withEncouragement: false,
    withCongratulations: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const pdfRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto p-4 font-RobotoBold">
      <div
        ref={pdfRef}
        className="bg-white p-8 border-[20px] border-[#855232] shadow-lg mx-auto"
        style={{
          width: "297mm",
          height: "210mm",
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "auto",
        }}
      >
        <div className="flex justify-around items-start mb-4">
          <div className="text-center flex flex-col gap-y-2">
            <h2 className="text-base font-bold text-black text-center">
              MINISTRE DES ENSEIGNEMENTS SECONDAIRES
            </h2>
            <h3 className="text-md font-semibold text-black text-center">
              DELEGATION REGIONALE DU CENTRE
            </h3>
            <h3 className="text-md font-semibold text-black text-center">
              DELEGATION DEPARTMENTAL DU MFOUNDI
            </h3>
            <h2 className="text-xl font-bold text-green-600 mt-2">
              COLLEGE PRIVE LAÏC SAINT PAUL II
            </h2>
            <p className="text-sm text-black font-RobotoThin">
              Tel: 677 886 206 / 699 644 393 Yaounde Cameroun
            </p>
          </div>
          <div className=" flex-1 flex items-center justify-center">
            <img src={"/logo.png"} className="w-64 h-44" />
          </div>
          <div className="text-center flex-1">
            <h2 className="text-lg font-bold text-black">
              REPUBLIQUE DU CAMEROON
            </h2>
            <h3 className="text-md font-semibold text-black">
              PAIX - TRAVAIL - PATRIE
            </h3>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#7F132E] mb-2 relative z-50">
            TABLEAU D'HONNEUR
          </h1>
        </div>

        <div className="mb-4 text-center z-50 relative">
          <p className="text-3xl font-semibold">
            Le Principal Du Collège Prive LaÏc Saint Paul II
          </p>
        </div>
        <div
          className="flex flex-col relative"
          style={
            {
              // backgroundImage: `url(/logo.png)`,
              // backgroundRepeat: "no-repeat",
              // backgroundOrigin: "content-box",
            }
          }
        >
          <div className="absolute -top-5 bottom-0 left-0 right-0 flex items-center justify-center z-0">
            <img src="/logo.png" className="w-[36rem] h-[25rem]" />
          </div>
          <div className="flex gap-2 pl-3 z-50 relative">
            <div className="mb-2">
              <Label htmlFor="councilDate" className="font-RobotoBold text-lg">
                Vu le procès verbal du conseil de classe du
              </Label>
              <input
                id="councilDate"
                name="councilDate"
                type="text"
                value={formData.councilDate}
                onChange={handleInputChange}
                className="inline-block w-20 ml-2 text-lg text-center border-b-2 pb-1 border-black bg-transparent"
              />
            </div>

            <div className="mb-2">
              <Label htmlFor="trimester" className="font-RobotoBold text-lg">
                Trimèstre tenu le
              </Label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="inline-block w-32 ml-2 text-lg border-b-2 pb-1 border-black bg-transparent"
              />
              <span className="ml-2 font-RobotoBold text-lg">
                , decerne le tableau d'honneur
              </span>
            </div>
          </div>

          <div className="mb-2 flex gap-2 items-end z-50 relative">
            <Label htmlFor="studentName" className="font-semibold text-lg">
              A l'élève:
            </Label>
            <input
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              className="w-[90%] mt-1 text-lg border-b-2 pb-1 border-black bg-transparent"
            />
          </div>

          <div className="grid grid-cols-12 gap-2 mb-4 z-50 relative">
            <div className="flex gap-2 items-end col-span-5">
              <Label
                htmlFor="className"
                className="font-semibold w-[30%] text-base"
              >
                De la classe de:
              </Label>
              <input
                id="className"
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                className="mt-1 border-b-2 pb-1 w-[70%] text-lg text-center border-black bg-transparent"
              />
            </div>
            <div className="flex gap-1 col-span-7">
              <Label htmlFor="average" className="font-semibold text-base">
                Qui a obtenu la moyenne de:
              </Label>
              <input
                id="average"
                name="average"
                value={formData.average}
                onChange={handleInputChange}
                className="w-[8%] mt-1 border-b-2 p-0 border-black text-lg text-center bg-transparent"
              />
              <span className="ml-2 text-base">/20 et le Rang</span>
              <input
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleInputChange}
                className="w-[8%] ml-2 border-b-2 p-0 border-black text-lg text-center bg-transparent"
              />
              <span className="ml-2 text-base">pour son travail</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 items-start z-50 relative">
            <div className="mb-4 flex gap-2">
              <Label htmlFor="mention" className="font-semibold text-lg">
                Mention:
              </Label>
              <Select
                name="mention"
                value={formData.mention}
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "mention", value },
                  } as any)
                }
              >
                <SelectTrigger className="w-[80%] bg-transparent ml-2 text-lg mb-2 text-center border-t-0 p-0 border-l-0 border-r-0 border-b-2 border-black rounded-none focus:ring-0">
                  <SelectValue
                    placeholder="Sélectionner"
                    className="pb-4 text-center text-lg"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Passable">Passable</SelectItem>
                  <SelectItem value="Assez Bien">Assez Bien</SelectItem>
                  <SelectItem value="Bien">Bien</SelectItem>
                  <SelectItem value="Très Bien">Très Bien</SelectItem>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <Checkbox
                  id="withEncouragement"
                  checked={formData.withEncouragement}
                  onCheckedChange={handleCheckboxChange("withEncouragement")}
                  className="w-6 h-6"
                />
                <Label
                  htmlFor="withEncouragement"
                  className="ml-2 font-semibold text-lg"
                >
                  Avec Encouragements
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="withCongratulations"
                  checked={formData.withCongratulations}
                  onCheckedChange={handleCheckboxChange("withCongratulations")}
                  className="w-6 h-6"
                />
                <Label
                  htmlFor="withCongratulations"
                  className="ml-2 font-semibold text-lg"
                >
                  Avec Félicitations
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="float-right mt-0 mr-9 text-center">
          <p className="font-semibold">
            Yaoundé, le{" "}
            {/* <span className="underline w-96">
              
              {formData.date}
            </span> */}
            <input
              name="date"
              type="date"
              className="inline-block w-32 ml-2 text-center border-b-2 pb-1 border-black bg-transparent"
            />
          </p>
          <p className="mt-4 font-semibold">Le principal</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <PdfDownloadButton targetRef={pdfRef} />
      </div>
    </div>
  );
}
