import { Divider } from 'antd';
import { Field } from '../../controls/field/field';
import { Modal } from '../modal/modal';

import pkg from '../../../../package.json';

import './about-modal.scss';

interface Props {
	onClose: () => void;
}

export const AboutModal = (props: Props) => {
	try {
		return (
			<Modal
				content={
					<div className='about-modal'>
						<p>
							<b>FORGE OF AGES</b> is an independent product not affiliated with Pelgrane Press or Fire Opal Media.
							It uses material licensed under the <a href="https://pelgranepress.com/2014/02/19/13th-age-archmage-engine-license/">13th Age Archmage Engine License</a>.
						</p>
						<p>
							<b><a href="https://pelgranepress.com/13th-age/">13th Age</a></b> © 2013 <a href='https://www.fireopalmedia.com/' target='_blank'>Fire Opal Media</a>.
						</p>
						<Divider />
						<p>
							Based on <a href="https://andyaiken.github.io/forgesteel/">FORGE STEEL</a> by <a href='mailto:andy.aiken@live.co.uk'>Andy Aiken</a>.
						</p>
						<p>
							Source code and bug reports can be found <a href='https://github.com/acc1729/forgeofages/issues' target='_blank'>here</a>.
						</p>
						<Divider />
						<Field label='Version' value={pkg.version} />
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
