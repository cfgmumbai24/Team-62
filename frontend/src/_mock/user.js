import { sample } from 'lodash';
import {  } from '@-js/';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: .string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: .person.fullName(),
  company: .company.name(),
  isVerified: .datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));
