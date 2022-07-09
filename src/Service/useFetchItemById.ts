import {useEffect} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {BASE_URL, DATA_INVALIDATION_TIMEOUT} from '../Utils/constants';
import {Item} from './types';

//api call to get details by id
export function useFetchItemById(id: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(
      () => queryClient.invalidateQueries(['item', id]),
      DATA_INVALIDATION_TIMEOUT,
    );
    return () => clearInterval(interval);
  }, [queryClient, id]);

  return useQuery<Item>(['item', id], async () => {
    const response = await fetch(
      `${BASE_URL}${`/item/`}${id}.json?print=pretty`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}
