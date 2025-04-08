import { Element } from './element';

/**
 * Some notes on defenses in 13A:
 * All classes can use light or no armor, without penalty.
 * Rogue and monk have 11 AC with no armor. All other classes have 10.
 * Monk has a -4 penalty with heavy armor! All other penalized classes have -2.
 * Shield always gives +1 AC, and occasionally a -2 penalty.
 */
export interface Defenses extends Element {
	none: number,
	light: number,
	heavy: number,
	heavyPenalty: number,
	shieldPenalty: number, 
	physical: number,
	mental: number,
};

