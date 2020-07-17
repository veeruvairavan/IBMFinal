import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Assessment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  qa: object[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  studentAnswers?: string[];

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  result?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  correctAnswers?: string[];

  @property({
    type: 'number',
  })
  timetaken?: number;

  @property({
    type: 'number',
  })
  duration?: number;

  @property({
    type: 'number',
  })
  teacherId?: number;

  @property({
    type: 'string',
  })
  teacher?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  awards?: object[];

  @property({
    type: 'object',
  })
  extra?: object;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Assessment>) {
    super(data);
  }
}

export interface AssessmentRelations {
  // describe navigational properties here
}

export type AssessmentWithRelations = Assessment & AssessmentRelations;
