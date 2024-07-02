export interface Task {
  id: number,
  name: string,
  date: string,
  priority: string,
  labels: string[] | null,
  description: string
}
