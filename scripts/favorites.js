async function loadFavorites() {
  const res = await fetch('/api/anime');
  if (!res.ok) {
    alert('Failed to load favorites.');
    return;
  }
  const favorites = await res.json();

  const container = document.getElementById('favorites');
  container.innerHTML = '';

  if (favorites.length === 0) {
    container.innerHTML = '<p>No favorites saved yet.</p>';
    return;
  }

  favorites.forEach(anime => {

    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
      <h3>${anime.title}</h3>
      <p><strong>Genre:</strong> ${anime.genre}</p>
    `;
    container.appendChild(card);
  });
}

window.onload = loadFavorites;
