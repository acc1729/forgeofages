import { Element } from './element';

export interface Background {
		background: string,
		value: number,
}

export interface Backgrounds extends Element {
	backgrounds: Background[];
}
