import styled from 'styled-components';
import DesktopIcon from './DesktopIcon';
import { useAppDispatch } from '../../store';
import { addRandomWindow } from '../windows/windowManagerSlice';

const IconsList = styled.div`
	margin-top: 45px;
	width: 100%;
	height: calc(100% - 45px);
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px;
`;

function DesktopIcons() {
	const icons = [
		{
			name: 'Hello World this is longer',
			action: () => {},
		},
		{
			name: 'Test',
		},
	];

	const dispatch = useAppDispatch();

	const openWindow = (title) => dispatch(addRandomWindow({ title }));

	return (
		<IconsList>
			{icons.map((icon) => (
				<DesktopIcon
					name={icon.name}
					key={icon.name}
					onOpen={() => openWindow(icon.name)}
				/>
			))}
		</IconsList>
	);
}

export default DesktopIcons;