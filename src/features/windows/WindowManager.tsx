import { FunctionComponent } from 'react';
import styled from 'styled-components';
import BaseWindow from './BaseWindow';
import { focusWindow, dragWindow, closeWindow } from './windowManagerSlice';
import { useAppDispatch, useAppSelector } from '../../store';

const StyledManager = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	pointer-events: none;

	& * {
		pointer-events: all;
	}
`;

const WindowManager: FunctionComponent = () => {
	const windows = useAppSelector((state) => state.windowManager.windows);
	const dispatch = useAppDispatch();

	return (
		<StyledManager>
			{windows.map((window) => (
				<BaseWindow
					key={window.id}
					id={window.id}
					title={window.title}
					x={window.position.x}
					y={window.position.y}
					onFocus={() => dispatch(focusWindow(window.id))}
					onDrag={(position) =>
						dispatch(dragWindow({ id: window.id, position }))
					}
					onClose={() => dispatch(closeWindow(window.id))}
				/>
			))}
		</StyledManager>
	);
};

export default WindowManager;
