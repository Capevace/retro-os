import styled from 'styled-components';
import Background from './Background';
import DesktopIcons from './DesktopIcons';
import SystemBar from './SystemBar';
import WindowManager from '../features/windows/WindowManager';

const Wrapper = styled.div`
	height: 100vh;

	.desktop-icons {
	}
`;

function Desktop() {
	return (
		<Wrapper>
			<Background />
			<SystemBar />
			<DesktopIcons />
			<WindowManager />
		</Wrapper>
	);
}

export default Desktop;
