export type Task = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Title: string;
  Description: string;
  AssignedTo: number;
  Status: string;
  CreatedBy: number;
};

export type User = {
  ID: number;
  Email: string;
};
