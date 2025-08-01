
// modeSimplifie.js

function activerModeSimplifie() {
  document.body.classList.add('mode-simplifie');

  const sectionsAvancees = document.querySelectorAll('.section-avancee, .admin-only, #parametresAvances');
  sectionsAvancees.forEach(el => el.style.display = 'none');

  const simplifieBloc = document.getElementById('modeSimplifieTexte');
  simplifieBloc.innerHTML = \`
    <div style="background: #eef; padding: 1rem; border-radius: 5px;">
      <h2>Vue simplifiée activée</h2>
      <p>Seules les données essentielles sont affichées. Pour revenir à la vue complète, rechargez la page.</p>
    </div>
  \`;
}

export { activerModeSimplifie };
