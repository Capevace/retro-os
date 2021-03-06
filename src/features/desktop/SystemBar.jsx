import { useState } from 'react';

import {
	AppBar,
	Toolbar,
	Button,
	List,
	ListItem,
	Divider,
	TextField,
} from 'react95';
import logoIMG from '../../assets/logo.svg';

function SystemBar() {
	const [open, setOpen] = useState(false);

	return (
		<AppBar style={{ top:  0 }}>
			<Toolbar style={{ justifyContent: 'space-between' }}>
				<div style={{ position: 'relative', display: 'inline-block' }}>
					<Button
						onClick={() => setOpen(!open)}
						active={open}
						style={{ fontWeight: 'bold' }}
					>
						<img
							src={logoIMG}
							alt="react95 logo"
							style={{ height: '20px', marginRight: 4 }}
						/>
						Start
					</Button>
					{open && (
						<List
							style={{
								position: 'absolute',
								left: '0',
								top: '100%',
							}}
							onClick={() => setOpen(false)}
						>
							<ListItem>
								<span role="img" aria-label="👨‍💻">
									👨‍💻
								</span>
								Profile
							</ListItem>
							<ListItem>
								<span role="img" aria-label="📁">
									📁
								</span>
								My account
							</ListItem>
							<Divider />
							<ListItem disabled>
								<span role="img" aria-label="🔙">
									🔙
								</span>
								Logout
							</ListItem>
						</List>
					)}
				</div>

				<TextField placeholder="Search..." width={150} />
			</Toolbar>
		</AppBar>
	);
}

export default SystemBar;
