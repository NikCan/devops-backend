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

const appStartTime = Date.now();

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

  @Get('health')
  async getHealth() {
    const uptime = Date.now() - appStartTime;
    // Симулируем "тяжелый" старт: первые 45 секунд приложение отвечает очень долго (10 секунд)
    if (uptime < 45000) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
    return { status: 'ok' };
  }

  @Get('ready')
  async getReady() {
    const uptime = Date.now() - appStartTime;

    // 1. Аналогично для ready пробы при старте
    if (uptime < 45000) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
    // 2. Симулируем временную "потерю готовности" с 60 по 100 секунду (40 секунд)
    // В это время k8s пометит под как NotReady и перестанет слать на него трафик
    else if (uptime >= 60000 && uptime < 100000) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    return { status: 'ready' };
  }
}
