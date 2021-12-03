import { FunctionComponent } from 'react';
import { Avatar } from 'react95';
import styled from 'styled-components';

const IconLink = styled.a`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	max-width: 75px;
	text-align: center;

	&:focus .icon-text {
		background: blue;
		border: 1px dotted white;
		color: white;
	}
`;

const IconText = styled.span`
	padding: -5px -5px;
	font-size: 13px;
	width: 100%;
	display: inline-block;
	border: 1px dotted transparent;
`;

const IconWrapper = styled.div``;

type DesktopIconProps = {
	name: string;
	onOpen?: () => void;
};

const DesktopIcon: FunctionComponent<DesktopIconProps> = ({
	name,
	onOpen = () => {},
}) => {
	return (
		<IconLink href="#" onDoubleClick={onOpen}>
			<IconWrapper>
				<Avatar size={50} style={{ background: 'palevioletred' }}>
					{name.substr(0, 2).toUpperCase()}
				</Avatar>
			</IconWrapper>
			<IconText className="icon-text">{name}</IconText>
		</IconLink>
	);
};

export default DesktopIcon;
