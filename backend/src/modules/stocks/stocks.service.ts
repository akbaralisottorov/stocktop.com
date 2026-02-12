import { Injectable, NotFoundException, ConflictException, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StocksService implements OnModuleInit {
  private readonly logger = new Logger(StocksService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Auto-seed database if empty to ensure the app is usable immediately
  async onModuleInit() {
    try {
        const count = await this.prisma.stock.count();
        if (count === 0) {
            this.logger.log('Database is empty. Seeding initial stocks...');
            const initialStocks = [
                { symbol: 'AAPL', companyName: 'Apple Inc.', exchange: 'NASDAQ', sector: 'Technology' },
                { symbol: 'NVDA', companyName: 'NVIDIA Corp', exchange: 'NASDAQ', sector: 'Technology' },
                { symbol: 'TSLA', companyName: 'Tesla Inc', exchange: 'NASDAQ', sector: 'Automotive' },
                { symbol: 'AMD', companyName: 'Advanced Micro Devices', exchange: 'NASDAQ', sector: 'Technology' },
                { symbol: 'PLTR', companyName: 'Palantir Technologies', exchange: 'NYSE', sector: 'Technology' },
                { symbol: 'MSFT', companyName: 'Microsoft Corporation', exchange: 'NASDAQ', sector: 'Technology' },
            ];

            for (const stock of initialStocks) {
                await this.prisma.stock.create({
                    data: {
                        ...stock,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                });
            }
            this.logger.log(`Seeded ${initialStocks.length} stocks successfully.`);
        }
    } catch (error) {
        this.logger.error('Failed to seed initial stocks', error);
    }
  }

  async create(createStockDto: CreateStockDto) {
    const existingStock = await this.prisma.stock.findUnique({
      where: { symbol: createStockDto.symbol },
    });

    if (existingStock) {
      throw new ConflictException(`Stock with symbol ${createStockDto.symbol} already exists`);
    }

    return this.prisma.stock.create({
      data: createStockDto,
    });
  }

  async findAll() {
    // Include latest price to make the list useful
    return this.prisma.stock.findMany({
      orderBy: { symbol: 'asc' },
      include: {
        score: {
          orderBy: { date: 'desc' },
          take: 1,
        },
        // We'll need to fetch price separately or rely on a relation if defined
        // For now, returning basic info, price jobs populate the Price table
      }
    });
  }

  async findOne(symbol: string) {
    const stock = await this.prisma.stock.findUnique({
      where: { symbol },
      include: {
        score: {
          orderBy: { date: 'desc' },
          take: 1,
        },
        recommendations: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!stock) {
      throw new NotFoundException(`Stock with symbol ${symbol} not found`);
    }

    return stock;
  }

  async update(symbol: string, updateStockDto: UpdateStockDto) {
    await this.findOne(symbol);

    return this.prisma.stock.update({
      where: { symbol },
      data: updateStockDto,
    });
  }

  async remove(symbol: string) {
    await this.findOne(symbol);

    return this.prisma.stock.delete({
      where: { symbol },
    });
  }
}
