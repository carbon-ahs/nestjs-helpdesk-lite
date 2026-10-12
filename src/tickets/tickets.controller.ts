import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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

  // demo payload is added for postman
  // {
  //   "subject": "Unable to create ticket",
  //   "description": "The ticket description",
  //   "priority": "high"
  // }
  // there is no path string in Post(), so it will use controller's path

  @Post()
  create(@Body() payload: any) {
    return this.ticketService.create(payload);
  }
}
