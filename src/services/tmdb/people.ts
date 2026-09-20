import { get } from './client';
import { PersonDetails } from '@/types';

export const getPersonDetails = (id: string | number) =>
  get<PersonDetails>(`/api/tmdb/person/${id}`, { append_to_response: 'combined_credits' });
