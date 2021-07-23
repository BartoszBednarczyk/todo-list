import { Task } from './task';

export interface IBoardContent {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}
