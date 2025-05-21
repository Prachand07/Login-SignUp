const userAvatar = document.getElementById('userAvatar');
const userDropdown = document.getElementById('userDropdown');
const dropdownLogoutBtn = document.getElementById('dropdown-logout-btn');
const usersTableBody = document.getElementById('usersTableBody');

userAvatar.addEventListener('click', () => {
    userDropdown.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('show');
    }
});

function handleLogout() {
    window.location.href = '/frontend/index.html';
}

dropdownLogoutBtn.addEventListener('click', handleLogout);

async function fetchUsers() {
    try {
        const response = await fetch('https://login-signup-iplp.onrender.com/api/dashboard');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        displayUsers(users);

        if (users.length > 0) {
            const currentUser = users[0];
            userAvatar.textContent = `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        usersTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--danger);">Failed to load users. Please try again.</td></tr>`;
    }
}

function displayUsers(users) {
    if (users.length === 0) {
        usersTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No users found</td></tr>`;
        return;
    }

    usersTableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never logged in'}</td>
            <td>${user.role}</td>
            <td>${user.city}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});
