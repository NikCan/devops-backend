import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getTodos(): Promise<Todo[]> {
    return this.todoRepository.find({ order: { id: 'DESC' } });
  }

  async createTodo(title: string): Promise<Todo> {
    const todo = this.todoRepository.create({ title });
    return this.todoRepository.save(todo);
  }

  async toggleTodo(id: number): Promise<Todo | null> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) return null;
    todo.completed = !todo.completed;
    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
