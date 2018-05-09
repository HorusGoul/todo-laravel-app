import ApiService from "@/ApiService";

export interface ITask {
  id?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
  content: string;
  date?: string;
  completed?: boolean;
}

class TodoService {
  public async getAll(): Promise<ITask[]> {
    const res = await ApiService.get('task');
    return res.data;
  }

  public async delete(task: ITask) {
    await ApiService.delete(`task/${task.id}`);
  }

  public async update(task: ITask) {
    await ApiService.put(`task/${task.id}`, task);
  }

  public async getOne(taskId: number): Promise<ITask> {
    const res = await ApiService.get(`task/${taskId}`);
    return res.data;
  }

  public async create(task: ITask): Promise<ITask> {
    const res = await ApiService.post('task', task);
    return res.data;
  }
}

export default new TodoService();
