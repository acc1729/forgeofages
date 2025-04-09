import { Ability } from './ability';
import { Characteristic } from '../enums/characteristic';
import { Dice } from '../enums/dice';
import { Element } from './element';
import { Feature } from './feature';
import { Talent } from './talent';

/**
 * Some notes on defenses in 13A:
 * All classes can use light or no armor, without penalty.
 * Rogue and monk have 11 AC with no armor. All other classes have 10.
 * Monk has a -4 penalty with heavy armor! All other penalized classes have -2.
 * Shield always gives +1 AC, and occasionally a -2 penalty.
 */
export type Defenses = {
	none: number;
	light: number;
	heavy: number;
	heavyPenalty: number;
	shieldPenalty: number; 
	mental: number;
	physical: number;
};

/**
 * Some notes on attacks in 13A:
 * Ranger can add Str OR Dex to-hit for melee, but the only Str to-damage.
 * This is the only case of the hitBonus and damageBonus not lining up, in Core.
 * Further, the Bard can add Str OR Dex to-hit and to-damage for melee attacks.
 */
export type BasicAttack = {
	dice: Dice,
	hitBonus: Characteristic[];
	damageBonus: Characteristic[];
	missDamage: boolean;
}

export type BasicAttacks = {
	oneHanded: BasicAttack;
	twoHanded: BasicAttack;
	ranged: BasicAttack;
}

export interface HeroClass extends Element {
	primaryCharacteristics: Characteristic[];

	featuresByLevel: {
		level: number;
		features: Feature[];
	}[];
	talents: Talent[];
	abilities: Ability[];

	level: number;
	characteristics: {
		characteristic: Characteristic;
		value: number;
	}[];
	basicAttacks: BasicAttacks;
	defenses: Defenses;
	hitPointBase: number;
}
