import { DamageModifier, Modifier } from '../models/damage-modifier';
import { Plot, PlotLink } from '../models/plot';
import { AbilityType } from '../models/ability';
import { DamageRoll } from '../models/damage-roll';
import { Dice } from '../enums/dice';
import { AbilityUsage } from '../enums/ability-usage';
import { Size } from '../models/size';

export class FormatLogic {
	static getAbilityType = (type: AbilityType) => {
		if (type.usage === AbilityUsage.Other) {
			return type.time;
		}
		const qualifiers = (type.qualifiers ?? []).map(q => `(${q})`);

		return [ type.free ? 'Free' : undefined, type.usage, ...qualifiers ]
			.filter(x => x)
			.join(' ');
	};

	static getBonus = (bonus: number): string => {
		if (bonus > 0) return `+${bonus}`;
		if (bonus < 0) return `${bonus}`;
		return '-';
	};
	
	static getHitBonus = (bonus: number): string => {
		if (bonus >= 0) return `+${bonus}`;
		else return `${bonus}`;
	};

	static getDamageRoll = (damageRoll: DamageRoll): string => {
		const multiplierFragment = damageRoll.multiplier === 1 ? '' : ` x ${damageRoll.multiplier}`;
		const bonusFragment = damageRoll.bonus === 1 ? '' : ` + ${damageRoll.bonus}`;

		return `${damageRoll.numberOfDice}${FormatLogic.getDice(damageRoll.dice)}${multiplierFragment}${bonusFragment}`
	}
	
	static getDice = (dice: Dice): string => {
		return {
			[Dice.D4]: "d4",
			[Dice.D6]: "d6",
			[Dice.D8]: "d8",
			[Dice.D10]: "d10",
			[Dice.D12]: "d12",
			[Dice.D20]: "d20",
		}[dice];
	}
	
	static getSize = (size: Size) => {
		if (size.value > 1) {
			return size.value.toString();
		}

		return `1${size.mod}`;
	};

	static getDamageModifier = (mod: DamageModifier) => {
		return `${mod.damageType} ${mod.type} ${FormatLogic.getModifier(mod)}`;
	};

	static getModifier = (mod: Modifier) => {
		const sections: string[] = [];
		if (mod.value && mod.valuePerLevel && (mod.value === mod.valuePerLevel)) {
			sections.push(`${mod.value >= 0 ? '+' : ''} ${mod.value} per level`);
		} else {
			if (mod.value) {
				sections.push(`${mod.value >= 0 ? '+' : ''} ${mod.value}`);
			}

			if (mod.valuePerLevel) {
				sections.push(`${mod.valuePerLevel >= 0 ? '+' : ''} ${mod.valuePerLevel} per level after 1st`);
			}
		}

		if (mod.valuePerEchelon) {
			sections.push(`${mod.valuePerEchelon >= 0 ? '+' : ''} ${mod.valuePerEchelon} per echelon`);
		}

		if (mod.valueCharacteristics.length > 0) {
			const ch = mod.valueCharacteristics.join(' or ');
			if (mod.valueCharacteristicMultiplier === 1) {
				sections.push(`+ ${ch}`);
			} else {
				sections.push(`+ ${ch} x ${mod.valueCharacteristicMultiplier}`);
			}
		}

		return sections.join(' ') || '+0';
	};

	static getPlotLinkTitle = (link: PlotLink, parentPlot: Plot) => {
		let plotPointName = 'Link';

		if (parentPlot) {
			const plot = parentPlot.plots.find(p => p.id === link.plotID);
			if (plot && plot.name) {
				plotPointName = plot.name;
			}
		}

		return link.label ? `${link.label}: ${plotPointName}` : plotPointName;
	};
}
