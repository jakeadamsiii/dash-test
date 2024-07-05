import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './components/App';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('App Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders the app and checks for initial elements', () => {
    render(<App />);
    expect(screen.getByText(/Sort by name/i)).toBeInTheDocument();
    expect(screen.getByText(/No patients could be found, please adjust your search/i)).toBeInTheDocument();
  });

  test('fetches and displays patient data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: 1, firstName: 'John', lastName: 'Doe', nhsNumber: '123456789', vaccineType: 'Pfizer' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', nhsNumber: '987654321', vaccineType: 'Moderna' }
    ]));

    render(<App />);

    await waitFor(() => screen.getByText('John Doe'));

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('123456789')).toBeInTheDocument();
    expect(screen.getByText('Pfizer')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('987654321')).toBeInTheDocument();
    expect(screen.getByText('Moderna')).toBeInTheDocument();
  });

  test('sorts patient data by name', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
      { id: 1, firstName: 'John', lastName: 'Doe', nhsNumber: '123456789', vaccineType: 'Pfizer' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', nhsNumber: '987654321', vaccineType: 'Moderna' }
    ]));
  
    render(<App />);
  
    await waitFor(() => screen.getByText('John Doe'));
  
    const sortButton = screen.getByText(/Sort by name/i);
    fireEvent.click(sortButton);
  
    // Wait for sorting to reflect in the DOM
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toContainHTML('<td>John Doe</td>'); // Check the second row after sorting
      expect(rows[2]).toContainHTML('<td>Jane Smith</td>'); // Check the third row after sorting
    });
  
    fireEvent.click(sortButton);
  
    // Wait for re-sorting to reflect in the DOM
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toContainHTML('<td>Jane Smith</td>'); // Check the second row after re-sorting
      expect(rows[2]).toContainHTML('<td>John Doe</td>'); // Check the third row after re-sorting
    });
  });

});
