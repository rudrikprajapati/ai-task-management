"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Task, User } from "@/types/common";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { TaskList } from "@/components/TaskList";
import { AIChat } from "@/components/AiChat";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [assignedTo, setAssignedTo] = useState<number>(1);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTasks(token);
    fetchUsers(token);

    const ws = new WebSocket("ws://localhost:8080/ws");
    ws.onmessage = () => fetchTasks(token);
    ws.onclose = () => console.log("WebSocket closed");
    return () => ws.close();
  }, []);

  const fetchTasks = async (token: string) => {
    const res = await axios.get("http://localhost:8080/tasks", {
      headers: { Authorization: token },
    });
    setTasks(res.data);
  };

  const fetchUsers = async (token: string) => {
    try {
      const res = await axios.get("http://localhost:8080/users", {
        headers: { Authorization: token },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await axios.post(
      "http://localhost:8080/tasks",
      { title, description, AssignedTo: assignedTo, status },
      { headers: { Authorization: token } }
    );
    fetchTasks(token);
    setTitle("");
    setDescription("");
    setStatus("pending");
    setAssignedTo(1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Task Dashboard
              </h1>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </div>

            <CreateTaskForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              status={status}
              setStatus={setStatus}
              assignedTo={assignedTo}
              setAssignedTo={setAssignedTo}
              users={users}
              handleCreateTask={handleCreateTask}
            />
            <TaskList tasks={tasks} users={users} />
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <AIChat tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
