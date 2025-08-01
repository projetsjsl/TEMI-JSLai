
// graphique.js

import { simulerPlageCotisations } from './simulateur.js';

let chart;

async function afficherGraphiqueTEMI(revenu) {
  const resultats = await simulerPlageCotisations(revenu);

  const cotisations = resultats.map(r => r.cotisation);
  const temis = resultats.map(r => Math.round(r.temiTotal * 10000) / 100); // en %
  const gains = resultats.map(r => Math.round(r.gainNet)); // $ économisés

  const ctx = document.getElementById('graphiqueTEMI').getContext('2d');

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: cotisations,
      datasets: [
        {
          label: 'TEMI (%)',
          data: temis,
          yAxisID: 'yTEMI',
          borderWidth: 2,
          borderColor: '#007bff',
          fill: false,
        },
        {
          label: 'Gain net ($)',
          data: gains,
          yAxisID: 'yGain',
          borderWidth: 2,
          borderColor: '#28a745',
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Impact de la cotisation REER sur le TEMI et le gain fiscal net'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              return `${label}: ${context.formattedValue}${label.includes('TEMI') ? ' %' : ' $'}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Cotisation REER ($)'
          }
        },
        yTEMI: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'TEMI (%)'
          },
          min: 0,
          max: 100,
          ticks: {
            callback: (value) => value + '%'
          }
        },
        yGain: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Gain net ($)'
          },
          grid: {
            drawOnChartArea: false,
          }
        }
      }
    }
  });
}

export { afficherGraphiqueTEMI };
