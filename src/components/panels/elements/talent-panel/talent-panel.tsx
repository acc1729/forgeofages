import {  Hero } from '../../../../models/hero';
import { Badge } from '../../../controls/badge/badge';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Talent } from '../../../../models/talent';

import './talent-panel.scss';

interface Props {
	talent: Talent;
	hero?: Hero;
	cost?: number;
	repeatable?: boolean;
	options?: Options;
	mode?: PanelMode;
	tags?: string[];
}

export const TalentPanel = (props: Props) => {
	try {
		let className = 'ability-panel';
		if (props.mode !== PanelMode.Full) {
			className += ' compact';
		}

		return (
			<div className={className} id={props.mode === PanelMode.Full ? props.talent.id : undefined}>
				<HeaderText ribbon={(<Badge>Signature</Badge>)} tags={props.tags}>
					{props.talent.name || 'Unnamed Talent'}
				</HeaderText>
				<Markdown text={props.talent.description} />
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
