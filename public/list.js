// List page - Display and manage aliens

const aliensGrid = document.getElementById('aliens-grid');
const loadingDiv = document.getElementById('loading');
const messageDiv = document.getElementById('message');
const createForm = document.getElementById('create-form');

// Fetch and display all aliens when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadAliens();
    createForm.addEventListener('submit', handleCreate);
});

// Handle form submission
async function handleCreate(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const race = document.getElementById('race').value.trim();
    const planet = document.getElementById('planet').value.trim();
    const abilitiesInput = document.getElementById('abilities').value.trim();
    const abilities = abilitiesInput.split(',').map(a => a.trim()).filter(a => a);

    if (abilities.length < 2) {
        showMessage('Please enter at least 2 abilities', 'error');
        return;
    }

    try {
        const response = await fetch('/api/aliens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, race, planet, abilities })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to create alien');
        }

        showMessage('Alien created successfully!', 'success');
        createForm.reset();
        loadAliens();
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    }
}

// Show message
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    setTimeout(() => messageDiv.className = 'message', 3000);
}

// Fetch all aliens from API
async function loadAliens() {
    try {
        loadingDiv.style.display = 'block';

        const response = await fetch('/api/aliens');

        if (!response.ok) {
            throw new Error('Failed to fetch aliens');
        }

        const aliens = await response.json();

        loadingDiv.style.display = 'none';

        if (aliens.length === 0) {
            aliensGrid.innerHTML = '<p class="empty-state">No aliens found. Create one above!</p>';
        } else {
            displayAliens(aliens);
        }
    } catch (error) {
        loadingDiv.style.display = 'none';
        showMessage('Error loading aliens: ' + error.message, 'error');
    }
}

// Display aliens as cards
function displayAliens(aliens) {
    aliensGrid.innerHTML = '';

    aliens.forEach(alien => {
        const card = createAlienCard(alien);
        aliensGrid.appendChild(card);
    });
}

// Create a single alien card element
function createAlienCard(alien) {
    const card = document.createElement('div');
    card.className = 'alien-card';

    // Format date
    const date = new Date(alien.dateOfDiscovery);
    const formattedDate = date.toLocaleDateString();

    // Create abilities list
    const abilitiesList = alien.abilities
        .map(ability => `<li>${ability}</li>`)
        .join('');

    card.innerHTML = `
        <h3>${alien.name}</h3>
        <p class="alien-info"><strong>Race:</strong> ${alien.race}</p>
        <p class="alien-info"><strong>Planet:</strong> ${alien.planet}</p>
        <p class="alien-info"><strong>Discovered:</strong> ${formattedDate}</p>
        <p class="alien-info"><strong>Abilities:</strong></p>
        <ul class="abilities-list">
            ${abilitiesList}
        </ul>
        <button class="delete-btn" data-id="${alien._id}">Delete</button>
    `;

    // Add delete button event listener
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteAlien(alien._id, alien.name));

    return card;
}

// Delete an alien
async function deleteAlien(id, name) {
    if (!confirm(`Are you sure you want to delete ${name}?`)) {
        return;
    }

    try {
        const response = await fetch(`/api/aliens/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to delete alien');
        }

        showMessage('Alien deleted', 'success');
        loadAliens();
    } catch (error) {
        showMessage('Error deleting alien: ' + error.message, 'error');
    }
}
