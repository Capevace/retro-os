import { ReactNode, useRef, FunctionComponent } from 'react';
import Draggable from 'react-draggable';
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
import { WindowPosition } from './windowManagerSlice';

const WindowHeaderTitle = styled.span`
	pointer-events: none;
	cursor: default;
`;

interface BaseWindowProps {
	id: String;
	title: String;
	x: number;
	y: number;
	width?: string;
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
	x,
	y,
	width = '400px',
	onDrag = (position) => {},
	onFocus = () => {},
	onClose = () => {},
	toolbar,
	children,
}) => {
	const windowRef = useRef(null);

	const handleDrag = (e, data: WindowPosition) => {
		onDrag({ x: data.x, y: data.y });
	};

	return (
		<Draggable
			handle=".window-header"
			bounds="html"
			nodeRef={windowRef}
			position={{ x, y }}
			onStop={handleDrag}
		>
			<Window className={`window ${className}`} ref={windowRef}>
				<WindowHeader className="window-header">
					<WindowHeaderTitle>{title}</WindowHeaderTitle>
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
