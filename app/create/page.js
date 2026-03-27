"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Printer, FileText } from "lucide-react";
import Link from "next/link";
import ReportPreview from "./ReportPreview";

export default function CreateReportPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4; // 1, 2, 3 for forms, 4 for preview

  const [formData, setFormData] = useState({
    // General
    confidential: false,
    reportType: "",
    whoInvolved: "",
    whatIncident: "",
    whenTimestamp: "",
    whereZone: "",
    latitude: "",
    longitude: "",
    whyContext: "",
    howMethodology: "",
    
    // Section A: Officer Details
    officerName: "",
    date: "",
    supervisorOnDuty: "",
    badgeNo: "",
    shift: "",
    postZone: "",
    
    // Section B: Daily Activity Report
    dutySummary: "",
    patrolLogs: [{ time: "", contactNo: "", area: "", observations: "", actionTaken: "" }],
    equipmentStatus: "",
    endOfShiftRemarks: "",
    
    // Section C: Incident Report
    incidentRefNo: "",
    severity: "Low",
    incidentDateTime: "",
    incidentLocation: "",
    typeOfIncident: "",
    personsInvolved: "",
    incidentNarrative: "",
    evidenceCollected: "",
    immediateAction: "",
    notificationsMade: "",
    followUpRequired: ""
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePatrolLogChange = (index, field, value) => {
    const newLogs = [...formData.patrolLogs];
    newLogs[index][field] = value;
    setFormData((prev) => ({ ...prev, patrolLogs: newLogs }));
  };

  const addPatrolLog = () => {
    setFormData((prev) => ({
      ...prev,
      patrolLogs: [...prev.patrolLogs, { time: "", contactNo: "", area: "", observations: "", actionTaken: "" }]
    }));
  };

  const nextStep = () => { if (step < totalSteps) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const handlePrint = () => {
    const originalTitle = document.title;
    const dateStr = new Date().toISOString().split('T')[0];
    const reportName = formData.incidentRefNo 
      ? `Surveillance_Report_${formData.incidentRefNo}` 
      : `Surveillance_Report_${dateStr}`;
    
    document.title = reportName;
    window.print();
    
    setTimeout(() => {
      document.title = originalTitle;
    }, 500);
  };

  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen bg-neutral-50 text-black font-sans flex flex-col selection:bg-black selection:text-white print:bg-white print:block">
      {/*...rest of code...*/}
      {/* Header & Progress */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-black/10 z-10 print:hidden">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-black transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="font-semibold text-sm tracking-tight flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Survex Report Builder</span>
            </div>
          </div>
          <div className="text-sm font-medium text-neutral-500">
            {step < 4 ? `Step ${step} of 3` : "Review & Print"}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-neutral-200">
          <motion.div 
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 pb-32 print:p-0 print:m-0 print:w-auto print:max-w-none print:block">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <StepHeader title="General Details" subtitle="Provide the essential who, what, when, and where." />
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl">
                  <input 
                    type="checkbox" 
                    id="confidential"
                    checked={formData.confidential}
                    onChange={(e) => handleInputChange("confidential", e.target.checked)}
                    className="w-4 h-4 accent-black"
                  />
                  <label htmlFor="confidential" className="font-medium text-sm cursor-pointer select-none">Mark as CONFIDENTIAL (Internal Use Only)</label>
                </div>
                
                <Field label="Report Type (Activity / Incident)">
                  <Input value={formData.reportType} onChange={(e) => handleInputChange("reportType", e.target.value)} placeholder="e.g. Incident" />
                </Field>

                <Field label="Who (Involved)">
                  <Textarea value={formData.whoInvolved} onChange={(e) => handleInputChange("whoInvolved", e.target.value)} placeholder="List all individuals involved..." />
                </Field>

                <Field label="What (Incident/Activity)">
                  <Textarea value={formData.whatIncident} onChange={(e) => handleInputChange("whatIncident", e.target.value)} placeholder="Describe the activity or incident..." />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="When (Timestamp)">
                    <Input type="datetime-local" value={formData.whenTimestamp} onChange={(e) => handleInputChange("whenTimestamp", e.target.value)} />
                  </Field>
                  <Field label="Where (Zone/Location)">
                    <Input value={formData.whereZone} onChange={(e) => handleInputChange("whereZone", e.target.value)} placeholder="e.g. North Gate" />
                  </Field>
                  <Field label="Latitude">
                    <Input value={formData.latitude} onChange={(e) => handleInputChange("latitude", e.target.value)} placeholder="e.g. 34.0522" />
                  </Field>
                  <Field label="Longitude">
                    <Input value={formData.longitude} onChange={(e) => handleInputChange("longitude", e.target.value)} placeholder="e.g. -118.2437" />
                  </Field>
                </div>

                <Field label="Why (Context)">
                  <Textarea value={formData.whyContext} onChange={(e) => handleInputChange("whyContext", e.target.value)} placeholder="Provide context or suspected motive..." />
                </Field>

                <Field label="How (Methodology)">
                  <Textarea value={formData.howMethodology} onChange={(e) => handleInputChange("howMethodology", e.target.value)} placeholder="Method of entry/action..." />
                </Field>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <StepHeader title="Officer & Activity" subtitle="Section A & B: Officer details and daily logs." />
              <div className="space-y-8">
                {/* Section A */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg border-b pb-2">Section A: Officer Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Officer Name"><Input value={formData.officerName} onChange={(e)=>handleInputChange("officerName", e.target.value)} /></Field>
                    <Field label="Date"><Input type="date" value={formData.date} onChange={(e)=>handleInputChange("date", e.target.value)} /></Field>
                    <Field label="Supervisor on Duty"><Input value={formData.supervisorOnDuty} onChange={(e)=>handleInputChange("supervisorOnDuty", e.target.value)} /></Field>
                    <Field label="Badge / ID No."><Input value={formData.badgeNo} onChange={(e)=>handleInputChange("badgeNo", e.target.value)} /></Field>
                    <Field label="Shift"><Input value={formData.shift} onChange={(e)=>handleInputChange("shift", e.target.value)} /></Field>
                    <Field label="Post/Zone"><Input value={formData.postZone} onChange={(e)=>handleInputChange("postZone", e.target.value)} /></Field>
                  </div>
                </div>

                {/* Section B */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg border-b pb-2">Section B: Daily Activity Report</h3>
                  <Field label="Duty Summary / Briefing Notes">
                    <Textarea value={formData.dutySummary} onChange={(e)=>handleInputChange("dutySummary", e.target.value)} />
                  </Field>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold">Patrol & Activity Log</label>
                      <button onClick={addPatrolLog} className="text-xs bg-black text-white px-3 py-1.5 rounded-md hover:bg-neutral-800 transition-colors">
                        + Add Row
                      </button>
                    </div>
                    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-neutral-100 text-neutral-600">
                            <tr>
                              <th className="px-3 py-2 font-medium">Time</th>
                              <th className="px-3 py-2 font-medium">Contact No.</th>
                              <th className="px-3 py-2 font-medium">Area Patrolled</th>
                              <th className="px-3 py-2 font-medium">Observations</th>
                              <th className="px-3 py-2 font-medium">Action Taken</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {formData.patrolLogs.map((log, i) => (
                              <tr key={i}>
                                <td className="p-2"><Input className="h-8 text-xs px-2" value={log.time} onChange={(e)=>handlePatrolLogChange(i, "time", e.target.value)} /></td>
                                <td className="p-2"><Input className="h-8 text-xs px-2" value={log.contactNo} onChange={(e)=>handlePatrolLogChange(i, "contactNo", e.target.value)} /></td>
                                <td className="p-2"><Input className="h-8 text-xs px-2" value={log.area} onChange={(e)=>handlePatrolLogChange(i, "area", e.target.value)} /></td>
                                <td className="p-2"><Textarea className="min-h-[32px] text-xs p-2" rows={1} value={log.observations} onChange={(e)=>handlePatrolLogChange(i, "observations", e.target.value)} /></td>
                                <td className="p-2"><Textarea className="min-h-[32px] text-xs p-2" rows={1} value={log.actionTaken} onChange={(e)=>handlePatrolLogChange(i, "actionTaken", e.target.value)} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <Field label="Equipment & Asset Status">
                    <Textarea value={formData.equipmentStatus} onChange={(e)=>handleInputChange("equipmentStatus", e.target.value)} />
                  </Field>
                  <Field label="End of Shift Remarks">
                    <Textarea value={formData.endOfShiftRemarks} onChange={(e)=>handleInputChange("endOfShiftRemarks", e.target.value)} />
                  </Field>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <StepHeader title="Incident Report" subtitle="Section C: Detailed account of any incidents." />
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Incident Reference No."><Input value={formData.incidentRefNo} onChange={(e)=>handleInputChange("incidentRefNo", e.target.value)} /></Field>
                  <Field label="Severity">
                    <select 
                      value={formData.severity} 
                      onChange={(e)=>handleInputChange("severity", e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </Field>
                  <Field label="Date & Time of Incident"><Input type="datetime-local" value={formData.incidentDateTime} onChange={(e)=>handleInputChange("incidentDateTime", e.target.value)} /></Field>
                  <Field label="Location / Zone"><Input value={formData.incidentLocation} onChange={(e)=>handleInputChange("incidentLocation", e.target.value)} /></Field>
                </div>
                
                <Field label={<span>Type of Incident <span className="text-neutral-400 font-normal">(Theft, Intrusion, Fire, etc.)</span></span>}>
                  <Input value={formData.typeOfIncident} onChange={(e)=>handleInputChange("typeOfIncident", e.target.value)} />
                </Field>
                <Field label="Person(s) Involved / Witnesses">
                  <Textarea value={formData.personsInvolved} onChange={(e)=>handleInputChange("personsInvolved", e.target.value)} />
                </Field>
                <Field label="Incident Narrative (Detailed Description)">
                  <Textarea rows={6} value={formData.incidentNarrative} onChange={(e)=>handleInputChange("incidentNarrative", e.target.value)} />
                </Field>
                <Field label="Evidence / Exhibits Collected">
                  <Input value={formData.evidenceCollected} onChange={(e)=>handleInputChange("evidenceCollected", e.target.value)} />
                </Field>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Immediate Action Taken">
                    <Textarea value={formData.immediateAction} onChange={(e)=>handleInputChange("immediateAction", e.target.value)} />
                  </Field>
                  <Field label={<span>Notifications Made <span className="text-neutral-400 font-normal">(Police, Mgmt, etc.)</span></span>}>
                    <Textarea value={formData.notificationsMade} onChange={(e)=>handleInputChange("notificationsMade", e.target.value)} />
                  </Field>
                </div>

                <Field label="Follow-Up Action Required">
                  <Textarea value={formData.followUpRequired} onChange={(e)=>handleInputChange("followUpRequired", e.target.value)} />
                </Field>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-col items-center mb-8 text-center print:hidden">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Report Ready</h2>
                <p className="text-neutral-500">Please review the preview below before printing or saving to PDF.</p>
                <button 
                  onClick={handlePrint}
                  className="mt-6 flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-neutral-800 transition-colors shadow-lg shadow-black/10"
                >
                  <Printer className="w-5 h-5" />
                  Print / Save PDF
                </button>
              </div>

              {/* The actual printable preview is rendered here */}
              <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-2xl bg-neutral-300 flex flex-col print:border-none print:shadow-none print:bg-transparent print:rounded-none print:overflow-visible print:block">
                <div className="bg-neutral-800 p-3 border-b border-neutral-900 text-center text-xs font-semibold text-white tracking-widest flex items-center justify-between px-6 print:hidden">
                  <span>PDF PREVIEW</span>
                  <span className="text-neutral-400 font-normal">A4 Format (3 Pages)</span>
                </div>
                <div className="max-h-[650px] overflow-auto flex flex-col items-center p-4 sm:p-8 custom-scrollbar print:max-h-none print:overflow-visible print:p-0 print:block">
                  <div className="transform scale-[0.65] sm:scale-[0.85] md:scale-100 origin-top w-[210mm] shrink-0 transition-transform print:transform-none print:scale-100 print:w-auto">
                    <ReportPreview data={formData} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      {step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${step === 1 ? "text-neutral-300 cursor-not-allowed" : "text-black hover:bg-neutral-100"}`}
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-800 transition-colors shadow-md"
            >
              {step === 3 ? "Generate Report" : "Continue"}
              {step < 3 && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold tracking-tight mb-2">{title}</h2>
      <p className="text-neutral-500">{subtitle}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold tracking-tight text-neutral-800">{label}</label>
      {children}
    </div>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input 
      className={`w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm ${className}`}
      {...props}
    />
  );
}

function Textarea({ className = "", rows = 3, ...props }) {
  return (
    <textarea 
      rows={rows}
      className={`w-full bg-white border border-neutral-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm resize-y ${className}`}
      {...props}
    />
  );
}
