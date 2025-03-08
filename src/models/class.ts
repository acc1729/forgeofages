import { Ability } from './ability';
import { Characteristic } from '../enums/characteristic';
import { Element } from './element';
import { Feature } from './feature';
import { Talent } from './talent';

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
}
