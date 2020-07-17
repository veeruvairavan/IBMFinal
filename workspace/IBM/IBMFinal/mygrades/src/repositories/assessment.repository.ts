import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Assessment, AssessmentRelations, User} from '../models';
import {GradesDataSourceDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class AssessmentRepository extends DefaultCrudRepository<
  Assessment,
  typeof Assessment.prototype.id,
  AssessmentRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Assessment.prototype.id>;

  constructor(
    @inject('datasources.GradesDataSource') dataSource: GradesDataSourceDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Assessment, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
