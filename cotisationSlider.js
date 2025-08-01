
// cotisationSlider.js

function initialiserSliderCotisation() {
  const sliderBloc = document.getElementById('cotisationSliderBloc');
  const revenu = parseFloat(document.getElementById('revenu').value || 0);
  if (isNaN(revenu) || revenu <= 0) return;

  sliderBloc.innerHTML = \`
    <label for="cotisationSlider">💰 Cotisation REER manuelle :</label>
    <input type="range" id="cotisationSlider" min="0" max="100000" step="1000" value="0" />
    <span id="valeurSlider">0 $</span>
    <div id="impactSlider" style="margin-top: 1rem; font-weight: bold;"></div>
  \`;

  const slider = document.getElementById('cotisationSlider');
  const valeur = document.getElementById('valeurSlider');
  const impact = document.getElementById('impactSlider');

  slider.addEventListener('input', () => {
    const val = parseInt(slider.value);
    valeur.textContent = val.toLocaleString() + ' $';
    calculerImpactCotisation(revenu, val).then(txt => impact.innerHTML = txt);
  });
}

async function calculerImpactCotisation(revenu, cotisation) {
  const data = await fetch('tauxMarginauxCQFF.json').then(r => r.json());
  const palier = data.find(p => revenu >= p.revenuMin && revenu <= p.revenuMax);
  if (!palier) return "Données fiscales indisponibles pour ce revenu.";

  const tauxEff = palier.tauxTotal;
  const recup = cotisation * tauxEff;
  return \`
    ➤ Estimation du remboursement d'impôt : <strong>\${recup.toFixed(0).toLocaleString()} $</strong><br>
    ➤ Taux effectif marginal estimé : <strong>\${(tauxEff * 100).toFixed(1)} %</strong>
  \`;
}

export { initialiserSliderCotisation };
