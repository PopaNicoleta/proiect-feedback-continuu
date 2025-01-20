const API_URL = import.meta.env.VITE_API_URL;

const generateCode = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

const updateActivity = async (updatedActivity) => {
    await fetch(`${API_URL}/api/v1/activities`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedActivity)
    });
}

const createActivity = async (activityData, professor_id, access_code) => {
    await fetch(`${API_URL}/api/v1/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ ...activityData, professor_id, access_code }])
    });
}

const deleteActivity = async (activityId) => {
    const result = await fetch(`${API_URL}/api/v1/activities?id=${activityId}`, {
        method: "DELETE"
    });
}

const getActivityList = async (userEmail) => {
    const result = await fetch(`${API_URL}/api/v1/activities?email=${userEmail}`, {
        method: "GET"
    });
    const data = await result.json();
    return data.activities;
}

const getActivityItem = async (activityId) => {
    const response = await fetch(`${API_URL}/api/v1/activities?id=${activityId}`, {
        method: 'GET',
    });
    if (response.ok) {
        const data = await response.json();
        return data.activities[0];
    }
};

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const formatISOString = (isoString) => {
    const date = new Date(isoString);
    return formatDate(date);
};

const showTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (
        start.getDate() === end.getDate() &&
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear()
    ) {
        //daca sunt in aceeasi zi
        const datePart = formatDate(start).split(' ')[0];
        const startTimePart = formatDate(start).split(' ')[1];
        const endTimePart = formatDate(end).split(' ')[1];
        return `${datePart} ${startTimePart}-${endTimePart}`;
    } else {
        //daca sunt in zile diferite
        return `${formatDate(start)} - ${formatDate(end)}`;
    }
};

const validateActivity = (formValues, setErrors) => {
    const newErrors = {};
    if (!formValues.title || formValues.title.trim().length < 3) {
      newErrors.title = "Titlul trebuie să aibă cel puțin 3 caractere.";
    }
    if (!formValues.start_time) {
      newErrors.start_time = "Ora de început este obligatorie.";
    }
    if (!formValues.end_time) {
      newErrors.end_time = "Ora de sfârșit este obligatorie.";
    }
    if (formValues.start_time && formValues.end_time) {
      if (new Date(formValues.start_time) >= new Date(formValues.end_time)) {
        newErrors.start_time = "Ora de început trebuie să fie înainte de ora de sfârșit.";
        newErrors.end_time = "Ora de sfârșit trebuie să fie după ora de început.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}

export {
    generateCode,
    updateActivity,
    createActivity,
    deleteActivity,
    getActivityList,
    showTime,
    getActivityItem,
    formatISOString,
    validateActivity
}