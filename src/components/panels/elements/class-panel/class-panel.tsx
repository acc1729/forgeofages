import { AbilityPanel } from '../ability-panel/ability-panel';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { HeaderText } from '../../../controls/header-text/header-text';
import { Hero } from '../../../../models/hero';
import { HeroClass } from '../../../../models/class';
import { Markdown } from '../../../controls/markdown/markdown';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { Space } from 'antd';
import { SubClass } from '../../../../models/subclass';

import './class-panel.scss';

interface Props {
	heroClass: HeroClass;
	hero?: Hero;
	sourcebooks?: Sourcebook[];
	mode?: PanelMode;
	onSelectSubclass?: (subclass: SubClass) => void;
}

export const ClassPanel = (props: Props) => {
	try {
		return (
			<div className={props.mode === PanelMode.Full ? 'class-panel' : 'class-panel compact'} id={props.mode === PanelMode.Full ? props.heroClass.id : undefined}>
				<HeaderText level={1}>{props.heroClass.name || 'Unnamed Class'}</HeaderText>
				<Markdown text={props.heroClass.description} />
				<Field label='Primary Characteristics' value={props.heroClass.primaryCharacteristics.join(', ')} />
				{
					props.mode === PanelMode.Full ?
						props.heroClass.featuresByLevel.filter(lvl => lvl.features.length > 0).map(lvl => (
							<Space key={lvl.level} direction='vertical'>
								<HeaderText level={1}>Level {lvl.level.toString()}</HeaderText>
								<div className='features'>
									{...lvl.features.map(f => <SelectablePanel key={f.id}><FeaturePanel feature={f} hero={props.hero} sourcebooks={props.sourcebooks} mode={PanelMode.Full} /></SelectablePanel>)}
								</div>
							</Space>
						))
						: null
				}
				{
					(props.mode === PanelMode.Full) && (props.heroClass.abilities.length > 0) ?
						<Space direction='vertical'>
							<HeaderText level={1}>Abilities</HeaderText>
							<div className='abilities'>
								{...props.heroClass.abilities.map(a => <SelectablePanel key={a.id}><AbilityPanel ability={a} hero={props.hero} mode={PanelMode.Full} /></SelectablePanel>)}
							</div>
						</Space>
						: null
				}
				
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
