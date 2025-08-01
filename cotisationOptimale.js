
// cotisationOptimale.js

function trouverCotisationOptimale(resultats) {
  if (!resultats || resultats.length === 0) return;

  const meilleur = resultats.reduce((max, r) => r.temiTotal > max.temiTotal ? r : max, resultats[0]);

  const bloc = document.getElementById('cotisationOptimale');
  bloc.innerHTML = `
    <h2>🎯 Cotisation optimale REER</h2>
    <p>Pour un revenu de <strong>${meilleur.revenu.toLocaleString()} $</strong>, la cotisation optimale est estimée à :</p>
    <div style="font-size: 1.8rem; font-weight: bold; margin: 0.5rem 0;">
      ${meilleur.cotisation.toLocaleString()} $
    </div>
    <p>Cette cotisation maximise votre TEMI à <strong>${(meilleur.temiTotal * 100).toFixed(2)} %</strong>.</p>
  `;
}

export { trouverCotisationOptimale };
