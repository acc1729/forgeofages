import { Characteristic } from '../../enums/characteristic';
import { Dice } from '../../enums/dice';
import { Tier } from '../../enums/tier';
import { FactoryLogic } from '../../logic/factory-logic';
import { HeroClass } from '../../models/class';

export const barbarian: HeroClass = {
	id: 'class-barbarian',
	name: 'Barbarian',
	description: `Strong guy with big biceps who gets mad and punches hard.`,
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
					description: "Choose three Barbarian talents.",
					count: 3,
					tier: Tier.Adventurer,
				}),
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-1',
					tier: Tier.Adventurer,
				})
			]
		},
		{
			level: 2,
			features: [
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-2',
					tier: Tier.Adventurer,
				}),
			]
		},
		{
			level: 3,
			features: [
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-3',
					tier: Tier.Adventurer,
				}),
			]
		},
		{
			level: 4,
			features: [
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-4',
					tier: Tier.Adventurer,
				}),
			]
		},
		{
			level: 5,
			features: [
				FactoryLogic.feature.createClassTalentChoice({
					id: 'barbarian-talent-2',
					name: 'Barbarian Talents',
					description: "Choose a new Barbarian talent, including Champion talent choices.",
					tier: Tier.Champion,
				}),
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-5',
					tier: Tier.Champion,
				}),
			]
		},
		{
			level: 6,
			features: [
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-6',
					tier: Tier.Champion,
				}),
			]
		},
		{
			level: 7,
			features: [
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-7',
					tier: Tier.Champion,
				}),
			]
		},
		{
			level: 8,
			features: [
				FactoryLogic.feature.createClassTalentChoice({
					id: 'barbarian-talent-3',
					name: 'Barbarian Talents',
					description: "Choose a new Barbarian talent, including Epic talent choices.",
					tier: Tier.Epic,
				}),
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-8',
					tier: Tier.Epic,
				}),
			]
		},
		{
			level: 9,
			features: [
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-9',
					tier: Tier.Epic,
				}),
			]
		},
		{
			level: 10,
			features: [
				FactoryLogic.feature.createFeatChoice({
					id: 'barbarian-feat-10',
					tier: Tier.Epic,
				}),
			]
		},
	],
	talents: [
		FactoryLogic.createTalent({
			id: 'barbaric-cleave',
			name: 'Barbaric Cleave',
			description: 'Once per battle as a free action, make another barbarian melee attack after you have dropped a non-mook foe to 0 hp with a barbarian melee attack. (Dropping the last mook of a mook mob also qualifies you to use Barbaric Cleave.)',
			tier: Tier.Adventurer,
			feats: [
				FactoryLogic.createFeat({
					id: 'barbaric-cleave-feat-a',
					name: 'Feat: Barbaric Cleave A',
					tier: Tier.Adventurer,
					description: `You gain a +2 attack bonus with Barbaric Cleave attacks. If the cleave attack hits, you can heal using a recovery.`,
				}),
				FactoryLogic.createFeat({
					id: 'barbaric-cleave-feat-c',
					name: 'Feat: Barbaric Cleave C',
					tier: Tier.Champion,
					description: `If there is no foe engaged with you to use your Barbaric Cleave attack against, as a free action you can move to a nearby foe before making the attack.`,
				}),
				FactoryLogic.createFeat({
					id: 'barbaric-cleave-feat-e',
					name: 'Feat: Barbaric Cleave E',
					tier: Tier.Epic,
					description: `While raging, you can use Barbaric Cleave as many times as you like during a battle, but only once per round.`,
				}),
			],
		}),
		FactoryLogic.createTalent({
			id: 'building-frenzy',
			name: 'Building Frenzy',
			description: 'One battle per day, as a free action after you have missed with an attack, deal +1d4 damage with your melee attacks until the end of the battle. Deal +1d4 additional damage each time one of your attacks misses, up to a maximum of +4d4 damage.',
			tier: Tier.Adventurer,
			feats: [
				FactoryLogic.createFeat({
					id: 'building-frenzy-feat-a',
					name: 'Feat: Building Frenzy A',
					tier: Tier.Adventurer,
					description: `Bonus damage dice are now d6s.`,
				}),
				FactoryLogic.createFeat({
					id: 'building-frenzy-feat-c',
					name: 'Feat: Building Frenzy C',
					tier: Tier.Champion,
					description: `Bonus damage dice are now d10s.`,
				}),
				FactoryLogic.createFeat({
					id: 'building-frenzy-feat-e',
					name: 'Feat: Building Frenzy E',
					tier: Tier.Epic,
					description: `You can use Building Frenzy twice a day.`,
				}),
			],
		}),
		FactoryLogic.createTalent({
			id: 'slayer',
			name: 'Slayer',
			description: 'During your turn, when you attack a staggered enemy you were not engaged with at the start of your turn, deal +1d6 damage per level to that creature if you hit.',
			tier: Tier.Adventurer,
			feats: [
				FactoryLogic.createFeat({
					id: 'slayer-feat-a',
					name: 'Feat: Slayer A',
					tier: Tier.Adventurer,
					description: `You gain a +2 bonus to Slayer attacks.`,
				}),
				FactoryLogic.createFeat({
					id: 'slayer-feat-c',
					name: 'Feat: Slayer C',
					tier: Tier.Champion,
					description: `Once per battle, when you miss with a Slayer attack, deal the additional +1d6-per-level damage to the target instead of normal miss damage.`,
				}),
				FactoryLogic.createFeat({
					id: 'slayer-feat-e',
					name: 'Feat: Slayer E',
					tier: Tier.Epic,
					description: `Whenever one of your Slayer attacks drops a non-mook enemy to 0 hp, you gain 20 temporary hit points.`,
				}),
			],
		}),
		FactoryLogic.createTalent({
			id: 'strongheart',
			name: 'Strongheart',
			description: 'Your recovery dice are d12s instead of d10s like other barbarians.',
			tier: Tier.Adventurer,
			feats: [
				FactoryLogic.createFeat({
					id: 'strongheart-feat-a',
					name: 'Feat: Strongheart A',
					tier: Tier.Adventurer,
					description: `Increase your total number of recoveries by 1.`,
				}),
				FactoryLogic.createFeat({
					id: 'strongheart-feat-c',
					name: 'Feat: Strongheart C',
					tier: Tier.Champion,
					description: `You gain +1 PD. When you heal using a recovery, you can roll a save against a save ends effect.`,
				}),
				FactoryLogic.createFeat({
					id: 'strongheart-feat-e',
					name: 'Feat: Strongheart E',
					tier: Tier.Epic,
					description: `Increase your total number of recoveries by 1 (making a total of +2 from this talent).`,
				}),
			],
		}),
		FactoryLogic.createTalent({
			id: 'unstoppable',
			name: 'Unstoppable',
			description: "Once per battle, declare you're using Unstoppable before making a barbarian melee attack. If your attack hits at least one target, you can heal using a recovery.",
			tier: Tier.Adventurer,
			feats: [
				FactoryLogic.createFeat({
					id: 'unstoppable-feat-a',
					name: 'Feat: Unstoppable A',
					tier: Tier.Adventurer,
					description: `The Unstoppable recovery is free.`,
				}),
				FactoryLogic.createFeat({
					id: 'unstoppable-feat-c',
					name: 'Feat: Unstoppable C',
					tier: Tier.Champion,
					description: `Add double your Constitution modifier to the healing the recovery provides.`,
				}),
				FactoryLogic.createFeat({
					id: 'unstoppable-feat-e',
					name: 'Feat: Unstoppable E',
					tier: Tier.Epic,
					description: `You can use Unstoppable twice per battle.`,
				}),
			],
		}),
		FactoryLogic.createTalent({
			id: 'whirlwind',
			name: 'Whirlwind',
			description: `You can make a Whirlwind attack as the first action of your turn when you are engaged by two or more enemies.
			You take a -4 penalty to your AC and PD until the start of your next turn. Then roll a separate melee attack against each enemy you are engaged with. You deal no miss damage with these attacks.`,
			tier: Tier.Adventurer,
			feats: [
				FactoryLogic.createFeat({
					id: 'whirlwind-feat-a',
					name: 'Feat: Whirlwind A',
					tier: Tier.Adventurer,
					description: `You now deal normal miss damage with missed Whirlwind attacks.`,
				}),
				FactoryLogic.createFeat({
					id: 'whirlwind-feat-c',
					name: 'Feat: Whirlwind C',
					tier: Tier.Champion,
					description: `The penalty to your AC and PD is reduced to –2. In addition, disengage checks you make the same turn as using Whirlwind automatically succeed.`,
				}),
				FactoryLogic.createFeat({
					id: 'whirlwind-feat-e',
					name: 'Feat: Whirlwind E',
					tier: Tier.Epic,
					description: `You can use Whirlwind anytime during your turn, not just as the first action.`,
				}),
			],
		}),
		FactoryLogic.createTalent({
			id: 'natural-will',
			name: 'Natural Will',
			description: 'One battle per day as a quick action, you gain a +2 bonus to your Mental Defense until the end of the battle.',
			tier: Tier.Champion,
			feats: [
				FactoryLogic.createFeat({
					id: 'natural-will-feat-a',
					name: 'Feat: Natural Will A',
					tier: Tier.Adventurer,
					description: `You can now use Natural Will in two battles per day.`,
				}),
				FactoryLogic.createFeat({
					id: 'natural-will-feat-c',
					name: 'Feat: Natural Will C',
					tier: Tier.Champion,
					description: `The bonus increases to +4 Mental Defense.`,
				}),
				FactoryLogic.createFeat({
					id: 'natural-will-feat-e',
					name: 'Feat: Natural Will E',
					tier: Tier.Epic,
					description: `You can now use Natural Will as a free action when an enemy attacks you.`,
				}),
			],
		}),
		FactoryLogic.createTalent({
			id: 'violence',
			name: 'Violence',
			description: 'Once per battle, add a +1d4 bonus to a barbarian melee attack roll after finding out whether you hit or missed.',
			tier: Tier.Champion,
			feats: [
				FactoryLogic.createFeat({
					id: 'violence-feat-c',
					name: 'Feat: Violence C',
					tier: Tier.Champion,
					description: `If the attack still misses, deal half damage.`,
				}),
				FactoryLogic.createFeat({
					id: 'violence-feat-e',
					name: 'Feat: Violence E',
					tier: Tier.Epic,
					description: `The bonus increases to +1d6.`,
				}),
			],
		}),
		FactoryLogic.createTalent({
			id: 'ancestral-warband',
			name: 'Ancestral Warband',
			description: `One battle per day as a quick action, you can call the spirits of your ancestors to fight alongside you. Explain the visuals any way you like; your ancestors roar in from the spirit world and can't be hurt or affected by the creatures of this world.
			At the end of each of your turns, roll a d6 if you are conscious. If you roll less than or equal to the escalation die, a member of your spirit warband strikes from the spirit world into the world. Make a melee attack against a nearby enemy as if you were making the attack yourself, using any talents/feats/magic items/etc. as you see fit. The attack doesn't take any of your actions.`,
			tier: Tier.Epic,
			feats: [
				FactoryLogic.createFeat({
					id: 'ancestral-warband-feat-e',
					name: 'Feat: Ancestral Warband E',
					tier: Tier.Epic,
					description: `Your Ancestral Warband spirits are always raging, even if you are not, and continue to fight for a single round while you are unconscious.`,
				}),
			],
		}),
		FactoryLogic.createTalent({
			id: 'relentless',
			name: 'Relentless',
			description: 'While raging, you have resist damage 12+ (when an attack targets you, the attacker must roll a natural 12 or higher on the attack roll or it only deals half damage).',
			tier: Tier.Epic,
			feats: [
				FactoryLogic.createFeat({
					id: 'relentless-feat-e',
					name: 'Feat: Relentless E',
					tier: Tier.Epic,
					description: `Even when not raging, whenever you score a critical hit against an enemy, you have resist damage 12+ until the start of your next turn.`,
				}),
			],
		}),
	],
	abilities: [],
	level: 1,
	characteristics: [],
	basicAttacks: {
		oneHanded: FactoryLogic.createBasicAttack({
			dice: Dice.D8,
			hitBonus: [Characteristic.Strength],
			missDamage: true,
		}),
		twoHanded: FactoryLogic.createBasicAttack({
			dice: Dice.D10,
			hitBonus: [Characteristic.Strength],
			missDamage: true,
		}),
		ranged: FactoryLogic.createBasicAttack({
			dice: Dice.D6,
			hitBonus: [Characteristic.Dexterity],
		}),
	},
	defenses: FactoryLogic.createDefenses({
		light: 12,
		heavy: 13,
		heavyPenalty: -2,
		physical: 11,
		mental: 10,
	}),
	hitPointBase: 7,
};
