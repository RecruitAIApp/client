import { useCallback } from 'react';

export function usePipelineExport(jobTitle, columns) {
  const handleExport = useCallback(() => {
    const headers = ["Candidate Name", "Email", "Phone", "Location", "AI Match Score", "Experience (Years)", "Hiring Stage", "Applied Date"];
    const rows = [];

    const escapeCsvValue = (val) => {
      let stringVal = String(val ?? "");
      stringVal = stringVal.replace(/"/g, '""');
      if (/^[=+\-@\t\r]/.test(stringVal)) {
        stringVal = `'${stringVal}`;
      }
      return `"${stringVal}"`;
    };

    Object.entries(columns).forEach(([stageKey, candidateList]) => {
      const stageNameMap = {
        applied: "Applied",
        shortlisted: "Shortlisted",
        interview: "Interview",
        offerSent: "Offer Sent",
        hired: "Hired",
        rejected: "Rejected"
      };
      const stageName = stageNameMap[stageKey] || stageKey;

      candidateList.forEach(c => {
        rows.push([
          c.name || "",
          c.email || "",
          c.phone || "",
          c.location || "",
          c.score !== undefined ? `${c.score}%` : "",
          c.experience || "",
          stageName,
          c.appliedAt ? new Date(c.appliedAt).toLocaleDateString() : ""
        ]);
      });
    });

    if (rows.length === 0) {
      alert("No candidates to export.");
      return;
    }

    // Use UTF-8 Byte Order Mark (BOM) to support all accents/characters in Excel
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.map(escapeCsvValue).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const sanitizedJobTitle = (jobTitle || "Job").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    link.setAttribute("download", `${sanitizedJobTitle}-pipeline-export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [jobTitle, columns]);

  return handleExport;
}
