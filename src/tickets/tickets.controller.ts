import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { Ticket } from './ticket.interface.js';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) {}
  @Get()
  findAll(
    @Query('status') status?: Ticket['status'],
    @Query('priority') priority?: Ticket['priority'],
  ) {
    return this.ticketService.findAll(status, priority);
  }

  // dynamic route param
  // ParseIntPipe for converting string id to number
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.findOne(id);
  }
}
