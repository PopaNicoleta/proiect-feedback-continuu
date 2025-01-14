const fetchActivity = async (id) => {
    const response = await fetch(`http://localhost:8080/api/v1/activities?id=${id}`);
    const data = await response.json();
    return data.activities[0];
};

export {fetchActivity};