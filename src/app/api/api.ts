export const login = async (username: string, password: string) => {
  const response = await fetch("http://192.168.0.102:8000/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const getUser = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch("http://192.168.0.102:8000/auth/user/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};

export const getSubjects = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(
    "http://192.168.0.102:8000/studyplan/available-subjects/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch subjects");
  }

  return response.json();
};

export const getSchedule = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(
    "http://192.168.0.102:8000/studyplan/class-schedules/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch subjects");
  }

  return response.json();
};

export const deleteSubjectFromSchedule = async (id: number) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(
    `http://192.168.0.102:8000/studyplan/class-schedules/${id}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete subject from schedule");
  }

  return response.json();
};

export const scheduleClass = async (
  semester_id: number,
  subject_semester_id: number,
  day_of_week: string,
  start_time: string,
  end_time: string
) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(
    "http://192.168.0.102:8000/studyplan/class-schedules/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schedules: [
          {
            semester_id,
            subject_semester_id,
            day_of_week,
            start_time,
            end_time,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to schedule class");
  }

  return response.json();
};
