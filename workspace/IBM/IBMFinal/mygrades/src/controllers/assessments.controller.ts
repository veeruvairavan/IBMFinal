import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Assessment} from '../models';
import {AssessmentRepository} from '../repositories';

export class AssessmentsController {
  constructor(
    @repository(AssessmentRepository)
    public assessmentRepository : AssessmentRepository,
  ) {}

  @post('/assessments', {
    responses: {
      '200': {
        description: 'Assessment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Assessment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Assessment, {
            title: 'NewAssessment',
            exclude: ['id'],
          }),
        },
      },
    })
    assessment: Omit<Assessment, 'id'>,
  ): Promise<Assessment> {
    return this.assessmentRepository.create(assessment);
  }

  @get('/assessments/count', {
    responses: {
      '200': {
        description: 'Assessment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Assessment) where?: Where<Assessment>,
  ): Promise<Count> {
    return this.assessmentRepository.count(where);
  }

  @get('/assessments', {
    responses: {
      '200': {
        description: 'Array of Assessment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Assessment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Assessment) filter?: Filter<Assessment>,
  ): Promise<Assessment[]> {
    return this.assessmentRepository.find(filter);
  }

  @patch('/assessments', {
    responses: {
      '200': {
        description: 'Assessment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Assessment, {partial: true}),
        },
      },
    })
    assessment: Assessment,
    @param.where(Assessment) where?: Where<Assessment>,
  ): Promise<Count> {
    return this.assessmentRepository.updateAll(assessment, where);
  }

  @get('/assessments/{id}', {
    responses: {
      '200': {
        description: 'Assessment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Assessment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Assessment, {exclude: 'where'}) filter?: FilterExcludingWhere<Assessment>
  ): Promise<Assessment> {
    return this.assessmentRepository.findById(id, filter);
  }

  @patch('/assessments/{id}', {
    responses: {
      '204': {
        description: 'Assessment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Assessment, {partial: true}),
        },
      },
    })
    assessment: Assessment,
  ): Promise<void> {
    await this.assessmentRepository.updateById(id, assessment);
  }

  @put('/assessments/{id}', {
    responses: {
      '204': {
        description: 'Assessment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() assessment: Assessment,
  ): Promise<void> {
    await this.assessmentRepository.replaceById(id, assessment);
  }

  @del('/assessments/{id}', {
    responses: {
      '204': {
        description: 'Assessment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.assessmentRepository.deleteById(id);
  }
}
