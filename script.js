
function palierQC(rev) {
  if (rev <= 49275) return 0.15;
  if (rev <= 98540) return 0.20;
  if (rev <= 119910) return 0.24;
  return 0.2575;
}
function palierFED(rev) {
  if (rev <= 55965) return 0.15;
  if (rev <= 111935) return 0.205;
  if (rev <= 173205) return 0.26;
  if (rev <= 246752) return 0.29;
  return 0.33;
}
function prestations(rev, age, enfants) {
  let psv = age >= 65 ? 8400 : 0;
  let srg = age >= 65 && rev < 21000 ? 5000 - (rev - 5000) * 0.15 : 0;
  let ace = enfants > 0 && rev < 100000 ? enfants * 6000 : 0;
  let tps = rev < 50000 ? 300 : 0;
  return Math.max(psv, 0) + Math.max(srg, 0) + Math.max(ace, 0) + tps;
}

function simulerREER() {
  const rev = parseFloat(document.getElementById("revenu").value);
  const age = parseInt(document.getElementById("age").value);
  const enfants = parseInt(document.getElementById("enfants").value);

  let labels = [], gainsNets = [];
  let bestGain = -Infinity, bestMontant = 0;
  let tableRows = "";

  for (let cotisation = 0; cotisation <= 100000; cotisation += 1000) {
    const revenuApres = Math.max(rev - cotisation, 0);
    const impotsAvant = rev * (palierQC(rev) + palierFED(rev));
    const impotsApres = revenuApres * (palierQC(revenuApres) + palierFED(revenuApres));
    const prestationsAvant = prestations(rev, age, enfants);
    const prestationsApres = prestations(revenuApres, age, enfants);

    const gainImp = impotsAvant - impotsApres;
    const gainPrest = prestationsApres - prestationsAvant;
    const gain = gainImp + gainPrest;

    if (gain > bestGain) {
      bestGain = gain;
      bestMontant = cotisation;
    }

    labels.push(cotisation);
    gainsNets.push(gain.toFixed(2));
    tableRows += `
      <tr>
        <td>${cotisation.toLocaleString()}</td>
        <td>${gainImp.toFixed(2)}</td>
        <td>${gainPrest.toFixed(2)}</td>
        <td>${gain.toFixed(2)}</td>
      </tr>`;
  }

  document.querySelector("#detailTable tbody").innerHTML = tableRows;

  const ctx = document.getElementById("graphiqueREER").getContext("2d");
  if (window.reerChart) window.reerChart.destroy();
  window.reerChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Gain fiscal net ($)",
        data: gainsNets,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Cotisation REER ($)" } },
        y: { title: { display: true, text: "Gain net ($)" } }
      }
    }
  });

  let message = `<strong>Montant optimal suggéré :</strong> ${bestMontant.toLocaleString()} $<br>`;
  message += `<strong>Gain fiscal net estimé :</strong> ${bestGain.toFixed(2)} $<br><br>`;
  message += bestGain < 2000 ? "🔴 Faible rendement fiscal." :
            bestGain < 4000 ? "🟡 Rendement modéré, à optimiser." :
            "🟢 Excellente efficacité fiscale.";

  document.getElementById("recommandation").innerHTML = `<h3>Recommandation stratégique</h3><p>${message}</p>`;
}
