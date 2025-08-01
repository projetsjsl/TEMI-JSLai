
// interpretationFiscalite.js

function genererInterpretation(resultats) {
  if (!resultats || resultats.length === 0) return;

  const bloc = document.getElementById('interpretationFiscalite');
  bloc.innerHTML = '<h2>🧾 Interprétation automatique</h2>';

  resultats.forEach(r => {
    let message = '';

    if (r.tauxMarginal > 0.55) {
      message = '⚠️ Taux marginal très élevé (> 55 %). Attention à la récupération de prestations.';
    } else if (r.tauxMarginal > 0.45) {
      message = '🔶 Taux marginal élevé (> 45 %). Les cotisations REER sont fortement rentables.';
    } else if (r.tauxMarginal > 0.30) {
      message = '🟡 Taux marginal modéré. Les cotisations offrent un bon rendement fiscal.';
    } else {
      message = '🟢 Taux marginal faible. L’impact fiscal d’une cotisation est moins significatif.';
    }

    bloc.innerHTML += `
      <div style="margin: 0.7rem 0; padding: 0.5rem; border-left: 4px solid #888;">
        <strong>Revenu :</strong> ${r.revenu.toLocaleString()} $<br>
        <strong>Cotisation :</strong> ${r.cotisation.toLocaleString()} $<br>
        <strong>Taux marginal :</strong> ${(r.tauxMarginal * 100).toFixed(1)} %<br>
        <strong>Interprétation :</strong> ${message}
      </div>
    `;
  });
}

export { genererInterpretation };
