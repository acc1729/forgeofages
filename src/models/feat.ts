import { Tier } from '../enums/tier';
import { Element } from './element';

export interface Feat extends Element {
	tier: Tier
	// todo: dependencies?
}
