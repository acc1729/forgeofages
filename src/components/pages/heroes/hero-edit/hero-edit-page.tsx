import { Alert, AutoComplete, Button, Divider, Input, Radio, Segmented, Select, Space } from 'antd';
import { CloseOutlined, SaveOutlined, SearchOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Feature, FeatureData } from '../../../../models/feature';
import { Hero, HeroEditTab } from '../../../../models/hero';
import { ReactNode, useMemo, useState } from 'react';
import { Ancestry } from '../../../../models/ancestry';
import { AncestryPanel } from '../../../panels/elements/ancestry-panel/ancestry-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { Background } from '../../../../models/backgrounds';
import { BackgroundsPanel } from '../../../panels/elements/backgrounds-panel/backgrounds-panel';
import { Characteristic } from '../../../../enums/characteristic';
import { ClassPanel } from '../../../panels/elements/class-panel/class-panel';
import { Collections } from '../../../../utils/collections';
import { Element } from '../../../../models/element';
import { FeatureLogic } from '../../../../logic/feature-logic';
import { FeaturePanel } from '../../../panels/elements/feature-panel/feature-panel';
import { Field } from '../../../controls/field/field';
import { Format } from '../../../../utils/format';
import { HeaderText } from '../../../controls/header-text/header-text';
import { HeroClass } from '../../../../models/class';
import { HeroCustomizePanel } from '../../../panels/hero-customize/hero-customize-panel';
import { HeroLogic } from '../../../../logic/hero-logic';
import { IconRelationship } from '../../../../models/icon-relationships';
import { IconRelationshipsPanel } from '../../../panels/elements/icon-relationships-panel/icon-relationships-panel';
import { NameGenerator } from '../../../../utils/name-generator';
import { NumberSpin } from '../../../controls/number-spin/number-spin';
import { PanelMode } from '../../../../enums/panel-mode';
import { SelectablePanel } from '../../../controls/selectable-panel/selectable-panel';
import { Sourcebook } from '../../../../models/sourcebook';
import { SourcebookLogic } from '../../../../logic/sourcebook-logic';
import { Utils } from '../../../../utils/utils';
import { useMediaQuery } from '../../../../hooks/use-media-query';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './hero-edit-page.scss';

enum PageState {
	Optional = 'Optional',
	NotStarted = 'Not Started',
	InProgress = 'In Progress',
	Completed = 'Completed'
}

const matchElement = (element: Element, searchTerm: string) => {
	const name = element.name.toLowerCase();
	const desc = element.description.toLowerCase();
	return searchTerm
		.toLowerCase()
		.split(' ')
		.some(token => name.includes(token) || desc.includes(token));
};

interface Props {
	heroes: Hero[];
	sourcebooks: Sourcebook[];
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	saveChanges: (hero: Hero) => void;
}

export const HeroEditPage = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const navigation = useNavigation();
	const { heroID, page } = useParams<{ heroID: string; page: HeroEditTab }>();
	const originalHero = useMemo(() => props.heroes.find(h => h.id === heroID)!, [ heroID, props.heroes ]);
	const [ hero, setHero ] = useState<Hero>(Utils.copy(originalHero));
	const [ dirty, setDirty ] = useState<boolean>(false);
	const [ searchTerm, setSearchTerm ] = useState<string>('');

	try {
		const getPageState = (page: HeroEditTab) => {
			switch (page) {
				case 'ancestry':
					if (hero.ancestry) {
						return (hero.ancestry.features.filter(f => FeatureLogic.isChoice(f)).filter(f => !FeatureLogic.isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case 'class':
					if (hero.class) {
						if (hero.class.characteristics.every(ch => ch.value === 0)) {
							return PageState.InProgress;
						}
						const level = hero.class.level;
						const features: Feature[] = [];
						hero.class.featuresByLevel
							.filter(lvl => lvl.level <= level)
							.forEach(lvl => features.push(...lvl.features));
						return (features.filter(f => FeatureLogic.isChoice(f)).filter(f => !FeatureLogic.isChosen(f)).length > 0) ? PageState.InProgress : PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
				case 'details':
					if (hero.name) {
						return PageState.Completed;
					} else {
						return PageState.NotStarted;
					}
			}
			return PageState.InProgress;
		};

		const setAncestry = (ancestry: Ancestry | null) => {
			const ancestryCopy = Utils.copy(ancestry) as Ancestry | null;
			const heroCopy = Utils.copy(hero);
			heroCopy.ancestry = ancestryCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setClass = (heroClass: HeroClass | null) => {
			const classCopy = Utils.copy(heroClass) as HeroClass | null;
			const heroCopy = Utils.copy(hero);
			heroCopy.class = classCopy;
			setHero(heroCopy);
			setDirty(true);
		};

		const setLevel = (level: number) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.class) {
				heroCopy.class.level = level;
				heroCopy.state.xp = HeroLogic.getMinXP(level);
			}
			HeroLogic
				.getCompanions(heroCopy)
				.forEach(m => {
					if (m.retainer) {
						m.retainer.level = Math.max(m.level, level);
					}
				});
			setHero(heroCopy);
			setDirty(true);
		};

		const setBackgrounds = (value: Background[]) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.backgrounds = value;
			setHero(heroCopy);
			setDirty(true);
		};

		const setCharacteristics = (array: { characteristic: Characteristic, value: number }[]) => {
			const heroCopy = Utils.copy(hero);
			if (heroCopy.class) {
				heroCopy.class.characteristics = array;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setFeature = (featureID: string, feature: Feature) => {
			const heroCopy = Utils.copy(hero);
			const index = heroCopy.features.findIndex(f => f.id === featureID);
			if (index !== -1) {
				heroCopy.features[index] = feature;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setFeatureData = (featureID: string, data: FeatureData) => {
			const heroCopy = Utils.copy(hero);
			const feature = HeroLogic.getFeatures(heroCopy).find(f => f.id === featureID);
			if (feature) {
				feature.data = data;
			}
			setHero(heroCopy);
			setDirty(true);
		};

		const setName = (value: string) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.name = value;
			setHero(heroCopy);
			setDirty(true);
		};

		const setOneUniqueThing = (value: string) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.oneUniqueThing = value;
			setHero(heroCopy);
			setDirty(true);
		};

		const setIconRelationships = (value: IconRelationship[]) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.iconRelationships = value;
			setHero(heroCopy);
			setDirty(true);
		};

		const setFolder = (value: string) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.folder = value;
			setHero(heroCopy);
			setDirty(true);
		};

		const setSettingIDs = (settingIDs: string[]) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.settingIDs = settingIDs;
			setHero(heroCopy);
			setDirty(true);
		};

		const addFeature = (feature: Feature) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.features.push(feature);
			setHero(heroCopy);
			setDirty(true);
		};

		const deleteFeature = (feature: Feature) => {
			const heroCopy = Utils.copy(hero);
			heroCopy.features = heroCopy.features.filter(f => f.id !== feature.id);
			setHero(heroCopy);
			setDirty(true);
		};

		const saveChanges = () => {
			props.saveChanges(hero);
			setDirty(false);
		};

		const selectRandom = () => {
			switch (page) {
				case 'ancestry':
					setAncestry(Collections.draw(SourcebookLogic.getAncestries(props.sourcebooks)));
					break;
				case 'class':
					setClass(Collections.draw(SourcebookLogic.getClasses(props.sourcebooks)));
					break;
			}
		};

		const getContent = () => {
			switch (page) {
				case 'ancestry':
					return (
						<AncestrySection
							hero={hero}
							sourcebooks={props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id))}
							searchTerm={searchTerm}
							selectAncestry={setAncestry}
							setFeatureData={setFeatureData}
						/>
					);
				case 'class':
					return (
						<ClassSection
							hero={hero}
							sourcebooks={props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id))}
							searchTerm={searchTerm}
							selectClass={setClass}
							setLevel={setLevel}
							setBackgrounds={setBackgrounds}
							selectCharacteristics={setCharacteristics}
							setFeatureData={setFeatureData}
						/>
					);
				case 'details':
					return (
						<DetailsSection
							hero={hero}
							allHeroes={props.heroes}
							sourcebooks={props.sourcebooks.filter(cs => hero.settingIDs.includes(cs.id))}
							allSourcebooks={props.sourcebooks}
							setName={setName}
							setOneUniqueThing={setOneUniqueThing}
							setBackgrounds={setBackgrounds}
							setIconRelationships={setIconRelationships}
							setFolder={setFolder}
							setSettingIDs={setSettingIDs}
							addFeature={addFeature}
							deleteFeature={deleteFeature}
							setFeature={setFeature}
							setFeatureData={setFeatureData}
						/>
					);
			}
		};

		let showSearchBar = false;
		if (!isSmall) {
			switch (page) {
				case 'ancestry':
					showSearchBar = !hero.ancestry;
					break;
				case 'class':
					showSearchBar = !hero.class;
					break;
			}
		}

		return (
			<div className='hero-edit-page'>
				<AppHeader subheader='Hero Builder' showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll}>
					<Button icon={<SaveOutlined />} type='primary' disabled={!dirty} onClick={saveChanges}>
						Save Changes
					</Button>
					<Button icon={<CloseOutlined />} onClick={() => navigation.goToHeroView(heroID!)}>
						Cancel
					</Button>
				</AppHeader>
				<div className={isSmall ? 'hero-edit-page-content small' : 'hero-edit-page-content'}>
					<div className='page-selector'>
						<Segmented<HeroEditTab>
							name='sections'
							options={([
								'ancestry',
								'class',
								'details'
							] as const).map(tab => ({
								value: tab,
								label: (
									<div className={`page-button ${getPageState(tab).toLowerCase().replace(' ', '-')}`}>
										<div className='page-button-title'>{Format.capitalize(tab, '-')}</div>
										<div className='page-button-subtitle'>{getPageState(tab)}</div>
									</div>
								)
							}))}
							block={true}
							value={page}
							onChange={value => navigation.goToHeroEdit(heroID!, value)}
						/>
					</div>
					{
						showSearchBar ?
							<div className='search-bar'>
								<Input
									placeholder='Search'
									allowClear={true}
									value={searchTerm}
									suffix={!searchTerm ? <SearchOutlined /> : null}
									onChange={e => setSearchTerm(e.target.value)}
								/>
								<Button disabled={!!searchTerm} icon={<ThunderboltOutlined />} onClick={selectRandom}>Random</Button>
							</div>
							: null
					}
					{getContent()}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface AncestrySectionProps {
	hero: Hero;
	sourcebooks: Sourcebook[];
	searchTerm: string;
	selectAncestry: (ancestry: Ancestry | null) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const AncestrySection = (props: AncestrySectionProps) => {
	try {
		const ancestries = SourcebookLogic.getAncestries(props.sourcebooks).filter(a => matchElement(a, props.searchTerm));
		const options = ancestries.map(a => (
			<SelectablePanel key={a.id} onSelect={() => props.selectAncestry(a)}>
				<AncestryPanel ancestry={a} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.ancestry) {
			choices = FeatureLogic.getFeaturesFromAncestry(props.hero.ancestry, props.hero)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} sourcebooks={props.sourcebooks} setData={props.setFeatureData} />
					</SelectablePanel>
				));
		}

		return (
			<div className='hero-edit-content'>
				{
					props.hero.ancestry ?
						<div className='hero-edit-content-column selected' id='ancestry-selected'>
							<SelectablePanel showShadow={false} action={{ label: 'Unselect', onClick: () => props.selectAncestry(null) }}>
								<AncestryPanel ancestry={props.hero.ancestry} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						: null
				}
				{
					!props.hero.ancestry && (options.length > 0) ?
						<div className='hero-edit-content-column grid' id='ancestry-list'>
							{options}
						</div>
						: null
				}
				{
					!props.hero.ancestry && (options.length === 0) ?
						<div className='hero-edit-content-column' id='ancestry-list'>
							<EmptyMessage hero={props.hero} />
						</div>
						: null
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column choices' id='ancestry-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
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


interface ClassSectionProps {
	hero: Hero;
	sourcebooks: Sourcebook[];
	searchTerm: string;
	selectClass: (heroClass: HeroClass | null) => void;
	setBackgrounds: (value: Background[]) => void;
	setLevel: (level: number) => void;
	selectCharacteristics: (array: { characteristic: Characteristic, value: number }[]) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const ClassSection = (props: ClassSectionProps) => {
	let currentArray = null;
	if (props.hero.class) {
		const cls = props.hero.class;
		const str = cls.characteristics
			.filter(ch => !cls.primaryCharacteristics.includes(ch.characteristic))
			.map(ch => ch.value)
			.join(', ');
		currentArray = HeroLogic.getCharacteristicArrays()
			.find(arr => Collections.getPermutations(arr).map(a => a.join(', ')).includes(str)) || null;
	}
	const [ array, setArray ] = useState<number[] | null>(currentArray);

	try {
		const classes = SourcebookLogic.getClasses(props.sourcebooks).filter(c => matchElement(c, props.searchTerm));
		const options = classes.map(c => (
			<SelectablePanel key={c.id} onSelect={() => props.selectClass(c)}>
				<ClassPanel heroClass={c} />
			</SelectablePanel>
		));

		let choices: ReactNode[] = [];
		if (props.hero.class) {
			choices = FeatureLogic.getFeaturesFromClass(props.hero.class, props.hero)
				.filter(f => FeatureLogic.isChoice(f))
				.map(f => (
					<SelectablePanel key={f.id}>
						<FeaturePanel feature={f} mode={PanelMode.Full} hero={props.hero} sourcebooks={props.sourcebooks} setData={props.setFeatureData} />
					</SelectablePanel>
				));

			//#region Choose characteristics

			const arrays = HeroLogic.getCharacteristicArrays();
			choices.unshift(
				<SelectablePanel key='characteristics'>
					<HeaderText>Characteristics</HeaderText>
					<Select
						style={{ width: '100%' }}
						className={array === null ? 'selection-empty' : ''}
						placeholder='Select characteristic array'
						options={arrays.map(a => ({ value: a.join(', '), array: a }))}
						optionRender={option => <div className='ds-text'>{option.data.value}</div>}
						value={array ? array.join(', ') : null}
						onChange={(_text, option) => {
							const data = option as unknown as { value: string, array: number[] };
							setArray(data.array);
						}}
					/>
					{
						array ?
							<div>
								<div className='characteristic-row' style={{ margin: '5px 15px', fontWeight: 600 }}>
									<div className='characteristic-item characteristic-heading'>STR</div>
									<div className='characteristic-item characteristic-heading'>CON</div>
									<div className='characteristic-item characteristic-heading'>DEX</div>
									<div className='characteristic-item characteristic-heading'>INT</div>
									<div className='characteristic-item characteristic-heading'>WIS</div>
									<div className='characteristic-item characteristic-heading'>CHA</div>
								</div>
								<Radio.Group
									style={{ width: '100%' }}
									value={JSON.stringify(props.hero.class.characteristics)}
									onChange={e => {
										const array = JSON.parse(e.target.value) as { characteristic: Characteristic, value: number }[];
										props.selectCharacteristics(array);
									}}
								>
									<Space direction='vertical' style={{ width: '100%' }}>
										{
											HeroLogic.calculateCharacteristicArrays(array, props.hero.class.primaryCharacteristics).map((array, n1) => (
												<Radio.Button key={n1} value={JSON.stringify(array)} style={{ width: '100%' }}>
													<div className='characteristic-row'>
														{array.map((ch, n2) => <div key={n2} className='characteristic-item'>{ch.value}</div>)}
													</div>
												</Radio.Button>
											))
										}
									</Space>
								</Radio.Group>
							</div>
							: null
					}
				</SelectablePanel>
			);

			//#endregion

			//#region Set level

			choices.unshift(
				<SelectablePanel key='class-level'>
					<HeaderText>Level</HeaderText>
					<NumberSpin
						value={props.hero.class.level}
						min={1}
						max={props.hero.class.featuresByLevel.length}
						onChange={value => props.setLevel(value)}
					/>
					<Field label='XP' value={props.hero.state.xp} />
				</SelectablePanel>
			);

			//#endregion
		}

		return (
			<div className='hero-edit-content'>
				{
					props.hero.class ?
						<div className='hero-edit-content-column selected' id='class-selected'>
							<SelectablePanel showShadow={false} action={{ label: 'Unselect', onClick: () => props.selectClass(null) }}>
								<ClassPanel heroClass={props.hero.class} mode={PanelMode.Full} />
							</SelectablePanel>
						</div>
						: null
				}
				{
					!props.hero.class && (options.length > 0) ?
						<div className='hero-edit-content-column grid' id='class-list'>
							{options}
						</div>
						: null
				}
				{
					!props.hero.class && (options.length === 0) ?
						<div className='hero-edit-content-column' id='class-list'>
							<EmptyMessage hero={props.hero} />
						</div>
						: null
				}
				{
					choices.length > 0 ?
						<div className='hero-edit-content-column choices' id='class-choices'>
							<HeaderText>Choices</HeaderText>
							{choices}
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


interface DetailsSectionProps {
	hero: Hero;
	allHeroes: Hero[];
	sourcebooks: Sourcebook[];
	allSourcebooks: Sourcebook[];
	setName: (value: string) => void;
	setOneUniqueThing: (value: string) => void;
	setBackgrounds: (value: Background[]) => void;
	setIconRelationships: (value: IconRelationship[]) => void;
	setFolder: (value: string) => void;
	setSettingIDs: (settingIDs: string[]) => void;
	addFeature: (feature: Feature) => void;
	deleteFeature: (feature: Feature) => void;
	setFeature: (featureID: string, feature: Feature) => void;
	setFeatureData: (featureID: string, data: FeatureData) => void;
}

const DetailsSection = (props: DetailsSectionProps) => {
	const folders = props.allHeroes
		.map(h => h.folder)
		.filter(f => !!f)
		.sort();

	try {
		return (
			<div className='hero-edit-content'>
				<div className='hero-edit-content-column choices' id='details-main'>
					<HeaderText>Name</HeaderText>
					<Input
						className={props.hero.name === '' ? 'input-empty' : ''}
						placeholder='Name'
						allowClear={true}
						addonAfter={<ThunderboltOutlined className='random-btn' onClick={() => props.setName(NameGenerator.generateName())} />}
						value={props.hero.name}
						onChange={e => props.setName(e.target.value)}
					/>
					<HeaderText>One Unique Thing (OUT)</HeaderText>
					<Input
						className={props.hero.oneUniqueThing === '' ? 'input-empty' : ''}
						placeholder='One Unique Thing'
						allowClear={true}
						value={props.hero.oneUniqueThing}
						onChange={e => props.setOneUniqueThing(e.target.value)}
					/>
					<HeaderText>Backgrounds</HeaderText>
					<BackgroundsPanel
						mode={PanelMode.Full}
						backgrounds={props.hero.backgrounds}
						setBackgrounds={props.setBackgrounds}
					/>
					<HeaderText>Icon Relationships</HeaderText>
					<IconRelationshipsPanel
						mode={PanelMode.Full}
						iconRelationships={props.hero.iconRelationships}
						setIconRelationships={props.setIconRelationships}
					/>
					<HeaderText>Folder</HeaderText>
					<AutoComplete
						value={props.hero.folder}
						options={Collections.distinct(folders, f => f).map(option => ({ value: option, label: <div className='ds-text'>{option}</div> }))}
						placeholder='Folder'
						onSelect={value => props.setFolder(value)}
						onChange={value => props.setFolder(value)}
						filterOption={(value, option) => value.toLowerCase().split(' ').every(token => option!.value.toLowerCase().indexOf(token.toLowerCase()) !== -1)}
					/>
					<HeaderText>Sourcebooks</HeaderText>
					<Select
						style={{ width: '100%' }}
						placeholder='Select'
						mode='multiple'
						options={props.allSourcebooks.map(cs => ({ value: cs.id, label: cs.name || 'Unnamed Collection' }))}
						optionRender={option => <div className='ds-text'>{option.data.label}</div>}
						value={props.hero.settingIDs}
						onChange={props.setSettingIDs}
					/>
				</div>
				<div className='hero-edit-content-column choices' id='details-features'>
					<HeaderText>Customize</HeaderText>
					<HeroCustomizePanel
						hero={props.hero}
						sourcebooks={props.sourcebooks}
						addFeature={props.addFeature}
						setFeature={props.setFeature}
						setFeatureData={props.setFeatureData}
						deleteFeature={props.deleteFeature}
					/>
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};

interface EmptyMessageProps {
	hero: Hero;
}

const EmptyMessage = (props: EmptyMessageProps) => {
	const navigation = useNavigation();

	try {
		return (
			<Alert
				type='info'
				showIcon={true}
				message={
					<div>
						Looking for something specific? If it's homebrew, make sure you&apos;ve included the sourcebook it&apos;s in.
						<Divider type='vertical' />
						<Button type='primary' onClick={() => navigation.goToHeroEdit(props.hero.id, 'details')}>
							Click Here
						</Button>
					</div>
				}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
