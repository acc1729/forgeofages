import { Ability } from './ability';
import { Characteristic } from '../enums/characteristic';
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
type Defenses = {
	none: number;
	light: number;
	heavy: number;
	heavyPenalty: number;
	shieldPenalty: number; 
	mental: number;
	physical: number;
};

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
	defenses: Defenses;
}
