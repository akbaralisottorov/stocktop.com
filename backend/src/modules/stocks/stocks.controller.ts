import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockEntity } from './entities/stock.entity';

@ApiTags('stocks')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new stock' })
  @ApiResponse({ status: 201, description: 'The stock has been successfully created.', type: StockEntity })
  @ApiResponse({ status: 409, description: 'Stock already exists.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stocks' })
  @ApiResponse({ status: 200, description: 'Return all stocks.', type: [StockEntity] })
  findAll() {
    return this.stocksService.findAll();
  }

  @Get(':symbol')
  @ApiOperation({ summary: 'Get a stock by symbol' })
  @ApiResponse({ status: 200, description: 'Return the stock details.', type: StockEntity })
  @ApiResponse({ status: 404, description: 'Stock not found.' })
  findOne(@Param('symbol') symbol: string) {
    return this.stocksService.findOne(symbol);
  }

  @Patch(':symbol')
  @ApiOperation({ summary: 'Update a stock' })
  @ApiResponse({ status: 200, description: 'The stock has been successfully updated.', type: StockEntity })
  @ApiResponse({ status: 404, description: 'Stock not found.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('symbol') symbol: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(symbol, updateStockDto);
  }

  @Delete(':symbol')
  @ApiOperation({ summary: 'Delete a stock' })
  @ApiResponse({ status: 200, description: 'The stock has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Stock not found.' })
  remove(@Param('symbol') symbol: string) {
    return this.stocksService.remove(symbol);
  }
}