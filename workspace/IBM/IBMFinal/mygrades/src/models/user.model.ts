import {Entity, model, property, hasMany} from '@loopback/repository';
import {Assessment} from './assessment.model';

@model()
export class User extends Entity {
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
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  badges?: string[];

  @property({
    type: 'string',
  })
  gender?: string;

  @property({
    type: 'number'
  })
  rank?: number;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  prefs?: object[];

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  firstname?: string;

  @property({
    type: 'string',
  })
  lastname?: string;

  @property({
    type: 'string',
  })
  grade?: string;

  @property({
    type: 'string',
  })
  contact?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'number',
  })
  points?: number;

  @property({
    type: 'object',
  })
  extra?: object;

  @hasMany(() => Assessment)
  assessments: Assessment[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
