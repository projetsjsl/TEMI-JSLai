
// scoreFiscal.js

function calculerScoreFiscal(resultats) {
  const maxGain = Math.max(...resultats.map(r => r.gainNet));
  const maxTEMI = Math.max(...resultats.map(r => r.temiTotal));

  const score = Math.round((maxGain / 10000) * (maxTEMI * 100) / 10);

  const interpretation = score >= 80
    ? '🟢 Excellent rendement fiscal des cotisations dans votre situation'
    : score >= 60
    ? '🟡 Bon rendement fiscal mais quelques optimisations possibles'
    : score >= 40
    ? '🟠 Rendement fiscal modéré – à surveiller'
    : '🔴 Faible rendement fiscal – attention à la planification';

  const bloc = document.getElementById('scoreFiscal');
  bloc.innerHTML = `
    <h2>📊 Score de performance fiscale</h2>
    <div style="font-size: 1.5rem; font-weight: bold;">Score : ${score} / 100</div>
    <p>${interpretation}</p>
  `;
}

export { calculerScoreFiscal };
