import { Button, Popover } from 'antd';
import { CloseOutlined, EditOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { Playbook, PlaybookElementKind } from '../../../../models/playbook';
import { Adventure } from '../../../../models/adventure';
import { AdventurePanel } from '../../../panels/elements/adventure-panel/adventure-panel';
import { AppHeader } from '../../../panels/app-header/app-header';
import { DangerButton } from '../../../controls/danger-button/danger-button';
import { Element } from '../../../../models/element';
import { Encounter } from '../../../../models/encounter';
import { EncounterPanel } from '../../../panels/elements/encounter-panel/encounter-panel';
import { Format } from '../../../../utils/format';
import { Montage } from '../../../../models/montage';
import { MontagePanel } from '../../../panels/elements/montage-panel/montage-panel';
import { Negotiation } from '../../../../models/negotiation';
import { NegotiationPanel } from '../../../panels/elements/negotiation-panel/negotiation-panel';
import { Options } from '../../../../models/options';
import { OptionsPanel } from '../../../panels/options/options-panel';
import { PanelMode } from '../../../../enums/panel-mode';
import { PlaybookLogic } from '../../../../logic/playbook-logic';
import { ReactNode } from 'react';
import { Sourcebook } from '../../../../models/sourcebook';
import { useNavigation } from '../../../../hooks/use-navigation';
import { useParams } from 'react-router';

import './playbook-view-page.scss';

interface Props {
	playbook: Playbook;
	sourcebooks: Sourcebook[];
	options: Options;
	showDirectory: () => void;
	showAbout: () => void;
	showRoll: () => void;
	export: (kind: PlaybookElementKind, element: Element, format: 'image' | 'pdf' | 'json') => void;
	delete: (kind: PlaybookElementKind, element: Element) => void;
	setOptions: (options: Options) => void;
}

export const PlaybookViewPage = (props: Props) => {
	const navigation = useNavigation();
	const { kind, elementID } = useParams<{ kind: PlaybookElementKind, elementID: string }>();

	let element: Element | null = null;
	let panel: ReactNode | null = null;
	switch (kind) {
		case 'adventure':
			element = props.playbook.adventures.find(x => x.id === elementID) as Adventure;
			panel = (
				<AdventurePanel
					adventure={element as Adventure}
					mode={PanelMode.Full}
					playbook={props.playbook}
					sourcebooks={props.sourcebooks}
					options={props.options}
					allowSelection={true}
				/>
			);
			break;
		case 'encounter':
			element = props.playbook.encounters.find(x => x.id === elementID) as Element;
			panel = (
				<EncounterPanel
					encounter={element as Encounter}
					playbook={props.playbook}
					sourcebooks={props.sourcebooks}
					options={props.options}
					mode={PanelMode.Full}
					showDifficulty={true}
				/>
			);
			break;
		case 'montage':
			element = props.playbook.montages.find(x => x.id === elementID) as Montage;
			panel = (
				<MontagePanel
					montage={element as Montage}
					mode={PanelMode.Full}
				/>
			);
			break;
		case 'negotiation':
			element = props.playbook.negotiations.find(x => x.id === elementID) as Negotiation;
			panel = (
				<NegotiationPanel
					negotiation={element as Negotiation}
					mode={PanelMode.Full}
				/>
			);
			break;
	}

	if (!element || !panel) {
		return null;
	}

	try {
		return (
			<div className='playbook-view-page'>
				<AppHeader subheader={Format.capitalize(kind!)} showDirectory={props.showDirectory} showAbout={props.showAbout} showRoll={props.showRoll}>
					<Button icon={<CloseOutlined />} onClick={() => navigation.goToPlaybookList(kind!)}>
						Close
					</Button>
					<div className='divider' />
					<Button icon={<EditOutlined />} onClick={() => navigation.goToPlaybookEdit(kind!, elementID!)}>
						Edit
					</Button>
					<Popover
						trigger='click'
						placement='bottom'
						content={(
							<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
								<Button onClick={() => props.export(kind!, element, 'image')}>Export As Image</Button>
								<Button onClick={() => props.export(kind!, element, 'pdf')}>Export As PDF</Button>
								<Button onClick={() => props.export(kind!, element, 'json')}>Export as Data</Button>
							</div>
						)}
					>
						<Button icon={<UploadOutlined />}>
							Export
						</Button>
					</Popover>
					<DangerButton
						disabled={PlaybookLogic.getUsedIn(props.playbook, element.id).length !== 0}
						onConfirm={() => props.delete(kind!, element)}
					/>
					{
						(kind === 'encounter') ?
							<div className='divider' />
							: null
					}
					{
						(kind === 'encounter') ?
							<Popover
								trigger='click'
								placement='bottom'
								content={(
									<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
										<OptionsPanel mode='encounter' options={props.options} setOptions={props.setOptions} />
									</div>
								)}
							>
								<Button icon={<SettingOutlined />}>
									Options
								</Button>
							</Popover>
							: null
					}
				</AppHeader>
				<div className='playbook-view-page-content'>
					{panel}
				</div>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
