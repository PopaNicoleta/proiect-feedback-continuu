const API_URL = import.meta.env.VITE_API_URL;

const login = async (formData) => {
    const response = await fetch(`${API_URL}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    return response;
};

const register = async (formData) => {
    const response = await fetch(`${API_URL}/api/v1/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
    
    return response;
}

export {
    login,
    register
};