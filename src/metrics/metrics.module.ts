import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { collectDefaultMetrics } from 'prom-client';

@Module({
  controllers: [MetricsController],
})
export class MetricsModule {
  constructor() {
    collectDefaultMetrics(); // CPU, RAM, event loop, GC процесса Node.js
  }
}
