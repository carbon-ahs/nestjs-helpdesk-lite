import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subject?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  @IsNotEmpty()
  priority?: 'low' | 'medium' | 'high';
}
