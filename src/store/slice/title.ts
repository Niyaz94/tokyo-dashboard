import { 
  createSlice, createSelector,
  createAsyncThunk,
  PayloadAction 
}                             from '@reduxjs/toolkit'
import { RootState }          from '../Reducer'
import {titleInitialState}    from "../initialStore"
import {singleTitle,indTitle} from "../../utility/types/typeStore"
import {TEXT_PARAGRAPH}       from "../../utility/types/typeApp"
import {resetAll}             from "../Actions"
import API                    from "../../utility/Axios"

// accepts three parameters: a string action type value, a payloadCreator callback, and an options object.
export const fetchData = createAsyncThunk('page/title', async () => {
  const response = await API.get("realestate/page/title")
  return response.data
});

const dataSlice = createSlice({
  name: 'data',
  initialState:titleInitialState,
  reducers: {
    addEditTitle: (state, action: PayloadAction<singleTitle>) => {
      // const existingKey = Object.keys(state.data).find((key)=>key===id)
      const { id,content } = action.payload;
      
      state.data=[
        ...state.data,
        {...content,key:id}
      ]
    },
    removeTitle: (state, action: PayloadAction<string>) => {

      const itemIdToRemove = action.payload;
      state.data = state.data.filter(({key})=>key!==itemIdToRemove)
      
      // Object.keys(state.data).reduce((new_data, key) => {
        // if (key !== itemIdToRemove)
          // new_data[key] = state.data[key];
        // return new_data;
      // }, {} as Record<string, TEXT_PARAGRAPH>);      
      // Object.keys(state.data).filter((key) => key !== action.payload);
    },
    getTitle: (state,action:PayloadAction<string>)=>{
      const itemIdToRemove = action.payload;
      // state.data = Object.keys(state.data).map()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message ?? 'An error occurred';
      })
      .addCase(resetAll, () => titleInitialState);
  },

});

export const getSingleTitle = createSelector(
  [
    (state: RootState) => state.title.data,
    (state: RootState, sectionId: string) => sectionId
  ], 
  (data:indTitle[], sectionId:string) => {
    // Should handle wrong [sectionId]
    // console.log(data,sectionId)

    return data.filter(({key})=>key===sectionId)[0]
    // data.filter(({key})=>key===sectionId)
    // data[sectionId]
  }
);

export const { addEditTitle,removeTitle} = dataSlice.actions;

export const selectTitle       = (state: RootState) => state.title;
export const selectTitleData   = (state: RootState) => state.title.data;
// export const selectLoading  = (state: RootState) => state.title.loading;
// export const selectError    = (state: RootState) => state.title.error;

export default dataSlice.reducer;