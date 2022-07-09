import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, cleanup, act, fireEvent} from '@testing-library/react-native';
import OGApp from '../App';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {HEADLINE_VIEW_CONTAINER, TestIDs} from '../src/Utils/testIds';
import {useFetchAllTopStories} from '../src/Service/Api';
import {useFetchItemById} from '../src/Service/useFetchItemById';
import {
  commentMock,
  headLineDetails,
  storyListIds,
} from './ApiMock/APPTestMock';

const fetch = require('node-fetch');

jest.mock('../src/Service/Api', () => ({
  useFetchAllTopStories: jest.fn(),
}));
jest.mock('../src/Service/useFetchItemById', () => ({
  useFetchItemById: jest.fn(),
}));
const queryClient = new QueryClient();
describe('Testing react app', () => {
  afterAll(done => {
    done();
  });
  beforeEach(() => {
    useFetchAllTopStories.mockImplementation(() => ({
      isSuccess: true,
      data: storyListIds,
    }));
    useFetchItemById.mockImplementation(() => ({
      isSuccess: true,
      data: headLineDetails,
    }));
  });
  afterEach(() => cleanup());
  test('render navigation', async () => {
    const component = (
      <QueryClientProvider client={queryClient}>
        <OGApp />
      </QueryClientProvider>
    );
    render(component);
  });
  test('test if Headline View Render Correctly with data', async () => {
    const {queryAllByTestId} = await render(
      <QueryClientProvider client={queryClient}>
        <OGApp />
      </QueryClientProvider>,
    );
    await act(async () => {
      expect(useFetchItemById).toHaveBeenCalledWith(headLineDetails.id);
      expect(queryAllByTestId(TestIDs.HEADLINE_VIEW_CONTAINER)).toBeDefined();
      expect(queryAllByTestId(TestIDs.TOP_STORIES_LIST)).toBeDefined();
    });
  });
  test('test if user can share the URL', async () => {
    const {queryAllByTestId, getByTestId} = await render(
      <QueryClientProvider client={queryClient}>
        <OGApp />
      </QueryClientProvider>,
    );
    await act(async () => {
      expect(
        queryAllByTestId(TestIDs.HEADLINE_VIEW_LIST_SHARE + headLineDetails.id),
      ).toBeDefined();

      const screen1 = getByTestId(
        TestIDs.HEADLINE_VIEW_LIST_SHARE + headLineDetails.id,
      );
      expect(screen1).toBeTruthy();
      fireEvent(screen1, screen1.props.onPress ? 'onPress' : 'onClick');
    });
  });
  test('test if user can open the URL', async () => {
    const {getByTestId} = await render(
      <QueryClientProvider client={queryClient}>
        <OGApp />
      </QueryClientProvider>,
    );
    await act(async () => {
      expect(
        getByTestId(
          TestIDs.HEADLINE_VIEW_LIST_ID_OPEN_URL + headLineDetails.id,
        ),
      ).toBeDefined();

      const screen1 = getByTestId(
        TestIDs.HEADLINE_VIEW_LIST_ID_OPEN_URL + headLineDetails.id,
      );
      expect(screen1).toBeTruthy();
      fireEvent(screen1, screen1.props.onPress ? 'onPress' : 'onClick');
    });
  });
  test('test if user can navigate to comment screen', async () => {
    const {getByTestId} = await render(
      <QueryClientProvider client={queryClient}>
        <OGApp />
      </QueryClientProvider>,
    );
    await act(async () => {
      expect(
        getByTestId(TestIDs.HEADLINE_VIEW_LIST_ID + headLineDetails.id),
      ).toBeDefined();

      const screen1 = getByTestId(
        TestIDs.HEADLINE_VIEW_LIST_ID + headLineDetails.id,
      );
      expect(screen1).toBeTruthy();
      fireEvent(screen1, screen1.props.onPress ? 'onPress' : 'onClick');
    });
  });

  
});
