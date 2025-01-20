const API_URL = import.meta.env.VITE_API_URL;

const fetchActivityFeedback = async (activityId = null, extraUrl = "") => {
    const response = await fetch(
        `${API_URL}/api/v1/feedback?activityId=${activityId}${extraUrl}`,
        {
            method: "GET",
        }
    );

    return response;
}

const postFeedback = async (feedbackData) => {
    const result = await fetch(`${API_URL}/api/v1/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
    });
    return result;
}

export {
    fetchActivityFeedback,
    postFeedback
};