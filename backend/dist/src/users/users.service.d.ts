import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: string;
        dni: string | null;
        ciudad: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: string;
        dni: string | null;
        ciudad: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: string;
        dni: string | null;
        ciudad: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
