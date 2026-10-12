import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketsService {
  private readonly tickets = [
    { id: 1, name: 'Ticket 1' },
    { id: 2, name: 'Ticket 2' },
    { id: 3, name: 'Ticket 3' },
    { id: 4, name: 'Ticket 4' },
    { id: 5, name: 'Ticket 5' },
  ];

  findAll() {
    return this.tickets;
  }
}
