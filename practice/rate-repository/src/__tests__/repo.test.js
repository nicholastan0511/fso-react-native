import { RepositoryListContainer } from "../components/RepositoryList";
import { screen, render, within } from "@testing-library/react-native";

describe('Repository', () => {
  it('Render correct fields for repo items', () => {
    const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
    };

    //render element onto screen and query the subelements
    render(<RepositoryListContainer repositories={repositories} />)
    screen.debug()

    const repositoryItems = screen.getAllByTestId('repositoryItem')
    const [firstItem, secondItem] = repositoryItems

    const fullNameFirst = within(firstItem).getByText('jaredpalmer/formik')
    const descriptionFirst = within(firstItem).getByText('Build forms in React, without the tears')
    const languageFirst = within(firstItem).getByText('TypeScript')
    const forksCountFirst = within(firstItem).getByText('1.6k')

    expect(fullNameFirst).toBeDefined()
    expect(descriptionFirst).toBeDefined()
    expect(languageFirst).toBeDefined()
    expect(forksCountFirst).toBeDefined()

    const fullNameSecond = within(secondItem).getByText('async-library/react-async')
    const descriptionSecond = within(secondItem).getByText('Flexible promise-based React data loader')
    const languageSecond = within(secondItem).getByText('JavaScript')
    const forksCountSecond = within(secondItem).getByText('69')

    expect(fullNameSecond).toBeDefined()
    expect(descriptionSecond).toBeDefined()
    expect(languageSecond).toBeDefined()
    expect(forksCountSecond).toBeDefined()

  })
})