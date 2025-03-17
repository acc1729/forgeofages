import { Button, Input, InputNumber, Space } from 'antd';
import { PanelMode } from '../../../../enums/panel-mode';
import { IconRelationship, Direction } from '../../../../models/icon-relationships';

import './icon-relationships-panel.scss';

interface Props {
	mode?: PanelMode;
	iconRelationships: IconRelationship[];
	setIconRelationships: (value: IconRelationship[]) => void;
}

const removeIndex = <T, >(array: T[], index: number): T[]  => {
	return array.slice(0, index).concat(array.slice(index + 1, array.length));
}

const toggleDirection = (direction: Direction): Direction => {
	switch (direction) {
		case Direction.Positive: return Direction.Conflicted;
		case Direction.Conflicted: return Direction.Negative;
		case Direction.Negative: return Direction.Positive;
	}
}

const getDirectionSymbol = (direction: Direction): string => {
	// These are some dumb emoji
	// Probably better to make these just the text "POSITIVE" and etc.
	// But this is more lit 
	switch (direction) {
		case Direction.Positive: return "\uD83E\uDD70";
		case Direction.Conflicted: return "\uD83D\uDE2C";
		case Direction.Negative: return "\uD83D\uDE20";
	}
}

export const IconRelationshipsPanel = (props: Props) => {
	const iconRelationships = props.iconRelationships || [
		{icon: "Some Good Guy", direction: Direction.Positive, value: 2},
		{icon: "Real Bad Guy", direction: Direction.Negative, value: 1}
	];
	const addNewIconRelationship = () => {
		const newIconRelationships = iconRelationships.concat({icon: "Placeholder...", direction: Direction.Positive, value: 1});
		props.setIconRelationships(newIconRelationships);
		
	}
	
	const removeIconRelationship = (index: number) => {
		props.setIconRelationships(removeIndex(iconRelationships, index));
	}

	const changeIconRelationshipIcon = (text: string, index: number) => {
		let irs = iconRelationships;
		irs[index].icon = text;
		props.setIconRelationships(irs);
	}

	const changeIconRelationshipDirection = (index: number) => {
		let irs = iconRelationships;
		console.log(irs);
		irs[index].direction = toggleDirection(irs[index].direction);
		console.log(irs);
		props.setIconRelationships(irs);
	}

	const changeIconRelationshipValue = (value: number, index: number) => {
		let irs = iconRelationships;
		irs[index].value = value;
		props.setIconRelationships(irs);
	}

	try {
		let className = 'icon-relationships-panel';
		if (props.mode !== PanelMode.Full) {
			className += ' compact';
		}

		return (
			<div className={className}>
				<Space direction='vertical' style={{ width: '100%' }}>
					{
						iconRelationships.map((ir, index) => {
							return (
							<Space.Compact key={`icon-relationship-${index}`}>
								<Input style={{ width: '85%' }} value={ir.icon} onChange={e => changeIconRelationshipIcon(e.target.value, index)} />
								<Button onClick={() => changeIconRelationshipDirection(index)} type="default">{getDirectionSymbol(ir.direction)}</Button>
								<InputNumber style={{ width: '15%' }} value={ir.value} onChange={e => changeIconRelationshipValue(e ?? 0, index)} />
								<Button onClick={() => removeIconRelationship(index)} type="default">&#128465;</Button>
							</Space.Compact>
						)}
					)}
					<Space.Compact>
						<Button onClick={addNewIconRelationship} type="primary">Add another Icon relationship...</Button>
					</Space.Compact>
				</Space>
			</div>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
