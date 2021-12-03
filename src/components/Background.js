import styled from 'styled-components';
import bg from '../assets/bg.gif';

const Div = styled.div`
	position: fixed;
	z-index: -1;
	inset: 0px;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0) url('${bg}') repeat fixed 0% 0%;
`;

function Background() {
	return <Div />;
}

export default Background;
