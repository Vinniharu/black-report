export default function ReportPreview({ data }) {
  return (
    <div className="flex flex-col items-center bg-neutral-200 py-10 print:py-0 print:bg-white text-black font-sans">
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; margin: 0; padding: 0; }
          .hide-on-print { display: none !important; }
          .print-page {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 10mm !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
          }
        }
      `}} />

      <div id="print-area" className="flex flex-col gap-10 print:gap-0 print:block">
        {/* Page 1: General Details */}
        <div className="print-page w-[210mm] h-[297mm] overflow-hidden bg-white shadow-2xl print:shadow-none p-[15mm] box-border text-[13px] leading-snug break-inside-avoid">
          <header className="text-center border-b-[1.5px] border-black pb-3 mb-6">
            <h1 className="m-0 text-[1.25rem] uppercase tracking-wider font-extrabold text-neutral-900">Security Surveillance Report</h1>
            {data.confidential && (
              <div className="font-bold mt-2 flex items-center justify-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 bg-black rounded-sm print:border print:border-black inline-block flex items-center justify-center">
                   <span className="w-1 h-1 bg-white mb-[0.5px]"></span>
                </span>
                CONFIDENTIAL: FOR INTERNAL USE ONLY
              </div>
            )}
          </header>

          <div className="mb-4 space-y-3 px-2 text-xs">
            <PreviewField label="Report Type (Activity / Incident)" value={data.reportType} />
            <PreviewField label="Who (Involved)" value={data.whoInvolved} minHeight="40px" />
            <PreviewField label="What (Incident/Activity)" value={data.whatIncident} minHeight="40px" />

            <div className="flex gap-4">
              <PreviewField label="When (Timestamp)" value={data.whenTimestamp ? new Date(data.whenTimestamp).toLocaleString() : ""} className="flex-1" />
              <PreviewField label="Where (Zone/Location)" value={data.whereZone} className="flex-1" />
            </div>

            <div className="flex gap-4">
              <PreviewField label="Latitude" value={data.latitude} className="flex-1" />
              <PreviewField label="Longitude" value={data.longitude} className="flex-1" />
            </div>

            <PreviewField label="Why (Context)" value={data.whyContext} minHeight="60px" />
            <PreviewField label="How (Methodology)" value={data.howMethodology} minHeight="60px" />
          </div>
        </div>

        {/* Page 2: Officer & Activity */}
        <div className="print-page w-[210mm] h-[297mm] overflow-hidden bg-white shadow-2xl print:shadow-none p-[15mm] box-border text-[13px] leading-snug break-inside-avoid flex flex-col">
          <header className="text-center pb-2 mb-4 border-b border-neutral-200">
            <h1 className="m-0 text-lg uppercase font-bold text-neutral-400 tracking-wider">Security Surveillance Report</h1>
          </header>

          <div className="flex-1">
            {/* Section A */}
            <div className="mb-6">
              <div className="bg-neutral-900 text-white px-2 py-0.5 font-bold uppercase mb-3 text-[11px] tracking-wider rounded-sm">Section A: Officer Details</div>
              <div className="space-y-2 px-2 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <PreviewField label="Officer Name" value={data.officerName} />
                  <PreviewField label="Date" value={data.date} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <PreviewField label="Supervisor on Duty" value={data.supervisorOnDuty} />
                  <PreviewField label="Badge / ID No." value={data.badgeNo} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <PreviewField label="Shift" value={data.shift} />
                  <PreviewField label="Post/Zone" value={data.postZone} />
                </div>
              </div>
            </div>

            {/* Section B */}
            <div className="mb-4">
              <div className="bg-neutral-900 text-white px-2 py-0.5 font-bold uppercase mb-3 text-[11px] tracking-wider rounded-sm">Section B: Daily Activity Report</div>
              <div className="space-y-3 px-2 text-xs">
                <PreviewField label="Duty Summary / Briefing Notes" value={data.dutySummary} minHeight="40px" />

                <div>
                  <label className="font-bold text-[11px] mb-1 block uppercase text-neutral-700">Patrol & Activity Log:</label>
                  <table className="w-full border-collapse mb-1 text-[11px]">
                    <thead>
                      <tr>
                        <th className="border border-neutral-400 bg-neutral-100 px-1.5 py-1 text-left w-[12%] font-semibold">Time</th>
                        <th className="border border-neutral-400 bg-neutral-100 px-1.5 py-1 text-left w-[15%] font-semibold">Contact No.</th>
                        <th className="border border-neutral-400 bg-neutral-100 px-1.5 py-1 text-left w-[20%] font-semibold">Area / Zone</th>
                        <th className="border border-neutral-400 bg-neutral-100 px-1.5 py-1 text-left font-semibold">Observations & Findings</th>
                        <th className="border border-neutral-400 bg-neutral-100 px-1.5 py-1 text-left font-semibold">Action Taken</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.patrolLogs.map((log, i) => (
                        <tr key={i}>
                          <td className="border border-neutral-300 px-1.5 py-1 align-top break-words max-w-0">{log.time}</td>
                          <td className="border border-neutral-300 px-1.5 py-1 align-top break-words max-w-0">{log.contactNo}</td>
                          <td className="border border-neutral-300 px-1.5 py-1 align-top break-words max-w-0">{log.area}</td>
                          <td className="border border-neutral-300 px-1.5 py-1 align-top break-words max-w-0">{log.observations}</td>
                          <td className="border border-neutral-300 px-1.5 py-1 align-top break-words max-w-0">{log.actionTaken}</td>
                        </tr>
                      ))}
                      {data.patrolLogs.length === 0 && (
                        <tr><td colSpan="5" className="border border-neutral-300 p-2 text-center text-neutral-400 italic">No logs recorded.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <PreviewField label="Equipment & Asset Status" value={data.equipmentStatus} minHeight="30px" />
                <PreviewField label="End of Shift Remarks" value={data.endOfShiftRemarks} minHeight="30px" />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-auto pt-8 pb-4">
            <div className="w-[40%] text-center">
              <div className="border-t border-black pt-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-800">Officer Signature / Date</div>
            </div>
            <div className="w-[40%] text-center">
              <div className="border-t border-black pt-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-800">Supervisor Signature / Date</div>
            </div>
          </div>
        </div>

        {/* Page 3: Incident Report */}
        <div className="print-page w-[210mm] h-[297mm] overflow-hidden bg-white shadow-2xl print:shadow-none p-[15mm] box-border text-[13px] leading-snug break-inside-avoid flex flex-col">
          <header className="text-center pb-2 mb-4 border-b border-neutral-200">
            <h1 className="m-0 text-lg uppercase font-bold text-neutral-400 tracking-wider">Security Surveillance Report</h1>
          </header>

          <div className="flex-1">
            <div className="bg-neutral-900 text-white px-2 py-0.5 font-bold uppercase mb-3 text-[11px] tracking-wider rounded-sm">Section C: Incident Report</div>
            
            <div className="space-y-3 px-2 text-xs">
              <div className="flex gap-4">
                <PreviewField label="Incident Reference No." value={data.incidentRefNo} className="w-2/3" />
                <div className="flex flex-col w-1/3">
                  <label className="font-bold text-[11px] mb-0.5 uppercase text-neutral-700">Severity:</label>
                  <div className="border border-neutral-300 rounded-sm px-2 py-1 min-h-[26px] font-bold text-black bg-neutral-50 shadow-inner flex items-center">
                    {data.severity}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <PreviewField label="Date & Time of Incident" value={data.incidentDateTime ? new Date(data.incidentDateTime).toLocaleString() : ""} />
                <PreviewField label="Location / Zone" value={data.incidentLocation} />
              </div>

              <PreviewField label="Type of Incident" value={data.typeOfIncident} />
              <PreviewField label="Person(s) Involved / Witnesses" value={data.personsInvolved} minHeight="40px" />
              
              <div className="flex flex-col">
                <label className="font-bold text-[11px] mb-0.5 uppercase text-neutral-700">Incident Narrative (Detailed Description)</label>
                <div className="border border-neutral-300 rounded px-2 py-1.5 whitespace-pre-wrap break-words min-h-[140px] text-xs leading-relaxed bg-neutral-50/50">
                  {data.incidentNarrative}
                </div>
              </div>

              <PreviewField label="Evidence / Exhibits Collected" value={data.evidenceCollected} minHeight="30px" />

              <div className="grid grid-cols-2 gap-4">
                <PreviewField label="Immediate Action Taken" value={data.immediateAction} minHeight="50px" />
                <PreviewField label="Notifications Made" value={data.notificationsMade} minHeight="50px" />
              </div>

              <PreviewField label="Follow-Up Action Required" value={data.followUpRequired} minHeight="40px" />
            </div>
          </div>

          <div className="flex justify-between mt-auto pt-8 pb-4">
            <div className="w-[40%] text-center">
              <div className="border-t border-black pt-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-800">Reporting Officer Signature / Date</div>
            </div>
            <div className="w-[40%] text-center">
              <div className="border-t border-black pt-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-800">Supervisor Signature / Date</div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

function PreviewField({ label, value, className = "", minHeight = "26px" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-bold text-[11px] mb-0.5 uppercase text-neutral-700">{label}</label>
      <div 
        className="border border-neutral-300 rounded-sm px-2 py-1 whitespace-pre-wrap break-words bg-white"
        style={{ minHeight: minHeight }}
      >
        {value}
      </div>
    </div>
  );
}
