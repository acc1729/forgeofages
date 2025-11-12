import { Ability, AbilityDistance } from '../models/ability';
import { Feature, FeatureAbilityData, FeatureBonusData, FeatureClassAbilityData, FeatureClassTalentData, FeatureDamageModifierData, FeatureDomainData, FeatureItemChoice, FeatureKitData, FeatureKitTypeData, FeatureLanguageChoiceData, FeatureLanguageData, FeatureSkillChoiceData, FeatureSkillData } from '../models/feature';
import { AbilityDistanceType } from '../enums/abiity-distance-type';
import { AbilityKeyword } from '../enums/ability-keyword';
import { BasicAttack } from '../models/class';
import { Characteristic } from '../enums/characteristic';
import { Collections } from '../utils/collections';
import { DamageRoll } from '../models/damage-roll';
import { DamageModifierType } from '../enums/damage-modifier-type';
import { Dice } from '../enums/dice';
import { Domain } from '../models/domain';
import { FactoryLogic } from './factory-logic';
import { Feat } from '../models/feat';
import { FeatureField } from '../enums/feature-field';
import { FeatureLogic } from './feature-logic';
import { FeatureType } from '../enums/feature-type';
import { Hero } from '../models/hero';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type';
import { Kit } from '../models/kit';
import { KitType } from '../enums/kit-type';
import { Language } from '../models/language';
import { Size } from '../models/size';
import { Skill } from '../models/skill';
import { Sourcebook } from '../models/sourcebook';
import { SourcebookData } from '../data/sourcebook-data';
import { SourcebookLogic } from './sourcebook-logic';
import { Talent } from '../models/talent';
import { Tier } from '../enums/tier';

export class HeroLogic {
	static getKitTypes = (hero: Hero) => {
		const types = [KitType.Standard];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.KitType)
			.forEach(f => {
				const data = f.data as FeatureKitTypeData;
				types.push(...data.types);
			});

		return types;
	};

	static getKits = (hero: Hero) => {
		const kits: Kit[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Kit)
			.forEach(f => {
				const data = f.data as FeatureKitData;
				kits.push(...data.selected);
			});

		return kits;
	};


	static getDomains = (hero: Hero) => {
		const domains: Domain[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Domain)
			.forEach(f => {
				const data = f.data as FeatureDomainData;
				domains.push(...data.selected);
			});

		return domains;
	};

	static getSelectedFeats = (hero: Hero): Feat[] => {
		return this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Feat)
			.flatMap(f => f.data.selected);
	}
	
	static getAvailableFeats = (hero: Hero, sourcebooks: Sourcebook[], tier?: Tier): Feat[] => {
		let feats: Feat[] = [];
		sourcebooks.flatMap(sb => sb.feats).forEach(f => feats.push(f));

		const heroFeatures = HeroLogic.getFeatures(hero);
		const heroTalents = HeroLogic.getTalents(hero);
		// TODO get hero powers too
		heroFeatures
			.filter(f => f.type === FeatureType.Text)
			.flatMap(f => f.data.feats)
			.forEach(f => feats.push(f));
		heroTalents
			.flatMap(f => f.feats)
			.forEach(f => feats.push(f));

		if (tier !== undefined) {
			feats = feats.filter(f => f.tier === tier)
		}

		const selectedFeats = this.getSelectedFeats(hero).flatMap(f => f.id);
		feats = feats.filter(f => !selectedFeats.includes(f.id));

		return Collections.distinct(feats, a => a.name);
	};

	static getFeatures = (hero: Hero): Feature[] => {
		const features: Feature[] = [];

		if (hero.ancestry) {
			features.push(...FeatureLogic.getFeaturesFromAncestry(hero.ancestry, hero));
		}

		if (hero.culture) {
			features.push(...FeatureLogic.getFeaturesFromCulture(hero.culture, hero));
		}

		if (hero.career) {
			features.push(...FeatureLogic.getFeaturesFromCareer(hero.career, hero));
		}

		if (hero.class) {
			features.push(...FeatureLogic.getFeaturesFromClass(hero.class, hero));
		}

		if (hero.complication) {
			features.push(...FeatureLogic.getFeaturesFromComplication(hero.complication, hero));
		}

		features.push(...FeatureLogic.getFeaturesFromCustomization(hero));

		hero.state.inventory.forEach(item => {
			try {
				features.push(...FeatureLogic.getFeaturesFromItem(item, hero));
			} catch (ex) {
				console.error(ex);
			}
		});

		return Collections.sort(features, f => f.name);
	};

	static getTalents = (hero: Hero): Talent[] => {
		const talents: Talent[] = [];

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.ClassTalent)
			.forEach(f => {
				const data = f.data as FeatureClassTalentData;
				data.selectedIDs.forEach(talentID => {
					const talent = hero.class?.talents.find(a => a.id === talentID);
					if (talent) {
						talents.push(talent);
					}
				});
			});

		return talents;
	};

	static getAbilities = (hero: Hero, includeChoices: boolean, includeFreeStrikes: boolean, includeStandard: boolean) => {
		const abilities: Ability[] = [];

		if (includeFreeStrikes) {
			abilities.push(FactoryLogic.createAbility({
				id: 'free-melee',
				name: 'Free Strike (melee)',
				description: '',
				type: FactoryLogic.type.createAction({ free: true }),
				keywords: [AbilityKeyword.Charge, AbilityKeyword.Melee, AbilityKeyword.Strike, AbilityKeyword.Weapon],
				distance: [FactoryLogic.distance.createMelee()],
				target: '1 creature or object',
				powerRoll: FactoryLogic.createPowerRoll({
					characteristic: [Characteristic.Might, Characteristic.Agility],
					tier1: '2 + M or A damage',
					tier2: '5 + M or A damage',
					tier3: '7 + M or A damage'
				})
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'free-ranged',
				name: 'Free Strike (ranged)',
				description: '',
				type: FactoryLogic.type.createAction({ free: true }),
				keywords: [AbilityKeyword.Ranged, AbilityKeyword.Strike, AbilityKeyword.Weapon],
				distance: [FactoryLogic.distance.createRanged(5)],
				target: '1 creature or object',
				powerRoll: FactoryLogic.createPowerRoll({
					characteristic: [Characteristic.Might, Characteristic.Agility],
					tier1: '2 + M or A damage',
					tier2: '4 + M or A damage',
					tier3: '6 + M or A damage'
				})
			}));
		}

		if (includeChoices) {
			const choices: Ability[] = [];

			this.getFeatures(hero)
				.filter(f => f.type === FeatureType.Ability)
				.forEach(f => {
					const data = f.data as FeatureAbilityData;
					choices.push(data.ability);
				});

			this.getFeatures(hero)
				.filter(f => f.type === FeatureType.ClassAbility)
				.forEach(f => {
					const data = f.data as FeatureClassAbilityData;
					data.selectedIDs.forEach(abilityID => {
						const ability = hero.class?.abilities.find(a => a.id === abilityID);
						if (ability) {
							choices.push(ability);
						}
					});
				});

			Collections.distinct(choices.map(a => a.cost), a => a)
				.sort((a, b) => {
					if (a === 'signature' && b === 'signature') {
						return 0;
					}
					if (a === 'signature') {
						return -1;
					}
					if (b === 'signature') {
						return 1;
					}
					return a - b;
				})
				.forEach(cost => abilities.push(...Collections.sort(choices.filter(a => a.cost === cost), a => a.name)));
		}

		if (includeStandard) {
			abilities.push(FactoryLogic.createAbility({
				id: 'advance',
				name: 'Advance',
				description: '',
				type: FactoryLogic.type.createMove(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				effect: 'When you take the Advance move action, you can move a number of squares up to your speed. You can break up this movement granted with your maneuver and action however you wish.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'disengage',
				name: 'Disengage',
				description: '',
				type: FactoryLogic.type.createMove(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				effect: 'When you take the Disengage move action, you can shift 1 square. Some class features, kits, or other rules let you shift more than 1 square when you take this move action, if they do, you can break up the movement granted by this move action with your maneuver and action however you wish.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'ride',
				name: 'Ride',
				description: '',
				type: FactoryLogic.type.createMove(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				effect: 'You can only take the Ride move action while mounted on another creature. When you take the Ride move action, you cause your mount to move up to their speed, taking you with them. Alternatively, you can use this move action to have your mount use the Disengage move action as a free triggered action. A mount can only be ridden with this move action once per round.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'aid-attack',
				name: 'Aid Attack',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [FactoryLogic.distance.createMelee()],
				target: '1 enemy',
				effect: 'The next attack an ally makes against the target before the start of your next turn has an edge.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'catch-breath',
				name: 'Catch Breath',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				effect: `
By using the Catch Breath maneuver, you spend a Recovery and heal an amount equal to your recovery value. In addition, you also gain the benefit of the Defend action.
If you are dying, you can’t take the Catch Breath maneuver, but other creatures can help you spend recoveries.`
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'drink-potion',
				name: 'Drink Potion',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [
					FactoryLogic.distance.createSelf(),
					FactoryLogic.distance.createMelee()
				],
				target: 'Self or 1 creature',
				effect: 'You can use this maneuver to drink a potion yourself or to administer a potion to an adjacent creature.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'escape-grab',
				name: 'Escape Grab',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				preEffect: 'While you are grabbed by another creature, you can attempt to escape by making a resistance roll. You take a bane on the roll if the creature’s size is larger than yours.',
				powerRoll: FactoryLogic.createPowerRoll({
					characteristic: [Characteristic.Might, Characteristic.Agility],
					tier1: 'You fail to escape the grab.',
					tier2: 'You can escape the grab, but if you do, the creature grabbing you can make a melee free strike against you before you are no longer grabbed.',
					tier3: 'You are no longer grabbed.'
				})
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'grab',
				name: 'Grab',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [AbilityKeyword.Melee],
				distance: [FactoryLogic.distance.createMelee()],
				target: '1 creature the same size or smaller than you',
				powerRoll: FactoryLogic.createPowerRoll({
					characteristic: [Characteristic.Might],
					tier1: 'No effect',
					tier2: 'You can grab the target, but if you do, they can make a melee free strike against you right before they become grabbed by you.',
					tier3: 'The target is grabbed by you.'
				}),
				effect: 'You gain an edge on the power roll if the creature’s size is smaller than yours. You can grab only one creature at a time this way.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'hide',
				name: 'Hide',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				effect: 'You attempt to hide from other creatures who aren’t observing you while you have cover or concealment.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'knockback',
				name: 'Knockback',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [AbilityKeyword.Melee],
				distance: [FactoryLogic.distance.createMelee()],
				target: '1 creature the same size or smaller than you',
				powerRoll: FactoryLogic.createPowerRoll({
					characteristic: [Characteristic.Might],
					tier1: 'Push 1',
					tier2: 'Push 2',
					tier3: 'Push 3'
				}),
				effect: 'You gain an edge on the power roll if the creature’s size is smaller than yours.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'make-assist-test',
				name: 'Make Or Assist A Test',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				effect: `
Many tests are maneuvers if made in combat. Searching a chest with a Reason test, picking a door’s lock with an Agility test, or lifting a portcullis with a Might test would all be maneuvers. Assisting a test is also a maneuver in combat.
Complex or time-consuming tests might require an action if made in combat - or could take so long that they can’t be made during combat at all. Other tests that take no time at all, such as a Reason test to recall lore about mummies, are usually free maneuvers in combat. The Director has the final say regarding which tests can be made as maneuvers.`
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'search',
				name: 'Search',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				effect: 'You can use this maneuver to attempt to search for creatures hidden from you.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'stand-up',
				name: 'Stand Up',
				description: '',
				type: FactoryLogic.type.createManeuver(),
				keywords: [],
				distance: [
					FactoryLogic.distance.createSelf(),
					FactoryLogic.distance.createMelee()
				],
				target: 'Self or 1 creature',
				effect: 'You can use this maneuver to stand up if you are prone, ending that condition. Alternatively, you can use this maneuver to make an adjacent prone creature stand up.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'charge',
				name: 'Charge',
				description: '',
				type: FactoryLogic.type.createAction(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				effect: 'When you take the Charge action, you move up to your speed in a straight line, then make a melee free strike against a creature when you end your move. You can’t shift when you charge.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'defend',
				name: 'Defend',
				description: '',
				type: FactoryLogic.type.createAction(),
				keywords: [],
				distance: [FactoryLogic.distance.createSelf()],
				target: 'Self',
				effect: 'When you take the Defend action, all attacks against you have a double bane until the end of your next turn. You gain no benefit from this action while another creature is taunted by you.'
			}));
			abilities.push(FactoryLogic.createAbility({
				id: 'heal',
				name: 'Heal',
				description: '',
				type: FactoryLogic.type.createAction(),
				keywords: [],
				distance: [FactoryLogic.distance.createMelee()],
				target: '1 creature',
				effect: 'You use your action to employ medicine or inspiring words to make an adjacent creature feel better and stay in the fight. The creature can spend a Recovery to regain Stamina, or can make a saving throw against a “(save ends)” effect they are suffering.'
			}));
		}

		return abilities;
	};

	static getFormerAncestries = (hero: Hero) => {
		return this.getFeatures(hero).filter(f => f.type === FeatureType.AncestryChoice).map(f => f.data.selected).filter(a => !!a);
	};

	static getCompanions = (hero: Hero) => {
		return this.getFeatures(hero).filter(f => f.type === FeatureType.Companion).map(f => f.data.selected).filter(a => !!a);
	};

	static getCharacteristic = (hero: Hero, characteristic: Characteristic) => {
		let value = 0;

		if (hero.class) {
			const ch = hero.class.characteristics.find(ch => ch.characteristic === characteristic);
			if (ch) {
				value += ch.value;
			}
		}

 		HeroLogic.getFeatures(hero)
 			.filter(f => f.type === FeatureType.CharacteristicBonus)
			.filter(f => f.data.characteristic === characteristic)
			.forEach(f => value += f.data.value);

		return value;
	};

	static getCharacteristicBonus = (hero: Hero, characteristic: Characteristic): number => {
		const ch = HeroLogic.getCharacteristic(hero, characteristic);
		return Math.floor(ch / 2) - 5;
	}

	static getBasicAttackHitBonus = (hero: Hero, attackType: 'oneHanded' | 'twoHanded' | 'ranged'): number => {
		if (!hero.class) {
			return 0;
		}

		const basicAttack: BasicAttack = hero.class.basicAttacks[attackType];
		const highestApplicableCharacteristic = basicAttack.hitBonus
			.map(ch => HeroLogic.getCharacteristicBonus(hero, ch))
			.reduce((acc, el) => el >= acc ? el : acc);

		return hero.class.level + highestApplicableCharacteristic;
	}

	static getBasicAttackDamageRoll = (hero: Hero, attackType: 'oneHanded' | 'twoHanded' | 'ranged'): DamageRoll => {
		if (!hero.class) {
			return {
				dice: Dice.D4,
				numberOfDice: 1,
				multiplier: 1,
				bonus: 0,
			}
		}

		const basicAttack: BasicAttack = hero.class.basicAttacks[attackType];
		const bonusMultiplier = hero.class.level <= 4 ? 1 : hero.class.level <= 7 ? 2 : 3;
		const highestApplicableCharacteristic = basicAttack.damageBonus
			.map(ch => HeroLogic.getCharacteristicBonus(hero, ch))
			.reduce((acc, el) => el >= acc ? el : acc);

		return {
			dice: basicAttack.dice,
			numberOfDice: hero.class.level,
			multiplier: 1,
			bonus: highestApplicableCharacteristic * bonusMultiplier,
		}
	}

	static getDefenses = (hero: Hero): {armor: number; armorWithShield: number | null; physical: number, mental: number} => {
		if (!hero.class) {
			return {
				armor: 10,
				armorWithShield: null,
				physical: 10,
				mental: 10,
			}
		}
		const str = HeroLogic.getCharacteristicBonus(hero, Characteristic.Strength);
		const dex = HeroLogic.getCharacteristicBonus(hero, Characteristic.Dexterity);
		const con = HeroLogic.getCharacteristicBonus(hero, Characteristic.Constitution);
		const int = HeroLogic.getCharacteristicBonus(hero, Characteristic.Intelligence);
		const wis = HeroLogic.getCharacteristicBonus(hero, Characteristic.Wisdom);
		const cha = HeroLogic.getCharacteristicBonus(hero, Characteristic.Charisma);
		
		const armorBonus = [con, dex, wis].sort()[1];
		const physicalBonus = [str, con, dex].sort()[1];
		const mentalBonus = [int, wis, cha].sort()[1];

		const armorBase = hero.class.defenses.heavyPenalty === 0 ? hero.class.defenses.heavy : hero.class.defenses.light;
		const canUseShield = hero.class.defenses.shieldPenalty === 0;
		
		
		// TODO also some logic about using a shield vs. a two hand weapon.
		// Maybe it's fine just to show this AC + Shield and have the player know
		// what to use.
		
		// TODO probably support talents and feats that modify defenses.
 		// HeroLogic.getFeatures(hero)
 		// 	.filter(f => f.type === FeatureType.DefenseModifier)

 		return {
 			armor: armorBase + armorBonus + hero.class.level,
 			armorWithShield: canUseShield ? armorBase + armorBonus + hero.class.level + 1 : null,
 			physical: hero.class.defenses.physical + physicalBonus + hero.class.level,
 			mental: hero.class.defenses.mental + mentalBonus + hero.class.level,
 		};
	};

	static getLanguages = (hero: Hero, sourcebooks: Sourcebook[]) => {
		const languageNames: string[] = [];

		if (hero.culture) {
			languageNames.push(...hero.culture.languages);
		}

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Language)
			.forEach(f => {
				const data = f.data as FeatureLanguageData;
				languageNames.push(data.language);
			});
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.LanguageChoice)
			.forEach(f => {
				const data = f.data as FeatureLanguageChoiceData;
				languageNames.push(...data.selected);
			});

		const allLanguages = sourcebooks.flatMap(cs => cs.languages);

		const languages: Language[] = [];
		languageNames.forEach(name => {
			const language = allLanguages.find(l => l.name === name);
			if (language) {
				languages.push(language);
			}
		});

		return Collections.sort(languages, l => l.name);
	};

	static getSkills = (hero: Hero, sourcebooks: Sourcebook[]) => {
		const skillNames: string[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Skill)
			.forEach(f => {
				const data = f.data as FeatureSkillData;
				skillNames.push(data.skill);
			});
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.SkillChoice)
			.forEach(f => {
				const data = f.data as FeatureSkillChoiceData;
				skillNames.push(...data.selected);
			});

		const skills: Skill[] = [];
		skillNames.forEach(name => {
			const skill = SourcebookLogic.getSkill(name, sourcebooks);
			if (skill) {
				skills.push(skill);
			}
		});

		return Collections.sort(skills, s => s.name);
	};

	static getDamageModifiers = (hero: Hero, type: DamageModifierType) => {
		const modifiers: { damageType: string, value: number }[] = [];

		// Collate from features
		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.DamageModifier)
			.forEach(f => {
				const data = f.data as FeatureDamageModifierData;
				data.modifiers
					.filter(dm => dm.type === type)
					.forEach(dm => {
						let value = dm.value;
						value += (Collections.max(dm.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0) * dm.valueCharacteristicMultiplier;
						if (hero.class) {
							value += dm.valuePerLevel * (hero.class.level - 1);
							value += dm.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
						}

						const existing = modifiers.find(x => x.damageType === dm.damageType);
						if (existing) {
							existing.value += dm.value;
						} else {
							modifiers.push({
								damageType: dm.damageType,
								value: value
							});
						}
					});
			});

		return Collections.sort(modifiers, dm => dm.damageType);
	};

	///////////////////////////////////////////////////////////////////////////

	static getStamina = (hero: Hero) => {
		let value = 0;

		// Add maximum from kits
		const kits = this.getKits(hero);
		const v = Collections.max(kits.map(kit => kit.stamina), value => value) || 0;
		if (hero.class) {
			value += v * HeroLogic.getEchelon(hero.class.level);
		}

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Stamina)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getHitPoints = (hero: Hero) => {
		if (!hero.class) return 0;

		const multipliers = [
			3, 4, 5, 6, 8, 10, 12, 16, 20, 24,
		];
		const bonus = HeroLogic.getCharacteristicBonus(hero, Characteristic.Constitution);

		// Here's how Forge Steel does this for Stamina.
		// TODO incorporate bonuses from talents, feats, etc. (Tough in General Feats)
		// this.getFeatures(hero)
		// 	.filter(f => f.type === FeatureType.Bonus)
		// 	.map(f => f.data as FeatureBonusData)
		// 	.filter(data => data.field === FeatureField.Stamina)
		// 	.forEach(data => {
		// 		value += data.value;
		// 		value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
		// 		if (hero.class) {
		// 			value += data.valuePerLevel * (hero.class.level - 1);
		// 			value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
		// 		}
		// 	});

		return (hero.class.hitPointBase + bonus) * multipliers[hero.class.level - 1];
	};

	static getRecoveryValue = (hero: Hero) => {
		let value = Math.floor(this.getStamina(hero) / 3);

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.RecoveryValue)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getRecoveries = (hero: Hero) => {
		let value = 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Recoveries)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getSize = (hero: Hero) => {
		const featureSizes = this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Size)
			.map(f => f.data.size);
		if (featureSizes.length > 0) {
			const value = Collections.max(featureSizes.map(s => s.value), v => v);
			const mods = Collections.distinct(featureSizes.map(s => s.mod), m => m);
			return {
				value: value,
				mod: value === 1 ? mods[0] : ''
			} as Size;
		}

		const ancestrySizes = this.getFormerAncestries(hero)
			.flatMap(a => a.features.filter(f => f.type === FeatureType.Size))
			.map(f => f.data.size);
		if (ancestrySizes.length > 0) {
			const value = Collections.max(ancestrySizes.map(s => s.value), v => v);
			const mods = Collections.distinct(ancestrySizes.map(s => s.mod), m => m);
			return {
				value: value,
				mod: value === 1 ? mods[0] : ''
			} as Size;
		}

		return {
			value: 1,
			mod: 'M'
		} as Size;
	};

	static getSpeed = (hero: Hero) => {
		let value = 5;

		const features = this.getFeatures(hero).filter(f => f.type === FeatureType.Speed);
		if (features.length > 0) {
			const datas = features.map(f => f.data);
			value = Collections.max(datas.map(d => d.speed), v => v) || 0;
		}

		// Add maximum from kits
		const kits = this.getKits(hero);
		value += Collections.max(kits.map(kit => kit.speed), value => value) || 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Speed)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getStability = (hero: Hero) => {
		let value = 0;

		// Add maximum from kits
		const kits = this.getKits(hero);
		value += Collections.max(kits.map(kit => kit.stability), value => value) || 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Stability)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getDisengage = (hero: Hero) => {
		let value = 1;

		// Add maximum from kits
		const kits = this.getKits(hero);
		value += Collections.max(kits.map(kit => kit.disengage), value => value) || 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Disengage)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	static getRenown = (hero: Hero) => {
		let value = 0;

		this.getFeatures(hero)
			.filter(f => f.type === FeatureType.Bonus)
			.map(f => f.data as FeatureBonusData)
			.filter(data => data.field === FeatureField.Renown)
			.forEach(data => {
				value += data.value;
				value += Collections.max(data.valueCharacteristics.map(ch => HeroLogic.getCharacteristic(hero, ch)), v => v) || 0;
				if (hero.class) {
					value += data.valuePerLevel * (hero.class.level - 1);
					value += data.valuePerEchelon * HeroLogic.getEchelon(hero.class.level);
				}
			});

		return value;
	};

	///////////////////////////////////////////////////////////////////////////

	static getMeleeDamageBonus = (hero: Hero, ability: Ability) => {
		let value1 = 0;
		let value2 = 0;
		let value3 = 0;

		if (ability.keywords.includes(AbilityKeyword.Melee) && ability.keywords.includes(AbilityKeyword.Weapon)) {
			// Add maximum from kits
			const kits = this.getKits(hero);
			value1 += Collections.max(kits.map(kit => kit.meleeDamage?.tier1 || 0), value => value) || 0;
			value2 += Collections.max(kits.map(kit => kit.meleeDamage?.tier2 || 0), value => value) || 0;
			value3 += Collections.max(kits.map(kit => kit.meleeDamage?.tier3 || 0), value => value) || 0;
		}

		if ((value1 === 0) && (value2 === 0) && (value3 === 0)) {
			return null;
		}

		return {
			tier1: value1,
			tier2: value2,
			tier3: value3
		};
	};

	static getRangedDamageBonus = (hero: Hero, ability: Ability) => {
		let value1 = 0;
		let value2 = 0;
		let value3 = 0;

		if (ability.keywords.includes(AbilityKeyword.Ranged) && ability.keywords.includes(AbilityKeyword.Weapon)) {
			// Add maximum from kits
			const kits = this.getKits(hero);
			value1 += Collections.max(kits.map(kit => kit.rangedDamage?.tier1 || 0), value => value) || 0;
			value2 += Collections.max(kits.map(kit => kit.rangedDamage?.tier2 || 0), value => value) || 0;
			value3 += Collections.max(kits.map(kit => kit.rangedDamage?.tier3 || 0), value => value) || 0;
		}

		if ((value1 === 0) && (value2 === 0) && (value3 === 0)) {
			return null;
		}

		return {
			tier1: value1,
			tier2: value2,
			tier3: value3
		};
	};

	static getDistanceBonus = (hero: Hero, ability: Ability, distance: AbilityDistance) => {
		const kits = this.getKits(hero);

		if (ability.keywords.includes(AbilityKeyword.Melee) && ability.keywords.includes(AbilityKeyword.Weapon) && (distance.type === AbilityDistanceType.Melee)) {
			// Add maximum melee distance bonus from kits
			return Collections.max(kits.map(kit => kit.meleeDistance), value => value) || 0;
		}

		if (ability.keywords.includes(AbilityKeyword.Ranged) && ability.keywords.includes(AbilityKeyword.Weapon) && (distance.type === AbilityDistanceType.Ranged)) {
			// Add maximum ranged distance bonus from kits
			return Collections.max(kits.map(kit => kit.rangedDistance), value => value) || 0;
		}

		return 0;
	};

	///////////////////////////////////////////////////////////////////////////

	static canUseItem = (hero: Hero, item: Item) => {
		switch (item.type) {
			case ItemType.LeveledArmor:
				return HeroLogic.getKits(hero).flatMap(k => k.armor).some(a => item.keywords.includes(a));
			case ItemType.LeveledWeapon:
				return HeroLogic.getKits(hero).flatMap(k => k.weapon).some(w => item.keywords.includes(w));
		}

		return true;
	};

	static getEchelon = (level: number) => {
		switch (level) {
			case 1:
			case 2:
			case 3:
				return 1;
			case 4:
			case 5:
			case 6:
				return 2;
			case 7:
			case 8:
			case 9:
				return 3;
			case 10:
				return 4;
		}

		return 1;
	};

	static getTier = (level: number): Tier => {
		if (level <= 4) return Tier.Adventurer;
		if (level <= 7) return Tier.Champion;
		return Tier.Epic;
	};

	// 13th Age 2e recommends only the following two arrays.
	static getCharacteristicArrays = (): number[][] => {
		return [
			[17, 15, 14, 13, 12, 10],
			[15, 15, 15, 14, 14, 12],
		];
	};

	// Generates all permutations of `array` for which both primary stats are at least top-three in value
	static calculateCharacteristicArrays = (array: number[], primary: Characteristic[]) => {
		const all = [Characteristic.Strength, Characteristic.Constitution, Characteristic.Dexterity, Characteristic.Intelligence, Characteristic.Wisdom, Characteristic.Charisma];

		return Collections.distinct(Collections.getPermutations(array), item => item.join(', ')).map(arr => {
			return all.map(ch => {
				return {
					characteristic: ch,
					value: arr[all.indexOf(ch)],
				};
			});
		}).filter((arr) => {
			for (let ch of primary) {
				let value = arr[all.indexOf(ch)].value;
				if (!array.slice(0, 2).includes(value)) {
					return false;
				};
			}
			return true;
		});
	};

	static calculatePotency = (hero: Hero, strength: 'weak' | 'average' | 'strong') => {
		const value = hero.class && (hero.class.characteristics.length > 0) ? Math.max(...hero.class.characteristics.map(c => c.value)) : 0;

		switch (strength) {
			case 'weak':
				return value - 2;
			case 'average':
				return value - 1;
			case 'strong':
				return value;
		}
	};

	static getMinXP = (level: number) => {
		switch (level) {
			case 1:
				return 0;
			case 2:
				return 16;
			case 3:
				return 32;
			case 4:
				return 48;
			case 5:
				return 64;
			case 6:
				return 80;
			case 7:
				return 96;
			case 8:
				return 112;
			case 9:
				return 128;
			case 10:
				return 144;
		}

		return 0;
	};

	static canLevelUp = (hero: Hero) => {
		if (!hero.class) {
			return false;
		}

		return hero.state.xp >= this.getMinXP(hero.class.level + 1);
	};

	///////////////////////////////////////////////////////////////////////////

	static updateHero = (hero: Hero) => {
		if (hero.folder === undefined) {
			hero.folder = '';
		}

		if (hero.settingIDs === undefined) {
			hero.settingIDs = [SourcebookData.core.id];
		}

		if (hero.career) {
			if (hero.career.incitingIncidents === undefined) {
				hero.career.incitingIncidents = {
					options: [],
					selectedID: null
				};
			}
		}

		if (hero.features === undefined) {
			hero.features = [];
		}

		hero.state.conditions.forEach(c => {
			if (c.text === undefined) {
				c.text = '';
			}
		});

		if (hero.state.surges === undefined) {
			hero.state.surges = 0;
		}

		if (hero.state.staminaTemp === undefined) {
			hero.state.staminaTemp = 0;
		}

		if (hero.state.xp === undefined) {
			hero.state.xp = 0;
		}

		if (hero.state.wealth === undefined) {
			hero.state.wealth = 1;
		}

		if (hero.state.inventory === undefined) {
			hero.state.inventory = [];
		}

		if (hero.state.projects === undefined) {
			hero.state.projects = [];
		}

		if (hero.state.notes === undefined) {
			hero.state.notes = '';
		}

		hero.state.inventory = hero.state.inventory.filter(i => (i as unknown as FeatureItemChoice).data === undefined);

		if (hero.abilityCustomizations === undefined) {
			hero.abilityCustomizations = [];
		}

		this.getFeatures(hero).filter(f => f.type === FeatureType.Bonus).forEach(f => {
			const data = f.data as FeatureBonusData;
			if (data.valueCharacteristics === undefined) {
				data.valueCharacteristics = [];
			}
			if (data.valuePerEchelon === undefined) {
				data.valuePerEchelon = 0;
			}
		});

		this.getFeatures(hero).filter(f => f.type === FeatureType.DamageModifier).forEach(f => {
			const data = f.data as FeatureDamageModifierData;
			data.modifiers.forEach(dm => {
				if (dm.valueCharacteristics === undefined) {
					dm.valueCharacteristics = [];
				}
				if (dm.valueCharacteristicMultiplier === undefined) {
					dm.valueCharacteristicMultiplier = 1;
				}
				if (dm.valuePerEchelon === undefined) {
					dm.valuePerEchelon = 0;
				}
			});
		});
	};
}
