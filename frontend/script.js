function showForm(formId) {
    document.querySelectorAll('.form-switcher').forEach(form => {
        form.classList.remove('visible');
    });
    document.getElementById(formId).classList.add('visible');
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Password strength indicator for signup
document.getElementById('password').addEventListener('input', function (e) {
    const password = e.target.value;
    const strengthBar = document.getElementById('password-strength-bar');
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = 'var(--danger)';

    if (password.length === 0) return;

    let strength = 0;
    if (password.length > 7) strength += 25;
    if (password.length > 11) strength += 15;
    if (/\d/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    strength = Math.min(100, Math.max(0, strength));
    strengthBar.style.width = strength + '%';

    if (strength > 70) {
        strengthBar.style.backgroundColor = 'var(--success)';
    } else if (strength > 40) {
        strengthBar.style.backgroundColor = 'var(--warning)';
    }
});


document.getElementById('reset-password').addEventListener('input', function (e) {
    const password = e.target.value;
    const strengthBar = document.getElementById('reset-password-strength-bar');
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = 'var(--danger)';

    if (password.length === 0) return;

    let strength = 0;
    if (password.length > 7) strength += 25;
    if (password.length > 11) strength += 15;
    if (/\d/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    strength = Math.min(100, Math.max(0, strength));
    strengthBar.style.width = strength + '%';

    if (strength > 70) {
        strengthBar.style.backgroundColor = 'var(--success)';
    } else if (strength > 40) {
        strengthBar.style.backgroundColor = 'var(--warning)';
    }
});


document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    let isValid = true;

    document.querySelectorAll('#signupForm .error-message').forEach(el => {
        el.style.display = 'none';
    });


    const firstName = document.getElementById('first-name').value.trim();
    if (firstName.length < 2) {
        document.getElementById('first-name-error').textContent = 'First name must be at least 2 characters';
        document.getElementById('first-name-error').style.display = 'block';
        isValid = false;
    }

    const lastName = document.getElementById('last-name').value.trim();
    if (lastName.length < 2) {
        document.getElementById('last-name-error').textContent = 'Last name must be at least 2 characters';
        document.getElementById('last-name-error').style.display = 'block';
        isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }

    const mobile = document.getElementById('mobile').value.trim();
    if (!/^(\+91\s?|\b)?\d{10}$/.test(mobile)) {
        document.getElementById('mobile-error').textContent = 'Enter a valid 10-digit number (with or without +91)';
        document.getElementById('mobile-error').style.display = 'block';
        isValid = false;
    }

    const city = document.getElementById('city').value.trim();
    if (city.length < 2) {
        document.getElementById('city-error').textContent = 'Please enter a valid city';
        document.getElementById('city-error').style.display = 'block';
        isValid = false;
    }

    const password = document.getElementById('password').value;
    if (password.length < 8) {
        document.getElementById('password-error').textContent = 'Password must be at least 8 characters';
        document.getElementById('password-error').style.display = 'block';
        isValid = false;
    }

    const confirmPassword = document.getElementById('confirm-password').value;
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
        document.getElementById('confirm-password-error').style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    try {
        const formData = {
            firstName,
            lastName,
            email,
            mobile,
            gender: document.querySelector('input[name="gender"]:checked').value,
            city,
            role: 'employee',
            password
        };

        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });


        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: data.message || 'Account created successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                showForm('login-form');
                this.reset();
            });
        } else {
            throw new Error(data.message || 'Registration failed');
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    let isValid = true;

    document.querySelectorAll('#loginForm .error-message').forEach(el => {
        el.style.display = 'none';
    });

    const email = document.getElementById('login-email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('login-email-error').textContent = 'Please enter a valid email address';
        document.getElementById('login-email-error').style.display = 'block';
        isValid = false;
    }

    const password = document.getElementById('login-password').value;
    if (password.length < 1) {
        document.getElementById('login-password-error').textContent = 'Please enter your password';
        document.getElementById('login-password-error').style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: data.message || 'Login successful!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {

                window.location.href = '/frontend/dashboard.html';
            });
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

document.getElementById('forgotForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    document.querySelectorAll('#forgotForm .error-message').forEach(el => {
        el.style.display = 'none';
    });

    try {
        const response = await fetch('http://localhost:5000/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: data.message || 'Password reset link sent to your email!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                showForm('reset-form');
            });
        } else {
            throw new Error(data.message || 'Failed to send reset link');
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});


document.getElementById('resetForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    let isValid = true;

    document.querySelectorAll('#resetForm .error-message').forEach(el => {
        el.style.display = 'none';
    });

    const password = document.getElementById('reset-password').value;
    if (password.length < 8) {
        document.getElementById('reset-password-error').textContent = 'Password must be at least 8 characters';
        document.getElementById('reset-password-error').style.display = 'block';
        isValid = false;
    }

    const confirmPassword = document.getElementById('reset-confirm-password').value;
    if (password !== confirmPassword) {
        document.getElementById('reset-confirm-password-error').textContent = 'Passwords do not match';
        document.getElementById('reset-confirm-password-error').style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    try {
        const response = await fetch('http://localhost:5000/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                confirmPassword
            })
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: data.message || 'Password reset successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                showForm('login-form');
                this.reset();
            });
        } else {
            throw new Error(data.message || 'Password reset failed');
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
