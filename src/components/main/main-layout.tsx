import { Drawer } from 'antd';
import { Outlet } from 'react-router';
import { ReactNode } from 'react';
import { useMediaQuery } from '../../hooks/use-media-query';

import communityUseLogo from '../../assets/13thagecommunityuselogo.webp';

interface Props {
	section: 'hero' | 'library' | 'encounter';
	directory: ReactNode;
	drawer: ReactNode;
	setDirectory: React.Dispatch<React.SetStateAction<ReactNode>>;
	setDrawer: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const MainLayout = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');

	return (
		<div className='main'>
			<div className='main-content'>
				<Outlet />
			</div>
			{
				!isSmall ?
					<div className='main-footer'>
						<div className='main-footer-section legal'>
							<img className='ds-logo' src={communityUseLogo} />
							FORGE OF AGES uses material licensed under the <a href="https://pelgranepress.com/2014/02/19/13th-age-archmage-engine-license/">13th Age Archmage Engine License</a>.
						</div>
					</div>
					: null
			}
			<Drawer placement='left' open={props.directory !== null} onClose={() => props.setDirectory(null)} closeIcon={null} width='350px'>
				{props.directory}
			</Drawer>
			<Drawer open={props.drawer !== null} onClose={() => props.setDrawer(null)} closeIcon={null} width='350px'>
				{props.drawer}
			</Drawer>
		</div>
	);
};
