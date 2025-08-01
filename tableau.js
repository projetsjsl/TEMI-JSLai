
// tableau.js

import { simulerPlageCotisations } from './simulateur.js';

async function afficherTableauTEMI(revenu) {
  const resultats = await simulerPlageCotisations(revenu);

  const table = document.getElementById('tableauResultats');
  table.innerHTML = '';

  // En-têtes
  const entete = document.createElement('tr');
  ['Cotisation ($)', 'Revenu ajusté', 'TEMI (%)', 'Gain net ($)'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    entete.appendChild(th);
  });
  table.appendChild(entete);

  // Lignes
  resultats.forEach(r => {
    const tr = document.createElement('tr');

    const celluleCotisation = document.createElement('td');
    celluleCotisation.textContent = r.cotisation.toLocaleString();
    tr.appendChild(celluleCotisation);

    const celluleRevenu = document.createElement('td');
    celluleRevenu.textContent = r.revenuAjuste.toLocaleString();
    tr.appendChild(celluleRevenu);

    const celluleTEMI = document.createElement('td');
    celluleTEMI.textContent = (r.temiTotal * 100).toFixed(2) + ' %';
    tr.appendChild(celluleTEMI);

    const celluleGain = document.createElement('td');
    celluleGain.textContent = Math.round(r.gainNet).toLocaleString() + ' $';
    tr.appendChild(celluleGain);

    table.appendChild(tr);
  });
}

export { afficherTableauTEMI };
