import { Select } from "@radix-ui/react-select";
import { Input } from "./ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { User } from "@/types/common";

interface CreateTaskFormProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  assignedTo: number;
  setAssignedTo: Dispatch<SetStateAction<number>>;
  users: User[];
  handleCreateTask: () => void;
}

export const CreateTaskForm = ({
  assignedTo,
  description,
  handleCreateTask,
  setAssignedTo,
  setDescription,
  setStatus,
  setTitle,
  status,
  title,
  users,
}: CreateTaskFormProps) => {
  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="col-span-1"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="col-span-1"
      />
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={assignedTo.toString()}
        onValueChange={(value) => setAssignedTo(parseInt(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Assign To" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.ID} value={user.ID.toString()}>
              {user.Email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleCreateTask}
        className="bg-green-600 hover:bg-green-700 col-span-1 sm:col-span-2 md:col-span-4"
      >
        Add Task
      </Button>
    </div>
  );
};
