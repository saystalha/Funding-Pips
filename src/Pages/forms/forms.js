import { traderAccounts } from "../../../database/data.js";
// DOM Elements
const cardsContainer = document.getElementById('cards-container');
const addForm = document.getElementById('add-account-form');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-account-form');
const cancelButton = document.getElementById('cancel-button');
const searchInput = document.getElementById('search-input');
const filterOptions = document.getElementById('filter-options');


// 2. Read Operation (Display Cards) & Event Listeners

function renderCards(data) {

    cardsContainer.innerHTML = '';


    const cardHTML = data.map((account) => {
        return `
            <div class="card" data-id="${account.id}">
                <div class="card-header">
                    <h3>${account.name}</h3>
                    <span class="status ${account.status.toLowerCase()}">${account.status}</span>
                </div>
                <div class="card-body">
                    <p><strong>ID:</strong> ${account.id}</p>
                    <p><strong>Balance:</strong> $${account.balance.toLocaleString()}</p>
                    <p><strong>Leverage:</strong> ${account.leverage}</p>
                    <p><strong>Target:</strong> ${account.profitTarget}%</p>
                </div>
                <div class="card-footer">
                    <button class="edit-btn" data-id="${account.id}">Edit</button>
                    <button class="delete-btn" data-id="${account.id}">Delete</button>
                </div>
            </div>
        `;
    }).join('');

    cardsContainer.innerHTML = cardHTML;

    // Attach event listeners to the dynamically created buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDelete);
    });
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', handleEdit);
    });
}

// Initial display of data
renderCards(traderAccounts);


// 3. Create Operation (Add New Object)

addForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get input values
    const nameInput = document.getElementById('name').value;
    const idInput = document.getElementById('id').value; // <-- Get ID manually
    const balanceValue = document.getElementById('balance').value;
    const profitTargetValue = document.getElementById('profitTarget').value;

    // Safely parse numbers
    const parsedID = idInput ? parseInt(idInput) : 0; // <-- Parse ID
    const parsedBalance = balanceValue ? parseInt(balanceValue) : 0;
    const parsedProfitTarget = profitTargetValue ? parseInt(profitTargetValue) : 0;

    // Basic validation
    if (!nameInput || parsedID === 0 || parsedBalance === 0 || parsedProfitTarget === 0) {
        alert("Please fill out all fields correctly. ID, Balance, and Target must be numbers greater than zero.");
        return; // Stop the function if data is incomplete
    }

    // Optional: Check for duplicate IDs before adding
    const isDuplicate = traderAccounts.some(account => account.id === parsedID);
    if (isDuplicate) {
        alert("Account ID already exists. Please enter a unique ID.");
        return;
    }

    const newAccount = {
        // Use the manually entered and parsed ID
        id: parsedID,
        name: nameInput,
        balance: parsedBalance,
        leverage: document.getElementById('leverage').value,
        profitTarget: parsedProfitTarget,
        status: document.getElementById('status').value,
    };

    // Use Array.push() to add the new object
    traderAccounts.push(newAccount);

    // Re-render the updated list
    renderCards(traderAccounts);

    // Clear the form
    addForm.reset();
});

// 4. Delete Operation

function handleDelete(event) {
    const idToDelete = parseInt(event.target.dataset.id);

    // Find the index of the object
    const index = traderAccounts.findIndex(account => account.id === idToDelete);

    if (index !== -1) {
        traderAccounts.splice(index, 1);  // ✅ remove item in place
        renderCards(traderAccounts);      // ✅ re-render UI
    }
}



// 5. Update Operation (Edit) - FULLY FUNCTIONAL

function handleEdit(event) {
    const idToEdit = parseInt(event.target.dataset.id);
    const account = traderAccounts.find(acc => acc.id === idToEdit);

    if (account) {
        document.getElementById('edit-id-hidden').value = account.id; // Store ID
        document.getElementById('edit-name').value = account.name;
        document.getElementById('edit-balance').value = account.balance;

        // This sets the correct option in the dropdown
        document.getElementById('edit-leverage').value = account.leverage;

        document.getElementById('edit-profitTarget').value = account.profitTarget;

        // This sets the correct option in the dropdown
        document.getElementById('edit-status').value = account.status;

        // Show the modal (must be styled as 'display: none' in CSS initially)
        editModal.style.display = 'block';
    }
}

cancelButton.addEventListener('click', () => {
    editModal.style.display = 'none'; // Hide modal on cancel
});

editForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const idToUpdate = parseInt(document.getElementById('edit-id-hidden').value);
    const accountIndex = traderAccounts.findIndex(account => account.id === idToUpdate);

    if (accountIndex !== -1) {
        // **UPDATE LOGIC:** This updates the object properties in the array.
        traderAccounts[accountIndex].name = document.getElementById('edit-name').value;
        traderAccounts[accountIndex].balance = parseInt(document.getElementById('edit-balance').value);
        traderAccounts[accountIndex].leverage = document.getElementById('edit-leverage').value;
        traderAccounts[accountIndex].profitTarget = parseInt(document.getElementById('edit-profitTarget').value);
        traderAccounts[accountIndex].status = document.getElementById('edit-status').value;

        renderCards(traderAccounts);
        editModal.style.display = 'none';
    }
});


// 6. Search and Filter Functionality

// Search Input Logic
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredAccounts = traderAccounts.filter(account => {
        const nameMatch = account.name.toLowerCase().includes(searchTerm);
        const idMatch = account.id.toString().includes(searchTerm);
        return nameMatch || idMatch;
    });

    renderCards(filteredAccounts);
});

// Filter Button Logic
filterOptions.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        const key = button.dataset.filterKey;
        const value = button.dataset.filterValue;

        // Visual toggle (optional but recommended)
        document.querySelectorAll('#filter-options button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter the main array
        const filteredAccounts = traderAccounts.filter(account => {
            if (key === 'accountSize') {
                return account.balance === parseInt(value);
            }
            if (key === 'profitTarget') {
                return account.profitTarget <= parseInt(value);
            }
            return account[key] === value;
        });

        renderCards(filteredAccounts);
    }
});
