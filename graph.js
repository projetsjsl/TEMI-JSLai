const ctx = document.getElementById('temiChart').getContext('2d');
const temiChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Retraite', 'Fiscalité', 'Placements', 'Succession', 'Assurance', 'Budget', 'Immobilier'],
    datasets: [{
      label: 'Score TEMI',
      data: [80, 70, 85, 60, 75, 90, 65],
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
      borderColor: 'rgba(33, 150, 243, 1)',
      pointBackgroundColor: '#2196F3'
    }]
  },
  options: {
    scales: {
      r: {
        angleLines: { color: '#333' },
        grid: { color: '#444' },
        pointLabels: { color: '#ccc' }
      }
    },
    plugins: {
      legend: { labels: { color: '#ccc' } }
    }
  }
});
