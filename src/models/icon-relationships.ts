import { Element } from './element';

export enum Direction {
	Positive,
	Conflicted,
	Negative,
}

export interface IconRelationship {
		icon: string,
		direction: Direction,
		value: number,
}

export interface IconRelationships extends Element {
	relationships: IconRelationship[];
}
