import {useEffect, useState} from "react";
import { getTasks, createTask, deleteTask, updateTask } from "./taskApi";
import "./App.css";

const STATUS_OPTIONS = ["OPEN", "COMPLETE"];
const PRIORITY_OPTIONS = ["HIGH", "MEDIUM", "LOW"];

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("OPEN");
    const [priority, setPriority] = useState("MEDIUM");
    const [darkMode, setDarkMode] = useState(true);

    // Load tasks from backend
    async function loadTasks() {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            console.error("Failed to load tasks:", err);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    // Handle task creation
    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            title,
            description: description,
            dueDate: dueDate || null,
            status,
            priority,
        };
        try {
            await createTask(payload);
            setTitle("");
            setDescription("");
            setDueDate("");
            setStatus("OPEN");
            setPriority("MEDIUM");
            loadTasks();
        } catch (err) {
            console.error("Failed to create task:", err);
        }
    }

    // Handle task deletion
    async function handleDelete(id) {
        try {
            await deleteTask(id);
            loadTasks();
        } catch (err) {
            console.error("Failed to delete task:", err);
        }
    }// Start editing a task
    function startEdit(id) {
        setTasks(tasks.map(t => t.id === id ? {...t, editing: true} : t));
    }

// Cancel editing
    function cancelEdit(id) {
        loadTasks(); // reload tasks from backend
    }

// Update local field while editing
    function updateTaskField(id, field, value) {
        setTasks(tasks.map(t => t.id === id ? {...t, [field]: value} : t));
    }

    async function saveTask(id) {
        const task = tasks.find(t => t.id === id);
        const payload = {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate || null,
            status: task.status,
            priority: task.priority
        };

        try {
            await updateTask(id, payload);
            loadTasks();
        } catch (err) {
            console.error("Failed to update task:", err);
        }
    }


    return (
        <div className={`app-wrapper ${darkMode ? "dark" : "light"}`}>
            <div className="app-card">
                {/* Dark/Light Mode Toggle */}
                <div className="theme-toggle">
                    <button type="button" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </button>
                </div>


                <h1>Task Manager</h1>

                {/* Task Creation Form */}
                <form className="task-form" onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <div className="select-row">
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            {PRIORITY_OPTIONS.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Add Task</button>
                </form>

                {/* Task List */}
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task.id} className="task-item">
                            {task.editing ? (
                                <>
                                    <input
                                        value={task.title}
                                        onChange={(e) => updateTaskField(task.id, "title", e.target.value)}
                                    />
                                    <input
                                        value={task.description}
                                        onChange={(e) => updateTaskField(task.id, "description", e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        value={task.dueDate || ""}
                                        onChange={(e) => updateTaskField(task.id, "dueDate", e.target.value)}
                                    />
                                    <select
                                        value={task.status}
                                        onChange={(e) => updateTaskField(task.id, "status", e.target.value)}
                                    >
                                        {STATUS_OPTIONS.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={task.priority}
                                        onChange={(e) => updateTaskField(task.id, "priority", e.target.value)}
                                    >
                                        {PRIORITY_OPTIONS.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                    <button onClick={() => saveTask(task.id)}>Save</button>
                                    <button onClick={() => cancelEdit(task.id)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <div className="task-header">
                                        <strong>{task.title}</strong>
                                        <span>[{task.status} / {task.priority}]</span>
                                    </div>
                                    <div className="task-desc">{task.description}</div>
                                    {task.dueDate && <div className="task-due">Due: {task.dueDate}</div>}
                                    <button onClick={() => startEdit(task.id)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                                </>
                            )}
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
