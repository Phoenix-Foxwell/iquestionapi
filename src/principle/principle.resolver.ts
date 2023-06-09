import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrincipleService } from './principle.service';
import { Principle } from './entities/principle.entity';
import { CreatePrincipleInput } from './dto/create-principle.input';
import { UpdatePrincipleInput } from './dto/update-principle.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver(() => Principle)
export class PrincipleResolver {
  constructor(private readonly principleService: PrincipleService) {}

  @Query(() => [Principle])
  getPrinciple() {
    return this.principleService.getPrinciple();
  }

  @Query(() => Principle)
  getPrincipleById(@Args('id', { type: () => Int }) id: number) {
    return this.principleService.getPrincipleById(id);
  }

  @Mutation(() => Principle)
  createPrinciple(
    @Args('createPrincipleInput') createPrincipleInput: CreatePrincipleInput,
  ) {
    return this.principleService.createPrinciple(createPrincipleInput);
  }

  @Mutation(() => Principle)
  updatePrincipleById(
    @Args('updatePrincipleInput') updatePrincipleInput: UpdatePrincipleInput,
  ) {
    return this.principleService.updatePrincipleById(
      updatePrincipleInput.id,
      updatePrincipleInput,
    );
  }

  @Mutation(() => Principle)
  deletePrincipleById(
    @Args('updatePrincipleInput') updatePrincipleInput: UpdatePrincipleInput,
  ) {
    return this.principleService.deletePrincipleById(updatePrincipleInput);
  }
}
