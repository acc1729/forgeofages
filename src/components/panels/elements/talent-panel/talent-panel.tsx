import {  Hero } from '../../../../models/hero';
import { Badge } from '../../../controls/badge/badge';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Markdown } from '../../../controls/markdown/markdown';
import { Options } from '../../../../models/options';
import { PanelMode } from '../../../../enums/panel-mode';
import { Talent } from '../../../../models/talent';
import { TierAbbreviations } from '../../../../enums/tier';
import { Feat } from '../../../../models/feat';

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

function renderFeats(feats: Feat[]) {
	if (feats.length === 0) {
		return null;
	}
	return (
		<div>
			<HeaderText level={3}>Feats</HeaderText>
			{feats.map((feat, i) => (
					<p key={i}>
						<Markdown text={`**${TierAbbreviations[feat.tier]}:** ${feat.description}`} />
					</p>
				))}
		</div>
	);

}

export const TalentPanel = (props: Props) => {
	try {
		let className = 'ability-panel';
		if (props.mode !== PanelMode.Full) {
			className += ' compact';
		}

		console.log(props);

		return (
			<div className={className} id={props.mode === PanelMode.Full ? props.talent.id : undefined}>
				<HeaderText tags={props.tags}>
					{props.talent.name || 'Unnamed Talent'}
				</HeaderText>
				<Markdown text={props.talent.description} />
				{props.talent.feats.length > 0 ? renderFeats(props.talent.feats) : null}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
