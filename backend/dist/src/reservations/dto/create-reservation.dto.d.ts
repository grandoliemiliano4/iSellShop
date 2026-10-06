export declare class CreateReservationDto {
    productId: number;
    userId: number;
    clientId: number;
    status?: string;
    reservedAt?: Date;
    observations?: string;
    tipo_interaccion?: string;
    last_modification?: Date;
    canal_venta?: string;
    date_retiro?: string;
    descuento?: number;
    comision?: number;
    expiresAt?: string;
}
