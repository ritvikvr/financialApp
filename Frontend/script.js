const API_URL = 'http://localhost:5000'; // Adjust if your backend runs on a different port/host
const TOKEN_KEY = 'jwtToken';

// Get DOM elements
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalIncomeElem = document.getElementById('total-income');
const totalExpenseElem = document.getElementById('total-expense');
const balanceElem = document.getElementById('balance');

// Utility functions for JWT
const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// Check authentication status and render UI accordingly
const checkAuthAndRender = () => {
    if (getToken()) {
        authSection.style.display = 'none';
        appSection.style.display = 'block';
        fetchTransactions();
  } else {
        authSection.style.display = 'block';
        appSection.style.display = 'none';
    }
};

// User Registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target.elements.registerUsername.value;
    const password = e.target.elements.registerPassword.value;

    try {
        const res = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (res.ok) {
            alert('Registration successful! Please login.');
            registerForm.reset();
  } else {
            alert(data.msg || 'Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration.');
    }
});

// User Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target.elements.loginUsername.value;
    const password = e.target.elements.loginPassword.value;

    try {
        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
        if (res.ok) {
            saveToken(data.token);
            checkAuthAndRender();
            loginForm.reset();
  } else {
            alert(data.msg || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
});

// User Logout
logoutButton.addEventListener('click', () => {
    removeToken();
    checkAuthAndRender();
});

// Fetch Transactions
const fetchTransactions = async () => {
    try {
        const res = await fetch(`${API_URL}/transactions`, {
            headers: {
                'x-auth-token': getToken(),
            },
        });
        const data = await res.json();
  if (res.ok) {
            renderTransactions(data);
  } else {
            alert(data.msg || 'Failed to fetch transactions');
            if (res.status === 401) {
                removeToken();
                checkAuthAndRender();
            }
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        alert('An error occurred while fetching transactions.');
    }
};

// Add Transaction
transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = e.target.elements.description.value;
    const amount = parseFloat(e.target.elements.amount.value);
    const type = e.target.elements.type.value;
    const date = e.target.elements.date.value;

    try {
        const res = await fetch(`${API_URL}/transactions/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getToken(),
            },
            body: JSON.stringify({ description, amount, type, date }),
        });
        const data = await res.json();
  if (res.ok) {
            alert('Transaction added successfully!');
            transactionForm.reset();
            fetchTransactions();
  } else {
            alert(data.msg || 'Failed to add transaction');
        }
    } catch (error) {
        console.error('Error adding transaction:', error);
        alert('An error occurred while adding transaction.');
    }
});

// Render Transactions
const renderTransactions = (transactions) => {
    transactionList.innerHTML = '';
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.className = transaction.type === 'income' ? 'income' : 'expense';
        li.innerHTML = `
            <span>${new Date(transaction.date).toLocaleDateString()}</span>
            <span>${transaction.description}</span>
            <span>$${transaction.amount.toFixed(2)}</span>
            <button class="delete-btn" data-id="${transaction._id}">Delete</button>
        `;
        transactionList.appendChild(li);

        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    totalIncomeElem.textContent = `Total Income: $${totalIncome.toFixed(2)}`;
    totalExpenseElem.textContent = `Total Expense: $${totalExpense.toFixed(2)}`;
    balanceElem.textContent = `Balance: $${(totalIncome - totalExpense).toFixed(2)}`;

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            try {
                const res = await fetch(`${API_URL}/transactions/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': getToken(),
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    alert('Transaction deleted successfully!');
                    fetchTransactions();
                } else {
                    alert(data.msg || 'Failed to delete transaction');
                }
            } catch (error) {
                console.error('Error deleting transaction:', error);
                alert('An error occurred while deleting transaction.');
            }
        });
    });
};

// Initial check on page load
checkAuthAndRender();
