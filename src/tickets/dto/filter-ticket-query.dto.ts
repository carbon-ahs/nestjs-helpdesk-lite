import { IsIn, IsOptional } from 'class-validator';

export class FilterTicketQueryDto {
  @IsOptional()
  @IsIn(['open', 'closed'])
  status?: 'open' | 'closed';

  @IsOptional()
  @IsIn(['low', 'high', 'medium'])
  priority?: 'low' | 'medium' | 'high';
}
