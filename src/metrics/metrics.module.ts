import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { collectDefaultMetrics } from 'prom-client';

@Module({
  controllers: [MetricsController],
})
export class MetricsModule {
  constructor() {
    const globalRef = global as unknown as {
      defaultMetricsRegistered?: boolean;
    };
    if (!globalRef.defaultMetricsRegistered) {
      collectDefaultMetrics(); // CPU, RAM, event loop, GC процесса Node.js
      globalRef.defaultMetricsRegistered = true;
    }
  }
}
