import { ReactNode, useRef, FunctionComponent } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
import {
	Window,
	WindowContent,
	WindowHeader,
	Button,
	Toolbar,
	Panel,
	TextField,
} from 'react95';
import styled, { css } from 'styled-components';
import {
	DEFAULT_WINDOW_SIZE,
	WindowPosition,
	WindowSize,
} from './windowManagerSlice';

const WindowHeaderTitle = styled.span`
	pointer-events: none;
	cursor: default;
`;

interface BaseWindowProps {
	id: String;
	title: String;
	position: WindowPosition;
	size?: Partial<WindowSize>;
	active?: boolean;
	onDrag?: (position: WindowPosition) => void;
	onFocus?: () => void;
	onClose?: () => void;
	toolbar?: ReactNode;
	className?: String;
	children?: ReactNode;
}

const BaseWindow: FunctionComponent<BaseWindowProps> = ({
	className = '',
	id,
	title = 'Unnamed Window',
	position,
	size: { width, height } = {
		width: DEFAULT_WINDOW_SIZE.width,
	},
	active = false,
	onDrag = (position) => {},
	onFocus = () => {},
	onClose = () => {},
	toolbar,
	children,
}) => {
	const windowRef = useRef(null);

	const handleDrag = (e: DraggableEvent, data: WindowPosition) => {
		onDrag({ x: data.x, y: data.y });
	};

	return (
		<Draggable
			handle=".window-header"
			bounds="html"
			nodeRef={windowRef}
			position={position}
			onStop={handleDrag}
			onMouseDown={onFocus}
		>
			<Window
				className={`window ${className}`}
				ref={windowRef}
				style={{
					width: width ? `${width}px` : undefined,
					height: height ? `${height}px` : undefined,
				}}
			>
				<WindowHeader active={active} className="window-header">
					<WindowHeaderTitle>
						{title} {width}
					</WindowHeaderTitle>
					<Button className="close-button" onClick={onClose}>
						<span className="close-icon">x</span>
					</Button>
				</WindowHeader>
				<Toolbar>{toolbar}</Toolbar>
				<WindowContent>{children}</WindowContent>
				<Panel variant="well" className="footer">
					Put some useful informations here
				</Panel>
			</Window>
		</Draggable>
	);
};

const Wrapper = styled(BaseWindow)`
	max-width: 400px;
	// min-height: 200px;

	position: fixed;

	.window-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.close-button {
	}

	.footer {
		width: 100%;
	}
`;

export default Wrapper;
