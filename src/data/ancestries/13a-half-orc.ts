import { Ancestry } from '../../models/ancestry';
import { Tier } from '../../enums/tier';
import { FactoryLogic } from '../../logic/factory-logic';
import { Characteristic } from '../../enums/characteristic';

export const halfOrc: Ancestry = {
	id: 'ancestry-half-orc',
	name: 'Half Orc',
	description: 'A powerful, fearsome kin from the outlands.',
	features: [
		FactoryLogic.feature.create({
			id: 'half-orc-feature-1a',
			name: 'Lethal',
			description: 'Once per battle, reroll a melee attack and use the roll you prefer as the result.',
			feats: [
				{
					tier: Tier.Champion,
					id: 'half-orc-feat-c',
					name: "Lethal",
					description: 'If the *lethal* attack reroll is a natural 16+, you can use *lethal* again later this battle.'
				}
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'half-orc-feature-2',
			name: 'Ability Score Increase',
			options: [
				{
					feature: FactoryLogic.feature.createCharacteristicBonus({
						id: 'half-orc-asi-str',
						characteristic: Characteristic.Strength,
						value: 2,

					}),
					value: 1,
				},
				{
					feature: FactoryLogic.feature.createCharacteristicBonus({
						id: 'half-orc-asi-dex',
						characteristic: Characteristic.Dexterity,
						value: 2,

					}),
					value: 1,
				},
			],
			count: 1
		})
	]
};
