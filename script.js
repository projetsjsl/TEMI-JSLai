let federalPaliers = [];
let provincialPaliers = [];

async function chargerBarèmes() {
  const fed = await fetch("data/federal.json").then(res => res.json());
  const que = await fetch("data/quebec.json").then(res => res.json());
  federalPaliers = fed;
  provincialPaliers = que;
}

function calcImpot(revenu, paliers) {
  let impots = 0, revenuRestant = revenu;
  for (let i = 0; i < paliers.length; i++) {
    const palier = paliers[i];
    const precedent = i === 0 ? 0 : paliers[i - 1].plafond;
    const tranche = Math.min(revenuRestant, palier.plafond - precedent);
    if (tranche > 0) {
      impots += tranche * palier.taux;
      revenuRestant -= tranche;
    }
  }
  if (revenuRestant > 0) {
    impots += revenuRestant * paliers[paliers.length - 1].taux;
  }
  return impots;
}

function calculerNette(revenu, conjoint, enfants, etatCivil) {
  const impotFed = calcImpot(revenu, federalPaliers);
  const impotQC = calcImpot(revenu, provincialPaliers);
  const creditsBase = 16000;
  const creditsEnfants = enfants * 2500;
  const prestationTPS = revenu < 45000 ? 300 : 0;
  const allocationEnfants = enfants * 1400;
  const impots = impotFed + impotQC;
  const credits = creditsBase + creditsEnfants;
  return revenu - impots + credits + prestationTPS + allocationEnfants;
}

document.getElementById("temi-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const revenu = parseFloat(document.getElementById("revenu").value);
  const conjoint = parseFloat(document.getElementById("revenu-conjoint").value);
  const enfants = parseInt(document.getElementById("nb-enfants").value);
  const etat = document.getElementById("etat-civil").value;
  const delta = 500;

  const base = calculerNette(revenu, conjoint, enfants, etat);
  const modif = calculerNette(revenu + delta, conjoint, enfants, etat);
  const temi = ((base - modif) / delta) * 100;
  document.getElementById("temi-valeur").textContent = temi.toFixed(2);

  tracerGraphique(conjoint, enfants, etat);
});

async function tracerGraphique(conjoint, enfants, etat) {
  const labels = [], data = [];
  for (let r = 10000; r <= 100000; r += 1000) {
    const base = calculerNette(r, conjoint, enfants, etat);
    const modif = calculerNette(r + 500, conjoint, enfants, etat);
    const temi = ((base - modif) / 500) * 100;
    labels.push(r);
    data.push(parseFloat(temi.toFixed(2)));
  }

  const ctx = document.getElementById("temi-chart").getContext("2d");
  if (window.temiChart) window.temiChart.destroy();

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(79,70,229,0.3)');
  gradient.addColorStop(1, 'rgba(79,70,229,0.05)');

  window.temiChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'TEMI (%)',
        data: data,
        fill: true,
        backgroundColor: gradient,
        borderColor: '#4f46e5',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          title: { display: true, text: "TEMI (%)" },
          beginAtZero: true,
          suggestedMax: 70
        },
        x: {
          title: { display: true, text: "Revenu ($)" }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y.toFixed(2)} %`
          }
        }
      }
    }
  });
}

chargerBarèmes();
