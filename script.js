// Browser-compatible session management

// User roles
const ROLES = {
    ADMIN: 'administrator',
    TREASURER: 'bendahara',
    MEMBER: 'anggota'
};

// Current user
let currentUser = null;

const mockUsers = [
    {id: 1, username: 'admin', password: 'admin123', role: ROLES.ADMIN}
];

// Mock database for members
const mockMembers = [
    {id: 1, name: 'Member 1', payments: [false, false, false, false]}, // Payments for weeks 1-4
    {id: 2, name: 'Member 2', payments: [false, false, false, false]}
];

// Function to mark payment for a member
function markPayment(memberId, week) {
    const member = mockMembers.find(m => m.id === memberId);
    if (member) {
        member.payments[week - 1] = true; // Mark payment for the specified week
        console.log(`Payment marked for ${member.name} for week ${week}`);
    }
}

// Function to display payment status
function displayPaymentStatus() {
    mockMembers.forEach(member => {
        console.log(`Payments for ${member.name}: ${member.payments.map((p, i) => `Week ${i + 1}: ${p ? 'Paid' : 'Not Paid'}`).join(', ')}`);
    });
}

// Session management using localStorage
function createSession(userId) {
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 day session
    
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('sessionData', JSON.stringify({
        userId,
        expiresAt: expiresAt.getTime()
    }));
    return token;
}

function validateSession(token) {
    const sessionData = JSON.parse(localStorage.getItem('sessionData') || '{}');
    if (!sessionData.expiresAt || sessionData.expiresAt < Date.now()) {
        return null;
    }
    return sessionData.userId;
}

function deleteSession() {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('sessionData');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginFormElement');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (!loginForm || !usernameInput || !passwordInput) {
        console.error('Required login elements not found');
        return;
    }

    // Check for existing session
    const token = localStorage.getItem('sessionToken');
    if (token) {
        const userId = validateSession(token);
        if (userId) {
            const user = mockUsers.find(u => u.id === userId);
            if (user) {
                currentUser = user;
                showDashboard();
            }
        } else {
            deleteSession();
        }
    }

    // Login function
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        const user = mockUsers.find(u => 
            u.username === username && u.password === password
        );

        if (user) {
            createSession(user.id);
            currentUser = user;
            showDashboard();
        } else {
            alert('Username atau password salah!');
        }
    });

    // Initialize page
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        const loginContainer = document.getElementById('loginContainer');
        
        if (loadingScreen && loginContainer) {
            loadingScreen.style.display = 'none';
            loginContainer.classList.remove('hidden');
        } else {
            console.error('Required elements not found');
        }
    }, 3500);
});

// Logout function
function logout() {
    deleteSession();
    currentUser = null;
    location.reload();
}

// Dashboard functions
function showDashboard() {
    const loginContainer = document.getElementById('loginContainer');
    const appContent = document.getElementById('appContent');
    
    if (loginContainer && appContent) {
        loginContainer.classList.add('hidden');
        appContent.classList.remove('hidden');
        
        if (currentUser?.role === ROLES.ADMIN) {
            showAdminPanel();
        }
    } else {
        console.error('Dashboard elements not found');
    }
}

// Admin Panel functions
function showAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    if (!adminPanel) return;

    adminPanel.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Admin Panel</h2>
        <div class="space-y-4">
            <div class="bg-gray-700 p-4 rounded-lg">
                <h3 class="text-lg font-semibold mb-2">User Management</h3>
                <button onclick="showAddUserForm()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Add New User
                </button>
            </div>
        </div>
    `;
}

function addUser() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('newRole').value;

    // Here you would typically send this data to your server or database
    console.log(`Adding user: ${username}, Role: ${role}`);

    // Clear the form
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('newRole').value = 'administrator';

    alert('User added successfully!');
}

function showAddUserForm() {
    // Implementation for adding new users
    alert('Add User functionality will be implemented here');
}
