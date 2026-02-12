import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from './prisma/prisma.module';
import { StocksModule } from './modules/stocks/stocks.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ScoringModule } from './modules/scoring/scoring.module';
import { DataPipelineModule } from './modules/data-pipeline/data-pipeline.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    StocksModule,
    AnalyticsModule,
    ScoringModule,
    DataPipelineModule,
  ],
})
export class AppModule {}
