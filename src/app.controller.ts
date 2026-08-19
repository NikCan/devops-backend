import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

const appStartTime = Date.now();
const SIMULATE_FAILURES = process.env.SIMULATE_PROBE_FAILURES !== 'false';

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
  getHealth() {
    const uptime = Date.now() - appStartTime;

    // Мягкий старт: первые 15 секунд сервис сообщает о прогреве (HTTP 503)
    if (SIMULATE_FAILURES && uptime < 15000) {
      throw new HttpException(
        { status: 'warming_up', uptimeMs: uptime },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return { status: 'ok', uptimeMs: uptime };
  }

  @Get('ready')
  getReady() {
    const uptime = Date.now() - appStartTime;

    // 1. Не готов во время стартового прогрева (первые 15 секунд)
    if (SIMULATE_FAILURES && uptime < 15000) {
      throw new HttpException(
        { status: 'starting', uptimeMs: uptime },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    // 2. Короткая симуляция временной потери готовности с 30-й по 45-ю секунду (15 секунд)
    if (SIMULATE_FAILURES && uptime >= 30000 && uptime < 45000) {
      throw new HttpException(
        { status: 'temporarily_unavailable', uptimeMs: uptime },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return { status: 'ready', uptimeMs: uptime };
  }
}
