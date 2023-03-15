export const required = (value) => {
    if (!value.toString().trim().length) {
        // We can return string or jsx as the 'error' prop for the validated Component
        return <span className="text-danger">This field is required</span>;
    }
};

export const email = (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return <span className="text-danger">Invalid email format</span>;
    }
};

export const password = (value) => {
    if (value.length < 6) {
        return <span className="text-danger">Password must be at least 6 characters</span>;
    }
};

export const confirmPassword = (passwordValue) => (value) => {
    if (value !== passwordValue) {
        return <span className="text-danger">Passwords do not match</span>;
    }
};
