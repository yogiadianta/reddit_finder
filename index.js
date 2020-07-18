import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form event listener submit
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get search term
  const searchTerm = searchInput.value;
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit').value;
  // Check input
  if (searchTerm === '') {
    // Show message
    showMessage('Please add a search term', 'alert-danger');
  }

  // Clear Input
  searchInput.value = '';

  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    console.log(results);
    let output = '<div class="card-columns">';
    // Loop through posts
    results.forEach((post) => {
      // Check for Image
      let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';

      output += `
      <div class="card">
        <img class="card-img-top" src="${image}" alt="Card Image">
        <div class="card-body">
            <h5 class="card-title">${truncateText(post.title, 50)}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${
              post.url
            }" target="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class="badge badge-secondary">Subreddit: ${
              post.subreddit
            }</span>
            <span class="badge badge-dark">Score: ${post.score}</span>
        </div>
      </div>
        `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });
});

// Show message
function showMessage(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add class
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const searchContainer = document.getElementById('search-container');
  // Get search
  const search = document.getElementById('search');

  // Insert the message
  searchContainer.insertBefore(div, search);

  // Timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Truncate Text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened) + ' ...';
}
