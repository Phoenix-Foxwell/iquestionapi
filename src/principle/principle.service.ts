import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePrincipleInput } from './dto/create-principle.input';
import { UpdatePrincipleInput } from './dto/update-principle.input';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PrincipleService {
  constructor(private readonly prisma: PrismaService) {}
  async getPrinciple() {
    const principles = await this.prisma.principle.findMany({
      include: { question_bank: true },
    });

    if (principles.length == 0)
      throw new BadRequestException('There is no principle');
    return principles;
  }

  async getPrincipleById(id: number) {
    const principle = await this.prisma.principle.findFirst({
      where: { id },
      include: { question_bank: true },
    });
    if (!principle)
      throw new BadRequestException('No principle exist with this id.');
    return principle;
  }

  async updatePrincipleById(id: number, principle: UpdatePrincipleInput) {
    const dataToUpdate: {
      [key: string]: any;
    } = {};

    for (const [key, value] of Object.entries(principle)) {
      if (value) {
        dataToUpdate[key] = value;
      }
    }

    const existingUser = await this.prisma.principle.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`Principle with id ${id} not found`);
    }

    const updatedprinciple = this.prisma.principle.update({
      where: { id: id },
      data: dataToUpdate,
    });
    if (!updatedprinciple)
      throw new BadRequestException('Unable to update Principle.');
    return updatedprinciple;
  }
}