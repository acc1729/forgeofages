export enum Tier {
	Adventurer,
	Champion,
	Epic,
	Zenith,
};

export const TierLabels = {
	[Tier.Adventurer]: 'Adventurer',
	[Tier.Champion]: 'Champion',
	[Tier.Epic]: 'Epic',
	[Tier.Zenith]: 'Zenith'
};

export const TierAbbreviations = {
	[Tier.Adventurer]: 'A',
	[Tier.Champion]: 'C',
	[Tier.Epic]: 'E',
	[Tier.Zenith]: 'Z'
};
