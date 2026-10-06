import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
  @IsString()
  @IsOptional()
  role?: string;
}
