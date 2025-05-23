let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const closeErrorModal = document.querySelector('.close-modal');

function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = 'flex';
}

closeErrorModal.addEventListener('click', () => {
    errorModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === errorModal) {
        errorModal.style.display = 'none';
    }
});

function updateBalance() {
    const balance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    
    document.getElementById('balanceAmount').textContent = balance.toFixed(2);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction(type) {
    const amountInput = document.getElementById('amountInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value.trim();

    if (!amount || amount <= 0) {
        showError('Введите корректную сумму');
        return;
    }

    if (type === 'expense' && !description) {
        showError('Укажите причину расхода');
        return;
    }

    const transaction = {
        type,
        amount,
        date: new Date().toLocaleString(),
        description: type === 'income' ? new Date().toLocaleString() : description
    };

    transactions.push(transaction);
    
    amountInput.value = '';
    descriptionInput.value = '';
    updateBalance();
    renderTransactions();
}

function resetData() {
    resetModal.style.display = 'flex';
}

function renderTransactions() {
    const container = document.getElementById('transactions');
    container.innerHTML = transactions.map((transaction, index) => `
        <div class="transaction ${transaction.type}">
            <div class="transaction-info">
                <span>${transaction.type === 'income' ? 'Доход' : 'Расход'}</span>
                <span>${transaction.description}</span>
            </div>
            <span class="transaction-amount">${transaction.type === 'income' ? '+' : '-'} ${transaction.amount.toFixed(2)} ₽</span>
            <span class="delete-transaction-btn" data-index="${index}">&times;</span>
        </div>
    `).join('');
}

// Delete transaction by index and update UI
function deleteTransaction(index) {
    if (index >= 0 && index < transactions.length) {
        transactions.splice(index, 1);
        updateBalance();
        renderTransactions();
    }
}

// Event delegation for delete buttons
document.getElementById('transactions').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-transaction-btn')) {
        const index = parseInt(event.target.getAttribute('data-index'), 10);
        deleteTransaction(index);
    }
});

// Инициализация
updateBalance();
renderTransactions();