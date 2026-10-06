import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno de la base de datos';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma Error Codes: https://www.prisma.io/docs/reference/api-reference/error-reference
      switch (exception.code) {
        case 'P2002': {
          status = HttpStatus.CONFLICT;
          message = `Un registro con esos datos únicos ya existe.`;
          break;
        }
        case 'P2025': {
          status = HttpStatus.NOT_FOUND;
          message = `El registro que intentas actualizar o eliminar no existe.`;
          break;
        }
        default:
          message = `Error de base de datos: ${exception.message}`;
          break;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
}
