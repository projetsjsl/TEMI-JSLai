
// simulateur.js

async function chargerCourbesCQFF() {
  const response = await fetch('tauxMarginauxCQFF.json');
  const data = await response.json();
  return data;
}

function interpoler(valeurs, revenus, revenu) {
  for (let i = 0; i < revenus.length - 1; i++) {
    if (revenu >= revenus[i] && revenu <= revenus[i + 1]) {
      const t = (revenu - revenus[i]) / (revenus[i + 1] - revenus[i]);
      return valeurs[i] + t * (valeurs[i + 1] - valeurs[i]);
    }
  }
  return valeurs[valeurs.length - 1]; // au-delà de la plage
}

async function calculerTEMI(revenu, cotisation) {
  const data = await chargerCourbesCQFF();
  const revenuAjuste = revenu - cotisation;

  const tauxFed = interpoler(data.taux_marginaux_federaux, data.revenus, revenuAjuste);
  const tauxQc = interpoler(data.taux_marginaux_quebec, data.revenus, revenuAjuste);
  const pertesPrest = interpoler(data.pertes_prestations, data.revenus, revenuAjuste);

  const temi = tauxFed + tauxQc + pertesPrest;

  return {
    revenu: revenu,
    cotisation: cotisation,
    revenuAjuste: revenuAjuste,
    tauxFederal: tauxFed,
    tauxQuebec: tauxQc,
    pertesPrestations: pertesPrest,
    temiTotal: temi,
    gainNet: cotisation * temi
  };
}

async function simulerPlageCotisations(revenu, maxCotisation = 100000, pas = 1000) {
  const resultats = [];
  for (let cot = 0; cot <= maxCotisation; cot += pas) {
    const r = await calculerTEMI(revenu, cot);
    resultats.push(r);
  }
  return resultats;
}

export { calculerTEMI, simulerPlageCotisations };
