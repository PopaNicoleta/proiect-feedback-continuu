const joinActivity = async (activityCode) => {
    if (activityCode !== "") {
        const response = await fetch(`http://localhost:8080/api/v1/activities/join`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ activityCode }),
        });

        return response;
    }
}

export {joinActivity}