import { useRef } from 'react';
import Draggable from 'react-draggable';

import {
	Window,
	WindowContent,
	WindowHeader,
	Button,
	Toolbar,
	Panel,
} from 'react95';
import styled from 'styled-components';

const WindowHeaderTitle = styled.span`
	pointer-events: none;
	cursor: default;
`;

function TestWindow({
	className,
	id,
	title = 'Unnamed Window',
	x,
	y,
	width = '400px',
	onDrag = () => {},
	onClose = () => {},
	onClick,
}) {
	const windowRef = useRef(null);

	const handleDrag = (e, data) => {
		onDrag({ x: data.x, y: data.y });
	};

	return (
		<Draggable
			handle=".window-header"
			bounds="html"
			nodeRef={windowRef}
			position={{ x, y }}
			onStop={handleDrag}
			onClick={onClick}
		>
			<Window className={`window ${className}`} ref={windowRef}>
				<WindowHeader className="window-header">
					<WindowHeaderTitle>{title}</WindowHeaderTitle>
					<Button className="close-button" onClick={onClose}>
						<span className="close-icon">x</span>
					</Button>
				</WindowHeader>
				<Toolbar>
					<Button variant="menu" size="sm">
						File
					</Button>
					<Button variant="menu" size="sm">
						Edit
					</Button>
					<Button variant="menu" size="sm" disabled>
						Save
					</Button>
				</Toolbar>
				<WindowContent>
					<p>
						When you set &quot;resizable&quot; prop, there will be
						drag handle in the bottom right corner (but resizing
						itself must be handled by you tho!)
					</p>
				</WindowContent>
				<Panel variant="well" className="footer">
					Put some useful informations here
				</Panel>
			</Window>
		</Draggable>
	);
}

const Wrapper = styled(TestWindow)`
	max-width: 400px;
	min-height: 200px;

	position: fixed;

	.window-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.close-button {
	}
`;

export default Wrapper;
