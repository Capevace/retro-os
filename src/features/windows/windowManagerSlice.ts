import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WindowPosition {
	x: number;
	y: number;
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
	U[keyof U];

export interface WindowData {
	id: string;
	title: string;
	position: WindowPosition;
}

export interface WindowManagerState {
	windows: Array<WindowData>;
}

const initialState: WindowManagerState = {
	windows: [
		{ id: 'test', title: 'Initial Window', position: { x: 10, y: 2 } },
	],
};

export const windowManagerSlice = createSlice({
	name: 'windowManager',
	initialState,
	reducers: {
		addRandomWindow: (state, action: { payload: { title } }) => {
			const window = action.payload;

			state.windows.push({
				id: `window-${Math.floor(Math.random() * 10000)}`,
				title: window.title,
				position: { x: Math.random() * 300, y: Math.random() * 200 },
			});
		},
		dragWindow: (
			state,
			action: { payload: { id: string; position: WindowPosition } }
		) => {
			const { id, position } = action.payload;

			state.windows = state.windows.map((window) =>
				window.id === id ? { ...window, position } : window
			);
		},

		closeWindow: (state, action: { payload: string }) => {
			const id = action.payload;
			state.windows = state.windows.filter((window) => window.id !== id);
		},

		focusWindow: (state, action: { payload: string }) => {
			const id = action.payload;
			const index = state.windows.findIndex((window) => window.id === id);
			const window = state.windows[index];
			state.windows.splice(index, 1);
			state.windows.push(window);
		},
	},
});

export const { addRandomWindow, dragWindow, closeWindow, focusWindow } =
	windowManagerSlice.actions;

export default windowManagerSlice.reducer;
