import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { WindowData } from '../windows/windowManagerSlice';

export interface IconData {
	id: string;
	name: string;
	windowData?: WindowData;
}

export interface DesktopState {
	icons: Array<IconData>;
}

const initialState: DesktopState = {
	icons: [
		{
			id: 'icon-new-in',
			name: 'New in',
			windowData: {
				id: 'window-store',
				title: 'Store',
				position: { x: 0, y: 0 },
				size: { width: undefined },
				component: <h1>New In content</h1>,
			},
		},
		{
			id: 'icon-store',
			name: 'Store',
			windowData: {
				id: 'window-store',
				title: 'Store',
				position: { x: 0, y: 0 },
				size: { width: undefined },
				component: <h1>Store content</h1>,
			},
		},
		{
			id: 'icon-about',
			name: 'About us',
			windowData: {
				id: 'window-about',
				title: 'About us!',
				position: { x: 0, y: 0 },
				size: { width: undefined },
				component: <h1>About us content</h1>,
			},
		},
	],
};

export const desktopSlice = createSlice({
	name: 'desktop',
	initialState,
	reducers: {
		addIcon: (state, action: { payload: { name: string } }) => {
			const icon = action.payload;

			state.icons.push({
				id: `icon-${Math.floor(Math.random() * 10000)}`,
				name: icon.name,
			});
		},
	},
});

export const { addIcon } = desktopSlice.actions;

export default desktopSlice.reducer;
