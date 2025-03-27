import { Ancestry } from '../../models/ancestry';
import { Tier } from '../../enums/tier';
import { FactoryLogic } from '../../logic/factory-logic';
import { Characteristic } from '../../enums/characteristic';

export const dwarf: Ancestry = {
	id: 'ancestry-dwarf',
	name: 'Dwarf',
	description: 'A dwarf. Hardy, stocky creatures fond of drink and industry.',
	features: [
		FactoryLogic.feature.create({
			id: 'dwarf-feature-1a',
			name: 'That\'s your best shot?',
			description: 'Once per battle as a free action after you have been hit by an enemy attack, you can heal using a recovery. If the escalation die is less than 2, you only get half the usual haling from the recovery. Unlike othr recovries that might allow you to take an average result, you have to roll this one!\nNote that you can\'t use this ability if the attack drops you to 0 hp or below. You\'ve got to be on your feet to sneer at their attack and recover.',
			feats: [
				{
					tier: Tier.Champion,
					id: 'dwarf-feat-c',
					name: "That's your best shot?",
					description: 'When your ranged attack targets an enemy who is engaged with an ally, you have no chance of hitting that ally.'
				}
			]
		}),
		FactoryLogic.feature.createChoice({
			id: 'dwarf-feature-2',
			name: 'Ability Score Increase',
			options: [
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
						id: 'human-asi-wis',
						characteristic: Characteristic.Wisdom,
						value: 2,

					}),
					value: 1,
				},
			],
			count: 1
		})
	]
};
