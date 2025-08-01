
// interpretation.js

function analyserTEMI(revenu, resultats) {
  const maxGain = Math.max(...resultats.map(r => r.gainNet));
  const opti = resultats.find(r => r.gainNet === maxGain);
  const cotisationIdeale = opti ? opti.cotisation : 0;
  const temi = opti ? (opti.temiTotal * 100).toFixed(1) : 'N/A';

  const message = `
    Pour un revenu brut de ${revenu.toLocaleString()} $, la cotisation REER optimale semble se situer autour de
    ${cotisationIdeale.toLocaleString()} $. Elle permet un gain fiscal net maximal estimé à ${Math.round(maxGain).toLocaleString()} $,
    avec un taux effectif marginal d’imposition (TEMI) d’environ ${temi} % sur ce montant.
  `;

  document.getElementById('zoneInterpretation').textContent = message;
}

export { analyserTEMI };
