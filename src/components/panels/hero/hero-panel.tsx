import { Col, Row, Segmented, Statistic } from 'antd';
import { Monster, MonsterGroup } from '../../../models/monster';
import { ReactNode, useState } from 'react';
import { Ability } from '../../../models/ability';
import { AbilityLogic } from '../../../logic/ability-logic';
import { AbilityPanel } from '../elements/ability-panel/ability-panel';
import { AbilityUsage } from '../../../enums/ability-usage';
import { Ancestry } from '../../../models/ancestry';
import { Career } from '../../../models/career';
import { Characteristic } from '../../../enums/characteristic';
import { Complication } from '../../../models/complication';
import { ConditionLogic } from '../../../logic/condition-logic';
import { ConditionType } from '../../../enums/condition-type';
import { Culture } from '../../../models/culture';
import { Domain } from '../../../models/domain';
import { Feature } from '../../../models/feature';
import { FeaturePanel } from '../elements/feature-panel/feature-panel';
import { FeatureType } from '../../../enums/feature-type';
import { Field } from '../../controls/field/field';
import { FormatLogic } from '../../../logic/format-logic';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { HeroClass } from '../../../models/class';
import { HeroLogic } from '../../../logic/hero-logic';
import { HeroStatePage } from '../../../enums/hero-state-page';
import { Kit } from '../../../models/kit';
import { MonsterLogic } from '../../../logic/monster-logic';
import { Options } from '../../../models/options';
import { PanelMode } from '../../../enums/panel-mode';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../models/sourcebook';
import { useMediaQuery } from '../../../hooks/use-media-query';

import './hero-panel.scss';

interface Props {
	hero: Hero;
	sourcebooks: Sourcebook[];
	options?: Options;
	mode?: PanelMode;
	onSelectAncestry?: (ancestry: Ancestry) => void;
 	onSelectCulture?: (culture: Culture) => void;
 	onSelectCareer?: (career: Career) => void;
 	onSelectClass?: (heroClass: HeroClass) => void;
 	onSelectComplication?: (complication: Complication) => void;
 	onSelectDomain?: (domain: Domain) => void;
 	onSelectKit?: (kit: Kit) => void;
 	onSelectCompanion?: (monster: Monster, monsterGroup?: MonsterGroup) => void;
 	onSelectCharacteristic?: (characteristic: Characteristic) => void;
 	onSelectAbility?: (ability: Ability) => void;
 	onShowState?: (page: HeroStatePage) => void;
}

export const HeroPanel = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const [ tab, setTab ] = useState<string>('Hero');

	const getLeftColumn = (showBorder: boolean) => {
		const onSelectAncestry = () => {
			if (props.hero.ancestry && props.onSelectAncestry) {
				props.onSelectAncestry(props.hero.ancestry);
			}
		};

		const onSelectClass = () => {
			if (props.hero.class && props.onSelectClass) {
				props.onSelectClass(props.hero.class);
			}
		};

		const onSelectComplication = () => {
			if (props.hero.complication && props.onSelectComplication) {
				props.onSelectComplication(props.hero.complication);
			}
		};

		const onSelectDomain = (domain: Domain) => {
			if (props.onSelectDomain) {
				props.onSelectDomain(domain);
			}
		};

		const onSelectKit = (kit: Kit) => {
			if (props.onSelectKit) {
				props.onSelectKit(kit);
			}
		};

		const onSelectCompanion = (monster: Monster) => {
			if (props.onSelectCompanion) {
				props.onSelectCompanion(monster);
			}
		};

		return (
			<div className={showBorder ? 'hero-left-column border' : 'hero-left-column'}>
				{
					props.hero.ancestry ?
						<div className='overview-tile clickable' onClick={onSelectAncestry}>
							<HeaderText>Kin</HeaderText>
							<Field label='Kin' value={props.hero.ancestry.name} />
						</div>
						:
						<div className='overview-tile'>
							<div className='ds-text dimmed-text'>No kin chosen</div>
						</div>
				}
				{
					props.hero.class ?
						<div className='overview-tile clickable' onClick={onSelectClass}>
							<HeaderText>Class</HeaderText>
							<Field label='Class' value={props.hero.class.name} />
							<Field label='Level' value={props.hero.class.level} />
						</div>
						:
						<div className='overview-tile'>
							<div className='ds-text dimmed-text'>No class chosen</div>
						</div>
				}
				{
					HeroLogic.getDomains(props.hero).length > 0 ?
						HeroLogic.getDomains(props.hero).map(domain => (
							<div key={domain.id} className='overview-tile clickable' onClick={() => onSelectDomain(domain)}>
								<HeaderText>Domain</HeaderText>
								<Field label='Domain' value={domain.name} />
							</div>
						))
						:
						null
				}
				{
					HeroLogic.getKits(props.hero).length > 0 ?
						HeroLogic.getKits(props.hero).map(kit => (
							<div key={kit.id} className='overview-tile clickable' onClick={() => onSelectKit(kit)}>
								<HeaderText>Kit</HeaderText>
								<Field label='Kit' value={kit.name} />
								{kit.armor.length > 0 ? <Field label='Armor' value={kit.armor.join(', ')} /> : null}
								{kit.weapon.length > 0 ? <Field label='Weapons' value={kit.weapon.join(', ')} /> : null}
							</div>
						))
						:
						null
				}
				{
					props.hero.complication ?
						<div className='overview-tile clickable' onClick={onSelectComplication}>
							<HeaderText>Complication</HeaderText>
							<Field label='Complication' value={props.hero.complication.name} />
						</div>
						:
						null
				}
				{
					HeroLogic.getCompanions(props.hero).length > 0 ?
						HeroLogic.getCompanions(props.hero).map(monster => (
							<div key={monster.id} className='overview-tile clickable' onClick={() => onSelectCompanion(monster)}>
								<HeaderText>Companion</HeaderText>
								<Field label='Name' value={MonsterLogic.getMonsterName(monster)} />
							</div>
						))
						:
						null
				}
			</div>
		);
	};

	const getRightColumn = (showBorder: boolean) => {
		return (
			<div className={showBorder ? 'hero-right-column border' : 'hero-right-column'}>
				<div className='overview-tile'>
					<HeaderText>One Unique Thing</HeaderText>
					<div className='ds-text'>{props.hero.oneUniqueThing}</div>
				</div>
				<div className='overview-tile'>
					<HeaderText>Backgrounds</HeaderText>
					{
						props.hero.backgrounds.length > 0 ? 
							props.hero.backgrounds.map(bg => (
								<div key={bg.background} className='ds-text'>{bg.background} +{bg.value}</div>
							))
							:
							<div className='ds-text dimmed-text'>None</div>
					}
				</div>
				<div className='overview-tile'>
					<HeaderText>Icon Relationships</HeaderText>
					{
						props.hero.iconRelationships.length > 0 ? 
							props.hero.iconRelationships.map(ir => (
								<div>
									<div key={ir.icon} className='ds-text'>{ir.icon}</div>
									<div key={ir.icon} className='ds-text bold-text small-text uppercase'>{ir.direction } {ir.value}</div>
								</div>
							))
							:
							<div className='ds-text dimmed-text'>None</div>
					}
				</div>
			</div>
		);
	};

	const getStatsSection = () => {
		if (!props.hero.class) return null;
		const defenses = HeroLogic.getDefenses(props.hero);
		
		const maxHitPoints = HeroLogic.getHitPoints(props.hero);
		const hitPoints = maxHitPoints - props.hero.state.hitPointsLost;
		const hitPointsSuffix = props.hero.state.hitPointsLost === 0 ? null : `/ ${maxHitPoints}`;

		const sizeSmall = {
			xs: 24,
			sm: 24,
			md: 24,
			lg: 10,
			xl: 10,
			xxl: 5
		};

		const sizeLarge = {
			xs: 24,
			sm: 24,
			md: 24,
			lg: 14,
			xl: 14,
			xxl: 7
		};

		const onSelectCharacteristic = (characteristic: Characteristic) => {
			if (props.onSelectCharacteristic) {
				props.onSelectCharacteristic(characteristic);
			}
		};

		const onShowHero = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Hero);
			}
		};

		return (
			<Row gutter={[ 16, 16 ]}>
				<Col span={24}>
					<div className='characteristics-box'>
						<div className='characteristic'>Attributes</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Strength)}>
							<Statistic title='Strength' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Strength)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Constitution)}>
							<Statistic title='Constitution' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Constitution)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Dexterity)}>
							<Statistic title='Dexterity' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Dexterity)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Intelligence)}>
							<Statistic title='Intelligence' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Intelligence)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Wisdom)}>
							<Statistic title='Wisdom' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Wisdom)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Charisma)}>
							<Statistic title='Charisma' value={HeroLogic.getCharacteristic(props.hero, Characteristic.Charisma)} />
						</div>
					</div>
				</Col>
				<Col span={24}>
					<div className='characteristics-box'>
						<div className='characteristic'>Bonus</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Strength)}>
							<Statistic title='Strength' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Strength))} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Constitution)}>
							<Statistic title='Constitution' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Constitution))} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Dexterity)}>
							<Statistic title='Dexterity' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Dexterity))} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Intelligence)}>
							<Statistic title='Intelligence' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Intelligence))} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Wisdom)}>
							<Statistic title='Wisdom' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Wisdom))} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Charisma)}>
							<Statistic title='Charisma' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Charisma))} />
						</div>
					</div>
				</Col>
				<Col span={24}>
					<div className='characteristics-box'>
						<div className='characteristic'>Bonus + Level</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Strength)}>
							<Statistic title='Strength' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Strength) + props.hero.class.level)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Constitution)}>
							<Statistic title='Constitution' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Constitution) + props.hero.class.level)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Dexterity)}>
							<Statistic title='Dexterity' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Dexterity) + props.hero.class.level)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Intelligence)}>
							<Statistic title='Intelligence' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Intelligence) + props.hero.class.level)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Wisdom)}>
							<Statistic title='Wisdom' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Wisdom) + props.hero.class.level)} />
						</div>
						<div className='characteristic clickable' onClick={() => onSelectCharacteristic(Characteristic.Charisma)}>
							<Statistic title='Charisma' value={FormatLogic.getBonus(HeroLogic.getCharacteristicBonus(props.hero, Characteristic.Charisma) + props.hero.class.level)} />
						</div>
					</div>
				</Col>
				<Col xs={sizeLarge.xs} sm={sizeLarge.sm} md={sizeLarge.md} lg={sizeLarge.lg} xl={sizeLarge.xl} xxl={sizeLarge.xxl}>
					<div className='characteristics-box clickable' onClick={onShowHero}>
						<div className='characteristic'>
							<Statistic title='Hit Points' value={hitPoints} suffix={hitPointsSuffix} />
						</div>
						<div className='characteristic'>
							<Statistic title='Recoveries' value={8} />
						</div>
					</div>
				</Col>
				<Col xs={sizeLarge.xs} sm={sizeLarge.sm} md={sizeLarge.md} lg={sizeLarge.lg} xl={sizeLarge.xl} xxl={sizeLarge.xxl}>
					<div className='characteristics-box clickable' onClick={onShowHero}>
						<div className='characteristic'>
							<Statistic title='Armor Class' value={defenses.armor} />
						</div>
						{defenses.armorWithShield !== null ?
							<div className='characteristic'>
								<Statistic title='AC with Shield' value={defenses.armorWithShield} />
							</div>
						 : null}
						<div className='characteristic'>
							<Statistic title='Physical Defense' value={defenses.physical} />
						</div>
						<div className='characteristic'>
							<Statistic title='Mental Defense' value={defenses.mental} />
						</div>
					</div>
				</Col>
				<Col xs={sizeLarge.xs} sm={sizeLarge.sm} md={sizeLarge.md} lg={sizeLarge.lg} xl={sizeLarge.xl} xxl={sizeLarge.xxl}>
					<div className='characteristics-box clickable' onClick={onShowHero}>
						<div className='characteristic'>
							<Statistic title='Melee Attack (1H)' value={FormatLogic.getHitBonus(HeroLogic.getBasicAttackHitBonus(props.hero, "oneHanded"))} suffix={FormatLogic.getDamageRoll(HeroLogic.getBasicAttackDamageRoll(props.hero, "oneHanded"))} />
						</div>
						<div className='characteristic'>
							<Statistic title='Melee Attack (2H)' value={FormatLogic.getHitBonus(HeroLogic.getBasicAttackHitBonus(props.hero, "twoHanded"))} suffix={FormatLogic.getDamageRoll(HeroLogic.getBasicAttackDamageRoll(props.hero, "twoHanded"))} />
						</div>
						<div className='characteristic'>
							<Statistic title='Ranged' value={FormatLogic.getHitBonus(HeroLogic.getBasicAttackHitBonus(props.hero, "ranged"))} suffix={FormatLogic.getDamageRoll(HeroLogic.getBasicAttackDamageRoll(props.hero, "ranged"))} />
						</div>
					</div>
				</Col>
			</Row>
		);
	};

	const getConditionsSection = () => {
		if (props.hero.state.conditions.length === 0) {
			return null;
		}

		const showConditions = () => {
			if (props.onShowState) {
				props.onShowState(HeroStatePage.Conditions);
			}
		};

		return (
			<div className='conditions-section'>
				<HeaderText level={1}>Conditions</HeaderText>
				<div className='conditions-grid'>
					{
						props.hero.state.conditions.map(c => (
							<div key={c.id} className='condition-tile' onClick={showConditions}>
								<HeaderText>{c.type}: {c.ends}</HeaderText>
								<div className='ds-text'>
									{
										c.type === ConditionType.Custom ?
											c.text || 'A custom condition.'
											:
											ConditionLogic.getDescription(c.type)
									}
								</div>
							</div>
						))
					}
				</div>
			</div>
		);
	};

	const getFeaturesSection = (header?: string) => {
		const featureTypes = [ FeatureType.Text, FeatureType.Package ];

		const features = HeroLogic.getFeatures(props.hero)
			.filter(feature => featureTypes.includes(feature.type));
		const talents = HeroLogic.getTalents(props.hero) as unknown as Feature[];

		if (features.length + talents.length === 0) {
			return null;
		}

		return (
			<div className='features-section'>
				{header ? <HeaderText level={1}>{header}</HeaderText> : null}
				<div className='features-grid'>
					{
						features.concat(talents).map(feature => (
							<FeaturePanel
								key={feature.id}
								feature={feature}
								hero={props.hero}
								sourcebooks={props.sourcebooks}
								mode={PanelMode.Full}
							/>
						))
					}
				</div>
			</div>
		);
	};

	const getAbilitiesSection = (abilities: Ability[], header?: string) => {
		if (abilities.length === 0) {
			return null;
		}

		const showAbility = (ability: Ability) => {
			if (props.onSelectAbility) {
				props.onSelectAbility(ability);
			}
		};

		return (
			<div className='abilities-section'>
				{header ? <HeaderText level={1}>{header}</HeaderText> : null}
				<div className='abilities-grid'>
					{
						abilities.map(ability => (
							<SelectablePanel key={ability.id} style={ header ? { gridColumn: `span ${AbilityLogic.panelWidth(ability)}` } : undefined} onSelect={() => showAbility(ability)}>
								<AbilityPanel ability={ability} hero={props.hero} options={props.options} mode={PanelMode.Full} />
							</SelectablePanel>
						))
					}
				</div>
			</div>
		);
	};

	try {
		if (props.mode !== PanelMode.Full) {
			const domains = HeroLogic.getDomains(props.hero);
			const kits = HeroLogic.getKits(props.hero);

			return (
				<div className='hero-panel compact'>
					<HeaderText level={1} tags={props.hero.folder ? [ props.hero.folder ] : []}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
					<Field label='Ancestry' value={props.hero.ancestry?.name || 'No ancestry'} />
					<Field label='Career' value={props.hero.career?.name || 'No career'} />
					<Field label='Class' value={props.hero.class?.name || 'No class'} />
					{props.hero.class ? <Field label='Level' value={props.hero.class.level} /> : null}
					{domains.length > 0 ? <Field label='Domain' value={domains.map(d => d.name).join(', ')} /> : null}
					{kits.length > 0 ? <Field label='Kit' value={kits.map(k => k.name).join(', ')} /> : null}
				</div>
			);
		}

		const abilities = HeroLogic.getAbilities(props.hero, true, props.options?.showFreeStrikes || false, props.options?.showStandardAbilities || false);
		const actions = abilities.filter(a => a.type.usage === AbilityUsage.Action);
		const maneuvers = abilities.filter(a => a.type.usage === AbilityUsage.Maneuver);
		const moves = abilities.filter(a => a.type.usage === AbilityUsage.Move);
		const triggers = abilities.filter(a => a.type.usage === AbilityUsage.Trigger);
		const others = abilities.filter(a => a.type.usage === AbilityUsage.Other);
		const noactions = abilities.filter(a => a.type.usage === AbilityUsage.NoAction);

		if (isSmall) {
			const tabs = [ 'Hero', 'Statistics', 'Features' ];
			if (actions.length > 0) {
				tabs.push('Actions');
			}
			if (maneuvers.length > 0) {
				tabs.push('Maneuvers');
			}
			if (triggers.length > 0) {
				tabs.push('Triggers');
			}
			if ((moves.length + others.length + noactions.length) > 0) {
				tabs.push('Others');
			}

			let content: ReactNode;
			switch (tab) {
				case 'Hero':
					content = (
						<>
							<HeaderText tags={props.hero.folder ? [ props.hero.folder ] : []}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
							{getLeftColumn(false)}
							{getRightColumn(false)}
						</>
					);
					break;
				case 'Statistics':
					content = (
						<>
							{getStatsSection()}
							{getConditionsSection()}
						</>
					);
					break;
				case 'Features':
					content = getFeaturesSection();
					break;
				case 'Actions':
					content = getAbilitiesSection(actions);
					break;
				case 'Maneuvers':
					content = getAbilitiesSection(maneuvers);
					break;
				case 'Triggers':
					content = getAbilitiesSection(triggers);
					break;
				case 'Others':
					content = getAbilitiesSection([ ...moves, ...others, ...noactions ]);
					break;
			}

			return (
				<div className='hero-panel small' id={props.hero.id}>
					<Segmented
						name='sections'
						style={{ position: 'sticky', top: '0px', borderRadius: '0' }}
						options={
							tabs.map(tab => ({
								value: tab,
								label: <div className='page-button-title'>{tab}</div>
							}))
						}
						block={true}
						value={tab}
						onChange={setTab}
					/>
					<div className='hero-main-section'>
						<div className='hero-main-column'>
							{content}
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className='hero-panel' id={props.hero.id}>
				<div className='hero-main-section' id='stats'>
					{getLeftColumn(true)}
					<div className='hero-main-column'>
						<HeaderText level={1} tags={props.hero.folder ? [ props.hero.folder ] : []}>{props.hero.name || 'Unnamed Hero'}</HeaderText>
						{getStatsSection()}
						{getConditionsSection()}
						{getFeaturesSection('Features and Talents')}
					</div>
					{getRightColumn(true)}
				</div>
				{
					actions.length > 0 ?
						<div className='hero-main-section' id='actions'>
							<div className='hero-main-column'>
								{getAbilitiesSection(actions, 'Actions')}
							</div>
						</div>
						: null
				}
				{
					maneuvers.length > 0 ?
						<div className='hero-main-section' id='maneuvers'>
							<div className='hero-main-column'>
								{getAbilitiesSection(maneuvers, 'Maneuvers')}
							</div>
						</div>
						: null
				}
				{
					moves.length > 0 ?
						<div className='hero-main-section' id='moves'>
							<div className='hero-main-column'>
								{getAbilitiesSection(moves, 'Move Actions')}
							</div>
						</div>
						: null
				}
				{
					triggers.length > 0 ?
						<div className='hero-main-section' id='triggers'>
							<div className='hero-main-column'>
								{getAbilitiesSection(triggers, 'Triggered Actions')}
							</div>
						</div>
						: null
				}
				{
					others.length > 0 ?
						<div className='hero-main-section' id='others'>
							<div className='hero-main-column'>
								{getAbilitiesSection(others, 'Other Actions')}
							</div>
						</div>
						: null
				}
				{
					noactions.length > 0 ?
						<div className='hero-main-section' id='none'>
							<div className='hero-main-column'>
								{getAbilitiesSection(noactions, 'No Action')}
							</div>
						</div>
						: null
				}
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
