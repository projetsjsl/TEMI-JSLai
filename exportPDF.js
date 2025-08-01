
// exportPDF.js
import jsPDF from 'jspdf';

function exportPDF(resultats) {
  if (!resultats || resultats.length === 0) return;

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("📄 Rapport REER-TEMI — Simulation personnalisée", 14, 20);

  let y = 30;

  resultats.slice(0, 10).forEach((r, i) => {
    doc.setFontSize(11);
    doc.text(`Revenu : ${r.revenu.toLocaleString()} $`, 14, y);
    doc.text(`Cotisation : ${r.cotisation.toLocaleString()} $`, 70, y);
    doc.text(`Taux marginal : ${(r.tauxMarginal * 100).toFixed(1)} %`, 140, y);
    doc.text(`TEMI : ${(r.temiTotal * 100).toFixed(2)} %`, 14, y + 6);
    y += 14;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save('simulation_REER_TEMI.pdf');
}

export { exportPDF };
