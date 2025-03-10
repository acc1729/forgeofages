import { Characteristic } from '../../enums/characteristic';
import { Tier } from '../../enums/tier';
import { FactoryLogic } from '../../logic/factory-logic';
import { HeroClass } from '../../models/class';

export const barbarian: HeroClass = {
	id: 'class-barbarian',
	name: 'Barbarian',
	description: `Fill this in later I guess.`,
	primaryCharacteristics: [Characteristic.Strength, Characteristic.Constitution],
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
				FactoryLogic.feature.createChoice({
					id: 'barbarian-characterist-bonus',
					name: 'Barbarian Characteristic Bonus',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'barbarian-bonus-str',
								characteristic: Characteristic.Strength,
								value: 2,
							}),
							value: 1,
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'barbarian-bonus-con',
								characteristic: Characteristic.Constitution,
								value: 2,
							}),
							value: 1,
						},
					]
				}),
				FactoryLogic.feature.createClassTalentChoice({
					id: 'barbarian-talents-1',
					name: 'Barbarian Talents',
					description: "Not sure? This is the 'createClassTalentChoice' call.",
					count: 3,
					tier: Tier.Adventurer,
				})
			]
		},
	],
	talents: [
		FactoryLogic.createTalent({
			id: 'barbaric-cleave',
			name: 'Barbaric Cleave',
			description: 'Once per battle as a free action, make another barbarian melee attack after you have dropped a non-mook foe to 0 hp with a barbarian melee attack. (Dropping the last mook of a mook mob also qualifies you to use Barbaric Cleave.)',
			tier: Tier.Adventurer,
			cost: 2,
		}),
		FactoryLogic.createTalent({
			id: 'building-frenzy',
			name: 'Building Frenzy',
			description: 'One battle per day, as a free action after you have missed with an attack, deal +1d4 damage with your melee attacks until the end of the battle. Deal +1d4 additional damage each time one of your attacks misses, up to a maximum of +4d4 damage.',
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'slayer',
			name: 'Slayer',
			description: 'During your turn, when you attack a staggered enemy you were not engaged with at the start of your turn, deal +1d6 damage per level to that creature if you hit.',
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'strongheart',
			name: 'Strongheart',
			description: 'Your recovery dice are d12s instead of d10s like other barbarians.',
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'unstoppable',
			name: 'Unstoppable',
			description: "Once per battle, declare you're using Unstoppable before making a barbarian melee attack. If your attack hits at least one target, you can heal using a recovery.",
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'whirlwind',
			name: 'Whirlwind',
			description: `You can make a Whirlwind attack as the first action of your turn when you are engaged by two or more enemies.
			You take a -4 penalty to your AC and PD until the start of your next turn. Then roll a separate melee attack against each enemy you are engaged with. You deal no miss damage with these attacks.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'natural-will',
			name: 'Natural Will',
			description: 'One battle per day as a quick action, you gain a +2 bonus to your Mental Defense until the end of the battle.',
			tier: Tier.Champion,
		}),
		FactoryLogic.createTalent({
			id: 'violence',
			name: 'Violence',
			description: 'Once per battle, add a +1d4 bonus to a barbarian melee attack roll after finding out whether you hit or missed.',
			tier: Tier.Champion,
		}),
		FactoryLogic.createTalent({
			id: 'ancestral-warband',
			name: 'Ancestral Warband',
			description: `One battle per day as a quick action, you can call the spirits of your ancestors to fight alongside you. Explain the visuals any way you like; your ancestors roar in from the spirit world and can't be hurt or affected by the creatures of this world.
			At the end of each of your turns, roll a d6 if you are conscious. If you roll less than or equal to the escalation die, a member of your spirit warband strikes from the spirit world into the world. Make a melee attack against a nearby enemy as if you were making the attack yourself, using any talents/feats/magic items/etc. as you see fit. The attack doesn't take any of your actions.`,
			tier: Tier.Epic,
		}),
		FactoryLogic.createTalent({
			id: 'relentless',
			name: 'Relentless',
			description: 'While raging, you have resist damage 12+ (when an attack targets you, the attacker must roll a natural 12 or higher on the attack roll or it only deals half damage).',
			tier: Tier.Epic,
		}),
	],
	abilities: [],
	level: 1,
	characteristics: []
};
