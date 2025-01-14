const login = async (formData) => {
    const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    return response;
};

const register = async (formData) => {
    const response = await fetch("http://localhost:8080/api/v1/users/register", {
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