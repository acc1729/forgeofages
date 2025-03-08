import { Characteristic } from '../../enums/characteristic';
import { Tier } from '../../enums/tier';
import { FactoryLogic } from '../../logic/factory-logic';
import { HeroClass } from '../../models/class';

export const barbarian: HeroClass = {
	id: 'class-barbarian',
	name: 'Barbarian',
	description: `Fill this in later I guess.`,
	primaryCharacteristics: [ Characteristic.Strength, Characteristic.Constitution ],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'barbarian-rage',
					name: 'Barbarian Rage',
					description: `Once per day, use a quick action to start raging; a rage lasts until the end of battle (or around five minutes, if you decide to rage outside of combat for dramatic roleplaying effect!).
					While raging, you roll 2d20 to hit with your barbarian melee and thrown weapon attacks instead of 1d20. Use the higher roll for the attack. If you roll a natural 11+ with both dice, and your highest attack roll is a hit, the attack is a critical hit!
					Recharge 16+: After a battle in which you rage, roll a d20 and add your Constitution modifier; on a 16+ you can use Barbarian Rage again later in the day.`
				}),
				FactoryLogic.feature.createClassTalentChoice({
					id: 'barbarian-talents-1',
					name: 'Barbarian Talents',
					description: "Not sure?",
					count: 3,
					tier: Tier.Adventurer,
				})
			]
		},
	],
	talents: [
		FactoryLogic.feature.createTalent({
			id: 'barbaric-cleave',
			name: 'Barbaric Cleave',
			description: 'Once per battle as a free action, make another barbarian melee attack after you have dropped a non-mook foe to 0 hp with a barbarian melee attack. (Dropping the last mook of a mook mob also qualifies you to use Barbaric Cleave.)',
			tier: Tier.Adventurer,
		}),
		FactoryLogic.feature.createTalent({
			id: 'building-frenzy',
			name: 'building-frenzy',
			description: 'One battle per day, as a free action after you have missed with an attack, deal +1d4 damage with your melee attacks until the end of the battle. Deal +1d4 additional damage each time one of your attacks misses, up to a maximum of +4d4 damage.',
			tier: Tier.Adventurer,
		}),
		FactoryLogic.feature.createTalent({
			id: 'building-frenzy',
			name: 'building-frenzy',
			description: 'One battle per day, as a free action after you have missed with an attack, deal +1d4 damage with your melee attacks until the end of the battle. Deal +1d4 additional damage each time one of your attacks misses, up to a maximum of +4d4 damage.',
			tier: Tier.Adventurer,
		}),
	],
	abilities: [],
	level: 1,
	characteristics: []
};
