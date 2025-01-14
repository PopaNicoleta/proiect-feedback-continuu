const fetchActivityFeedback = async (activityId = null, extraUrl = "") => {
    const response = await fetch(
        `http://localhost:8080/api/v1/feedback?activityId=${activityId}${extraUrl}`,
        {
            method: "GET",
        }
    );

    return response;
}

const postFeedback = async (feedbackData) => {
    const result = await fetch('http://localhost:8080/api/v1/feedback', {
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