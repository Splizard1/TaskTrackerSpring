const BASE_URL = "http://localhost:8080/api/v1/tasks";

export async function getTasks() {
    const res = await fetch(BASE_URL);
    return res.json();
}

export async function createTask(payload) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return res.json();
}

export async function deleteTask(id) {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}

// ✅ Make sure this exists
export async function updateTask(id, payload) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return res.json();
}
