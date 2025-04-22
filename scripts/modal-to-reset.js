const resetModal = document.getElementById('resetModal');
const modalYesBtn = document.getElementById('modalYesBtn');
const modalNoBtn = document.getElementById('modalNoBtn');

function resetData() {
    resetModal.style.display = 'flex';
}

modalYesBtn.addEventListener('click', () => {
    transactions = [];
    localStorage.removeItem('transactions');
    updateBalance();
    renderTransactions();
    resetModal.style.display = 'none';
});

modalNoBtn.addEventListener('click', () => {
    resetModal.style.display = 'none';
});