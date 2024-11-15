import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  projectMembers: [],
  loading: false,
  error: null,
};

// Fetch all project members
export const fetchProjectMembers = createAsyncThunk(
  'projectMembers/fetchProjectMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://phase-5-project-55r2.onrender.com/project_members');
      if (!response.ok) throw new Error('Failed to fetch project members');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add a new project member
export const addProjectMember = createAsyncThunk(
  'projectMembers/addProjectMember',
  async (newMemberData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://phase-5-project-55r2.onrender.com/project_members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMemberData),
      });
      if (!response.ok) throw new Error('Failed to add project member');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Edit an existing project member
export const editProjectMember = createAsyncThunk(
  'projectMembers/editProjectMember',
  async (updatedMemberData, { rejectWithValue }) => {
    const { id, ...data } = updatedMemberData;
    try {
      const response = await fetch(`https://phase-5-project-55r2.onrender.com/project_members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update project member');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete a project member
export const deleteProjectMember = createAsyncThunk(
  'projectMembers/deleteProjectMember',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://phase-5-project-55r2.onrender.com/project_members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project member');
      return id; // Return the ID of the deleted project member to remove it from state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const projectMembersSlice = createSlice({
  name: 'projectMembers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectMembers.fulfilled, (state, action) => {
        state.projectMembers = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjectMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProjectMember.fulfilled, (state, action) => {
        state.projectMembers.push(action.payload);
      })
      .addCase(editProjectMember.fulfilled, (state, action) => {
        const index = state.projectMembers.findIndex((member) => member.id === action.payload.id);
        if (index !== -1) state.projectMembers[index] = action.payload;
      })
      .addCase(deleteProjectMember.fulfilled, (state, action) => {
        state.projectMembers = state.projectMembers.filter((member) => member.id !== action.payload);
      });
  },
});

// Ensure only the reducer and correct thunks are exported
export default projectMembersSlice.reducer;
