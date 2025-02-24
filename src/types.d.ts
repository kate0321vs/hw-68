export interface Task {
  title: string;
  status: boolean;
  id: string | undefined;
  name?: string;
}

export interface TaskApi {
  title: string;
  status: boolean;
}

export interface TasksListApi {
  [id: string]: Task;
}