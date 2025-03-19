import { Task, User } from "@/types/common";

export const TaskList = ({
  tasks,
  users,
}: {
  tasks: Task[];
  users: User[];
}) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">
          No tasks yet. Add one above!
        </p>
      ) : (
        tasks.map((task: Task) => (
          <div
            key={task.ID}
            className="bg-gray-50 border border-gray-200 rounded-md p-4 hover:shadow-md transition duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {task.Title}
            </h3>
            <p className="text-gray-600">
              {task.Description || "No description"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Status:{" "}
              <span
                className={`${
                  task.Status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                } font-medium`}
              >
                {task.Status}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Assigned To:{" "}
              {users.find((u) => u.ID === task.AssignedTo)?.Email ?? "Unknown"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
