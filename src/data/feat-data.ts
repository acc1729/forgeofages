import { Feat } from '../models/feat';
import { Tier } from '../enums/tier';


export class FeatData {
	static improvedInitiative: Feat = {
		id: 'general-improved-initiative',
		tier: Tier.Adventurer,
		name: 'Improved Initiative',
		description: `Gain a +4 bonus to initiative checks.`,
	};

	static linguistAdv: Feat = {
		id: 'general-linguist-a',
		tier: Tier.Adventurer,
		name: 'Linguist',
		description: `If your campaign cares about languages, this
	is the feat you take to speak enough arcana, dwarven, elven,
	gnomish, gnoll, goblin, orcish, and other standard humanoid
	languages to comprehend enough of what most other
	humanoids are saying or screaming during battle. You are
	probably not fluent in all these languages, no one will mistake
	you for a native speaker, and your vocabulary is probably
	adventurer-centric, heavy on words connected to danger
	rather than philosophy or emotions. But if it’s important to
	your character and it matches your backgrounds and story,
	sure, go ahead and be fluent in a few.
	You can also read enough to get by in all these languages.`
	};

	static linguistCha: Feat = {
		id: 'general-linguist-c',
		tier: Tier.Champion,
		name: 'Linguist',
		description: `You can speak, read, and write all the
	humanoid languages fluently. Stranger languages are no
	problem for you either: giant speech, flame tongues, Abyssal,
	4th Age reptiloid, lich-cant, etc. If someone is speaking it,
	you can probably figure it out given a bit of time to ponder
	and cross-reference.
	There shouldn’t be any need for an epic tier linguist feat.
	If you really want one, you know what you want it for better
	than we do.`
	};

	static preciseShot: Feat = {
		id: 'general-precise-shot',
		tier: Tier.Adventurer,
		name: 'Precise Shot',
		description: `When your ranged attack targets an enemy who
	is engaged with an ally, you have no chance of hitting that ally.`,
	};
}
