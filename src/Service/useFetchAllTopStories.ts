import {useQuery} from 'react-query';
import {BASE_URL} from '../Utils/constants';

export const getAllTopStories = async () => {
  const response = await fetch(`${BASE_URL}/topstories.json?print=pretty`);
  if (!response.ok) {
    throw new Error('Something went wrong.');
  }
  return response.json();
};
//api call to get all the top story
export const useFetchAllTopStories = () => {
  const {data, isError} = useQuery(['topStory'], getAllTopStories);

  return {data, isError};
};
