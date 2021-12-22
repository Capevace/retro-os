import styled from 'styled-components';
import DesktopIcon from './DesktopIcon';
import { useAppDispatch, useAppSelector } from '../../store';
import {
	addRandomWindow,
	addWindow,
	DEFAULT_WINDOW_SIZE,
	WindowData,
} from '../windows/windowManagerSlice';

const IconsList = styled.div`
	margin-top: 45px;
	width: 100%;
	height: calc(100% - 45px);
	display: flex;
	flex-direction: column;
	align-items: end;
	gap: 30px;
	padding: 30px 50px;
`;

function DesktopIcons() {
	const icons = useAppSelector((state) => state.desktop.icons);
	const dispatch = useAppDispatch();

	const centerWindowAxis = (axisLength: number, windowSize: number) =>
		axisLength / 2 - windowSize / 2;

	const openWindow = (window: WindowData) =>
		dispatch(
			addWindow({
				...window,
				position: {
					x: centerWindowAxis(
						global.window.innerWidth,
						window?.size?.width || DEFAULT_WINDOW_SIZE.width
					),
					y: centerWindowAxis(
						global.window.innerHeight,
						window?.size?.height || DEFAULT_WINDOW_SIZE.height
					),
				},
			})
		);
	const openRandomWindow = (title: string) =>
		dispatch(addRandomWindow({ title }));

	return (
		<IconsList>
			{icons.map((icon) => (
				<DesktopIcon
					name={icon.name}
					key={icon.name}
					onOpen={() =>
						icon.windowData
							? openWindow(icon.windowData)
							: openRandomWindow(icon.name)
					}
				/>
			))}
		</IconsList>
	);
}

export default DesktopIcons;
