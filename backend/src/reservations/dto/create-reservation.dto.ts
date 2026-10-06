import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  clientId: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  reservedAt?: Date;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsString()
  tipo_interaccion?: string;

  @IsOptional()
  @IsDateString()
  last_modification?: Date;

  @IsOptional()
  @IsString()
  canal_venta?: string;

  @IsOptional()
  @IsString()
  date_retiro?: string;

  @IsOptional()
  @IsNumber()
  descuento?: number;

  @IsOptional()
  @IsNumber()
  comision?: number;

  @IsOptional()
  @IsString()
  expiresAt?: string;
}
