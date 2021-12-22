import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

export const DEFAULT_WINDOW_SIZE: FullWindowSize = {
	width: 400,
	height: 300,
};

export const DYNAMIC_WINDOW_SIZE: Partial<WindowSize> = {
	width: undefined,
	height: undefined,
};

export interface WindowPosition {
	x: number;
	y: number;
}

/**
 * The full window size must contain a width and a height.
 * In practice, we use {@link WindowSize} with both properties being optional.
 * @see WindowSize
 */
export interface FullWindowSize {
	width: number;
	height: number;
}

/**
 * This type is the one actually used. `width` and `height` are optional.
 */
export type WindowSize = Partial<FullWindowSize>;

export interface WindowData {
	id: string;
	title: string;
	position: WindowPosition;

	/**
	 * Size is optional. This enables the following behaviours, with {@link WindowSize} having optional properties:
	 * - When no size is passed, a {@link DEFAULT_WINDOW_SIZE} is used.
	 * - When a size and both `width` and `height` are passed, strictly set both
	 * - When `width` _OR_ `height` are passed, just set one of them, the other one will be dynamic
	 * - When `size` is an empty object (`{}`) and `width` and `height` are undefined, both will be dynamic
	 */
	size?: WindowSize;
	minSize?: WindowSize;
	maxSize?: WindowSize;
	component?: ReactNode;
}

export interface WindowManagerState {
	windows: Array<WindowData>;
}

const initialState: WindowManagerState = {
	windows: [
		{
			id: 'test',
			title: 'Initial Window',
			position: { x: 10, y: 2 },
			size: { width: 400 },
		},
	],
};

export const windowManagerSlice = createSlice({
	name: 'windowManager',
	initialState,
	reducers: {
		addRandomWindow: (state, action: { payload: { title: string } }) => {
			const window = action.payload;

			state.windows.push({
				id: `window-${Math.floor(Math.random() * 10000)}`,
				title: window.title,
				position: {
					x: Math.random() * global.window.innerWidth,
					y: Math.random() * global.window.innerHeight,
				},
				size: { width: 400 },
			});
		},
		addWindow: (state, action: { payload: WindowData }) => {
			const window = action.payload;

			state.windows.push({
				...window,
				id: `window-${Math.floor(Math.random() * 10000)}`,
				position: {
					x: Math.max(0, Math.random() * global.window.innerWidth - 150),
					y: Math.max(0, Math.random() * global.window.innerHeight - 150),
				},
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
			console.log(state.windows);
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

		fullscreenWindow: (state, action: { payload: string }) => {
			const id = action.payload;

			let window = state.windows.find((window) => window.id === id);

			if (!window) return;

			window.position = { x: 0, y: 0 };
		},
	},
});

export const {
	addRandomWindow,
	addWindow,
	dragWindow,
	closeWindow,
	focusWindow,
} = windowManagerSlice.actions;

export default windowManagerSlice.reducer;
