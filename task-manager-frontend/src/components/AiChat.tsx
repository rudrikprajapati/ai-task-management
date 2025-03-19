"use client";

import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Task } from "@/types/common";

interface AIChatProps {
  tasks: Task[];
}

export const AIChat = ({ tasks }: AIChatProps) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggest = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/tasks/suggest",
        {
          description: input,
          tasks: tasks,
        },
        { headers: { Authorization: token } }
      );
      setSuggestions(res.data.suggestions);
      setInput("");
    } catch (error) {
      console.error("Error getting suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        AI Suggestions
      </h2>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task description for suggestions"
        className="mb-4"
        disabled={isLoading}
      />
      <Button
        onClick={handleSuggest}
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={isLoading}
      >
        {isLoading ? "AI is generating suggestions..." : "Get AI Suggestions"}
      </Button>
      {suggestions && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <ReactMarkdown className="text-gray-700 whitespace-pre-wrap overflow-hidden">
            {suggestions}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};
