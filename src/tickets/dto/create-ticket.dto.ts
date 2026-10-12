import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsIn(['low', 'medium', 'high'])
  priority: 'low' | 'medium' | 'high';
}
