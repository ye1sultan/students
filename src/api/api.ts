import { MAIN_API } from "@/constants/const";

export const login = async (username: string, password: string) => {
  const response = await fetch(`${MAIN_API}/auth/login/`, {
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

  const response = await fetch(`${MAIN_API}/auth/user/`, {
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

  const response = await fetch(`${MAIN_API}/studyplan/available-subjects/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

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

  const response = await fetch(`${MAIN_API}/studyplan/class-schedules/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

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

  const response = await fetch(`${MAIN_API}/studyplan/class-schedules/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete subject from schedule");
  }
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

  const response = await fetch(`${MAIN_API}/studyplan/class-schedules/`, {
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
  });

  if (!response.ok) {
    throw new Error("Failed to schedule class");
  }

  return response.json();
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${MAIN_API}/auth/change-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to change password");
  }

  return response.json();
};

export const changeAvatar = async (avatarFile: File) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const formData = new FormData();
  formData.append("avatar", avatarFile);

  const response = await fetch(`${MAIN_API}/auth/change-avatar/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to change avatar");
  }

  return response.json();
};

export const getSimilarSubjects = async (
  university: string,
  faculty: string,
  year: number,
  term: string
) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${MAIN_API}/studyplan/similar-subjects/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      university,
      faculty,
      year,
      term,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch similar subjects");
  }

  return response.json();
};

export const getCapacity = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const response = await fetch(`${MAIN_API}/studyplan/api/subjects/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch capacity");
  }

  const subjects = await response.json();
  return subjects.map((subject: any) => ({
    id: subject.id,
    capacity: subject.capacity,
  }));
};
