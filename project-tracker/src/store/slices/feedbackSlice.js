import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
  },
  reducers: {
    addFeedback: (state, action) => {
      state.feedbacks.push(action.payload);
    },
  },
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
