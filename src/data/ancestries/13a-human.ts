import { Ancestry } from '../../models/ancestry';
import { FactoryLogic } from '../../logic/factory-logic';
import { Characteristic } from '../../enums/characteristic';

export const human: Ancestry = {
	id: 'ancestry-human',
	name: 'Human',
	description: 'A human. You know what this is.',
	features: [
		FactoryLogic.feature.create({
			id: 'human-feature-1a',
			name: 'Quick to Fight',
			description: 'At the start of each battle, roll initiative twice and choose the result you want.'
		}),
		FactoryLogic.feature.createChoice({
			id: 'human-feature-2',
			name: 'Ability Score Increase',
			options: [
				{
					feature: FactoryLogic.feature.createCharacteristicBonus({
						id: 'human-asi-str',
						characteristic: Characteristic.Strength,
						value: 2,

					}),
					value: 1,
				},
				{
					feature: FactoryLogic.feature.createCharacteristicBonus({
						id: 'human-asi-con',
						characteristic: Characteristic.Constitution,
						value: 2,

					}),
					value: 1,
				},
				{
					feature: FactoryLogic.feature.createCharacteristicBonus({
						id: 'human-asi-dex',
						characteristic: Characteristic.Dexterity,
						value: 2,

					}),
					value: 1,
				},
				{
					feature: FactoryLogic.feature.createCharacteristicBonus({
						id: 'human-asi-int',
						characteristic: Characteristic.Intelligence,
						value: 2,

					}),
					value: 1,
				},
				{
					feature: FactoryLogic.feature.createCharacteristicBonus({
						id: 'human-asi-wis',
						characteristic: Characteristic.Wisdom,
						value: 2,

					}),
					value: 1,
				},
				{
					feature: FactoryLogic.feature.createCharacteristicBonus({
						id: 'human-asi-cha',
						characteristic: Characteristic.Charisma,
						value: 2,

					}),
					value: 1,
				},
			],
			count: 1
		})
	]
};
