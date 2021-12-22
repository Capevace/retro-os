import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import windowManagerSlice from './features/windows/windowManagerSlice';
import desktopSlice from './features/desktop/desktopSlice';

export const store = configureStore({
	reducer: {
		windowManager: windowManagerSlice,
		desktop: desktopSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
