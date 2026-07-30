import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/todos')
  getTodos() {
    return this.appService.getTodos();
  }

  @Post('api/todos')
  createTodo(@Body('title') title: string) {
    return this.appService.createTodo(title);
  }

  @Patch('api/todos/:id')
  toggleTodo(@Param('id') id: string) {
    return this.appService.toggleTodo(+id);
  }

  @Delete('api/todos/:id')
  deleteTodo(@Param('id') id: string) {
    return this.appService.deleteTodo(+id);
  }
}
