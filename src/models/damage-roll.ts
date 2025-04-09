import { Dice } from '../enums/dice';

export interface DamageRoll {
	dice: Dice,
	numberOfDice: number,
	multiplier: number,
	bonus: number,
};
