const API_URL = import.meta.env.VITE_API_URL;

const joinActivity = async (activityCode) => {
    if (activityCode !== "") {
        const response = await fetch(`${API_URL}/api/v1/activities/join`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ activityCode }),
        });

        return response;
    }
}

export {joinActivity}