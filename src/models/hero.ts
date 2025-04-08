import { ConditionEndType, ConditionType } from '../enums/condition-type';
import { Ancestry } from './ancestry';
import { Background } from './backgrounds';
import { Career } from './career';
import { Complication } from './complication';
import { Culture } from './culture';
import { Feature } from './feature';
import { HeroClass } from './class';
import { IconRelationship } from './icon-relationships';
import { Item } from './item';
import { Project } from './project';

export interface Condition {
	id: string;
	type: ConditionType;
	text: string;
	ends: ConditionEndType;
}

export interface HeroState {
	hitPointsLost: number;
	staminaDamage: number;
	staminaTemp: number;
	recoveriesUsed: number;
	surges: number;
	victories: number;
	xp:number;
	heroicResource: number;
	heroTokens: number;
	renown: number;
	wealth: number;
	projectPoints: number;
	conditions: Condition[];
	inventory: Item[];
	projects: Project[];
	notes: string;
}

export interface AbilityCustomization {
	abilityID: string;
	name: string;
	description: string;
	notes: string;
}

export interface Hero {
	id: string;
	name: string;

	oneUniqueThing: string;
	backgrounds: Background[];
	iconRelationships: IconRelationship[];

	folder: string;
	settingIDs: string[];

	ancestry: Ancestry | null;
	culture: Culture | null;
	class: HeroClass | null;
	career: Career | null;
	complication: Complication | null;

	features: Feature[];
	state: HeroState;
	abilityCustomizations: AbilityCustomization[];
}

export type HeroEditTab = 'characteristics' | 'ancestry' | 'culture' | 'career' | 'class' | 'complication' | 'details';
