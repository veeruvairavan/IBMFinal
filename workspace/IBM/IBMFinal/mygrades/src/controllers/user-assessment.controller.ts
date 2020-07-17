import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Assessment,
} from '../models';
import {UserRepository} from '../repositories';

export class UserAssessmentController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/assessments', {
    responses: {
      '200': {
        description: 'Array of User has many Assessment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Assessment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Assessment>,
  ): Promise<Assessment[]> {
    return this.userRepository.assessments(id).find(filter);
  }

  @post('/users/{id}/assessments', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Assessment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Assessment, {
            title: 'NewAssessmentInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) assessment: Omit<Assessment, 'id'>,
  ): Promise<Assessment> {
    return this.userRepository.assessments(id).create(assessment);
  }

  @patch('/users/{id}/assessments', {
    responses: {
      '200': {
        description: 'User.Assessment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Assessment, {partial: true}),
        },
      },
    })
    assessment: Partial<Assessment>,
    @param.query.object('where', getWhereSchemaFor(Assessment)) where?: Where<Assessment>,
  ): Promise<Count> {
    return this.userRepository.assessments(id).patch(assessment, where);
  }

  @del('/users/{id}/assessments', {
    responses: {
      '200': {
        description: 'User.Assessment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Assessment)) where?: Where<Assessment>,
  ): Promise<Count> {
    return this.userRepository.assessments(id).delete(where);
  }
}
