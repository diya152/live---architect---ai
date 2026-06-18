import jsPDF from "jspdf";
import type { UIMessage } from "ai";

function messageText(m: UIMessage): string {
  return m.parts
    .map((p: any) => (p.type === "text" ? p.text : ""))
    .join("")
    .trim();
}

function safeFilename(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "conversation"
  );
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportThreadAsCSV(
  title: string,
  messages: UIMessage[],
  createdAt: Date = new Date(),
) {
  const rows = [["index", "role", "content"]];
  messages.forEach((m, i) => {
    rows.push([String(i + 1), m.role, messageText(m)]);
  });
  const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n");
  const stamp = createdAt.toISOString().slice(0, 10);
  download(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
    `${stamp}-${safeFilename(title)}.csv`,
  );
}

export function exportThreadAsPDF(
  title: string,
  messages: UIMessage[],
  createdAt: Date = new Date(),
) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(title || "Conversation", margin, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(
    `Exported ${createdAt.toLocaleString()} · ${messages.length} messages`,
    margin,
    y,
  );
  y += 20;
  doc.setTextColor(0);

  for (const m of messages) {
    const text = messageText(m);
    if (!text) continue;

    ensureSpace(28);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(m.role === "user" ? 30 : 80);
    doc.text(m.role === "user" ? "You" : "Twin", margin, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(20);
    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    const lineHeight = 14;
    for (const line of lines) {
      ensureSpace(lineHeight);
      doc.text(line, margin, y);
      y += lineHeight;
    }
    y += 10;
  }

  const stamp = createdAt.toISOString().slice(0, 10);
  doc.save(`${stamp}-${safeFilename(title)}.pdf`);
}