async function getRecommendations() {
  const genre = document.getElementById('genre-select').value;
  const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genre}&limit=25`);
  const data = await response.json();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const shuffled = data.data.sort(() => 0.5 - Math.random());
  const selection = shuffled.slice(0, 25);

  const chartLabels = [];
  const chartScores = [];

  selection.forEach(anime => {
    const block = `
      <div class="anime-card" data-aos="fade-up">
        <h3>${anime.title}</h3>
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" width="150">
        <p><strong>Score:</strong> ${anime.score ?? 'N/A'}</p>
        <p><strong>Genres:</strong> ${anime.genres.map(g => g.name).join(', ')}</p>
        <p>${anime.synopsis?.slice(0, 250) ?? 'No synopsis available...'}...</p>
        <a href="${anime.url}" target="_blank">More Info</a>
        <button onclick="saveToFavorites('${anime.title.replace(/'/g, "\\'")}', '${anime.genres.map(g => g.name).join(', ')}')">Save to Favorites</button>
      </div>
    `;
    resultsDiv.innerHTML += block;

    if (anime.score) {
      chartLabels.push(anime.title);
      chartScores.push(anime.score);
    }
  });

  renderChart(chartLabels, chartScores);
}

function renderChart(labels, scores) {
  const chartSection = document.getElementById('chart-section');
  chartSection.innerHTML = `
    <div class="chart-wrapper">
      <canvas id="ratingChart"></canvas>
    </div>
  `;

  const ctx = document.getElementById('ratingChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Anime Score',
        data: scores,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 10
        }
      }
    }
  });
}

async function saveToFavorites(title, genre) {
  try {
    const response = await fetch('/api/anime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, genre })
    });

    if (response.ok) {
      alert('Anime saved to favorites!');
    } else {
      alert('Failed to save anime.');
    }
  } catch (error) {
    console.error('Error saving to favorites:', error);
    alert('An error occurred while saving.');
  }
}

// Do NOT run automatically on page load
// window.onload = getRecommendations;
