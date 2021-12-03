import styled from 'styled-components';
import Background from '../../components/Background';
import DesktopIcons from './DesktopIcons';
import SystemBar from '../../components/SystemBar';
import WindowManager from '../windows/WindowManager';

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
