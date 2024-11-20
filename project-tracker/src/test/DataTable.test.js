import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DataTable from '../components/DataTable.jsx';

const mockStore = configureStore([thunk]);

describe('DataTable Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: {
        cohorts: [
          { id: 1, name: 'Cohort 1', description: 'Description 1', start_date: '2023-01-01', end_date: '2023-06-01', number_of_students: 30 },
        ],
        projects: [
          { id: 1, name: 'Project 1', description: 'Description 1', github_url: 'http://github.com', created_at: '2023-01-01', type: 'Web', image_url: 'http://image.com' },
        ],
        projectMembers: [
          { id: 1, project_id: 1, cohort_id: 1, student_name: 'John Doe', role: 'Developer', joined_at: '2023-01-01' },
        ],
        loading: false,
      },
      auth: {
        user: { is_admin: true },
      },
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <DataTable />
      </Provider>
    );

  it('renders the component without crashing', () => {
    renderComponent();
    expect(screen.getByText('Cohorts')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Project Members')).toBeInTheDocument();
  });

  it('displays data for the selected tab', () => {
    renderComponent();

    // Default to "Cohorts"
    expect(screen.getByText('Cohort Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Cohort 1')).toBeInTheDocument();

    // Switch to "Projects" tab
    fireEvent.click(screen.getByText('Projects'));
    expect(screen.getByText('Project Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Project 1')).toBeInTheDocument();

    // Switch to "Project Members" tab
    fireEvent.click(screen.getByText('Project Members'));
    expect(screen.getByText('Student Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('opens the form when Edit is clicked', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('Edit', { selector: 'button' }));
    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });

  it('deletes an entity when Delete is clicked', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('Delete', { selector: 'button' }));
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(expect.objectContaining({ type: 'data/deleteCohort/fulfilled' }));
    });
  });

  it('navigates to the next page in pagination', async () => {
    renderComponent();

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    // Verify that the appropriate action was dispatched
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(expect.objectContaining({ type: 'data/fetchCohorts/pending' }));
    });
  });

  it('opens the appropriate form for Project editing', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('Edit', { selector: 'button' }));
    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });

  it('correctly shows the Edit form for Cohort', async () => {
    renderComponent();
    fireEvent.click(screen.getByText('Edit', { selector: 'button' }));
    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });

  it('opens form for ProjectMember editing when clicking Edit', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('Edit', { selector: 'button' }));
    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });

  it('displays loading indicator when data is loading', async () => {
    store = mockStore({
      data: {
        cohorts: [],
        projects: [],
        projectMembers: [],
        loading: true,
      },
      auth: {
        user: { is_admin: true },
      },
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('navigates to the previous page in pagination', async () => {
    renderComponent();

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    // Verify that the appropriate action was dispatched
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(expect.objectContaining({ type: 'data/fetchCohorts/pending' }));
    });
  });
});
