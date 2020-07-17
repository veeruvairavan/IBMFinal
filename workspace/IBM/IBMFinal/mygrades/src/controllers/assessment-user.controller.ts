import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Assessment,
  User,
} from '../models';
import {AssessmentRepository} from '../repositories';

export class AssessmentUserController {
  constructor(
    @repository(AssessmentRepository)
    public assessmentRepository: AssessmentRepository,
  ) { }

  @get('/assessments/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Assessment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Assessment.prototype.id,
  ): Promise<User> {
    return this.assessmentRepository.user(id);
  }
}
