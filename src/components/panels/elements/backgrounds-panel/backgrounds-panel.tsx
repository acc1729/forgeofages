import { Button, Input, InputNumber, Space } from 'antd';
import { PanelMode } from '../../../../enums/panel-mode';
import { Background } from '../../../../models/backgrounds';

import './backgrounds-panel.scss';

interface Props {
	mode?: PanelMode;
	backgrounds: Background[];
	setBackgrounds: (value: Background[]) => void;
}

const removeIndex = <T, >(array: T[], index: number): T[]  => {
	return array.slice(0, index).concat(array.slice(index + 1, array.length));
}

export const BackgroundsPanel = (props: Props) => {
	const backgrounds = props.backgrounds || [
		{background: "First Background", value: 5},
		{background: "Second Background", value: 3}
	];
	const addNewBackground = () => {
		const newBackgrounds = backgrounds.concat({background: "Placeholder...", value: 1});
		props.setBackgrounds(newBackgrounds);
		
	}
	
	const removeBackground = (index: number) => {
		props.setBackgrounds(removeIndex(backgrounds, index));
	}

	const changeBackgroundName = (text: string, index: number) => {
		let bgs = backgrounds;
		bgs[index].background = text;
		props.setBackgrounds(bgs);
	}

	const changeBackgroundValue = (value: number, index: number) => {
		let bgs = backgrounds;
		bgs[index].value = value;
		props.setBackgrounds(bgs);
	}

	try {
		let className = 'ability-panel';
		if (props.mode !== PanelMode.Full) {
			className += ' compact';
		}

		return (
			<div className={className}>
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						backgrounds.map((bg, index) => {
							return (
							<Space.Compact key={`background-${index}`}>
								<Input style={{ width: '85%' }} value={bg.background} onChange={e => changeBackgroundName(e.target.value, index)} />
								<InputNumber style={{ width: '15%' }} value={bg.value} onChange={e => changeBackgroundValue(e ?? 0, index)} />
								<Button onClick={() => removeBackground(index)} type="default">&#128465;</Button>
							</Space.Compact>
						)}
					)}
					<Space.Compact>
						<Button onClick={addNewBackground} type="primary">Add another background...</Button>
					</Space.Compact>
				</Space>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
