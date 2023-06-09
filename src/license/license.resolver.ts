import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LicenseService } from './license.service';
import { License } from './entities/license.entity';
import { CreateLicenseInput } from './dto/create-license.input';
import { UpdateLicenseInput } from './dto/update-license.input';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Resolver(() => License)
export class LicenseResolver {
  constructor(private readonly licenseService: LicenseService) {}

  @Query(() => [License])
  getAllLicense() {
    return this.licenseService.getAllLicense();
  }

  @Query(() => License)
  getAllLicenseById(@Args('id', { type: () => Int }) id: number) {
    return this.licenseService.getAllLicenseById(id);
  }

  @Mutation(() => License)
  createLicense(
    @Args('createLicenseInput') createLicenseInput: CreateLicenseInput,
  ) {
    return this.licenseService.createLicense(createLicenseInput);
  }

  @Mutation(() => License)
  updateLicenseById(
    @Args('updateLicenseInput') updateLicenseInput: UpdateLicenseInput,
  ) {
    return this.licenseService.updateLicenseById(
      updateLicenseInput.id,
      updateLicenseInput,
    );
  }

  @Mutation(() => License)
  deleteLicenseById(
    @Args('updateLicenseInput') updateLicenseInput: UpdateLicenseInput,
  ) {
    return this.licenseService.deleteLicenseById(updateLicenseInput);
  }
}
