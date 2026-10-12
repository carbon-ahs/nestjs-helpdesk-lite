import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { Ticket } from './ticket.interface.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { FilterTicketQueryDto } from './dto/filter-ticket-query.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) {}
  // @Get()
  // findAll(
  //   @Query('status') status?: Ticket['status'],
  //   @Query('priority') priority?: Ticket['priority'],
  // ) {
  //   return this.ticketService.findAll(status, priority);
  // }

  // there is no query param name. if not provided, you can get full query object.
  @Get()
  findAll(@Query() filters: FilterTicketQueryDto) {
    return this.ticketService.findAll(filters.status, filters.priority);
  }
  // dynamic route param
  // ParseIntPipe for converting string id to number
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.findOne(id);
  }

  // demo payload is added for postman
  // {
  //   "subject": "Unable to create ticket",
  //   "description": "The ticket description",
  //   "priority": "high"
  // }
  // there is no path string in Post(), so it will use controller's path

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(id, updateTicketDto);
  }
}
