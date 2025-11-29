import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from "dayjs";
import { RootState,AppThunk } from '../Reducer';
import {notificationState} from "../initialStore"
import useFetch, {FetchData}    from '../../utility/customHook/useGetAPI';

const notificationSlice = createSlice({
    name: 'notification',
    initialState:notificationState,
    reducers:{
        loadingStart(state) {
          state.loading = "pending";
        },
        loadingFailure(state, action: PayloadAction<string>) {
          state.loading = "failed";
        },
        updateNotifications:(state,action:PayloadAction<{notifications:any[],force_update:boolean}>)=>{
            if (action.payload.force_update || dayjs().subtract(1,"day")>dayjs(state.last_updated)){
                state.notifications=action.payload.notifications;
                state.last_updated=dayjs().format("YYYY-MM-DD HH:mm:ss");
            }
            state.loading="succeeded";
        }
    }
})

export const {loadingStart,loadingFailure,updateNotifications}=notificationSlice.actions;
// export const selectNotifications = (state:RootState) => state.notification.notifications;
export default notificationSlice.reducer;


export const fetchNotifications = (apiUrl:string,force_update:boolean): AppThunk => async (dispatch,getState) => {
    const state = getState().notification; 

      const shouldFetch =force_update ||dayjs().subtract(1, "day").isAfter(dayjs(state.last_updated));

    if (!shouldFetch) {
        return;
    }

    dispatch(loadingStart());
    try {
      // label:0,value:new Date().toJSON().slice(0,10)}
      const { data,success}: FetchData<[]> = useFetch <[]>(apiUrl,[{}]);
      dispatch(updateNotifications({notifications:data,force_update}));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(loadingFailure(error.message));
        } else {
            // Handle other types of errors here
        }
    }
};
