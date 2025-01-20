const API_URL = import.meta.env.VITE_API_URL;

const fetchActivity = async (id) => {
    const response = await fetch(`${API_URL}/api/v1/activities?id=${id}`);
    const data = await response.json();
    return data.activities[0];
};

export {fetchActivity};