import { EnvironmentData, OrganizationData, UpbringingData } from './culture-data';
import { CareerData } from './career-data';
import { ComplicationData } from './complication-data';
import { DomainData } from './domain-data';
import { FactoryLogic } from '../logic/factory-logic';
import { KitData } from './kit-data';
import { PerkData } from './perk-data';
import { SkillList } from '../enums/skill-list';
import { Sourcebook } from '../models/sourcebook';
import { censor } from './classes/censor';
import { conduit } from './classes/conduit';
import { devil } from './ancestries/devil';
import { dragonKnight } from './ancestries/dragon-knight';
import { dwarf } from './ancestries/dwarf';
import { elementalist } from './classes/elementalist';
import { fury } from './classes/fury';
import { hakaan } from './ancestries/hakaan';
import { highElf } from './ancestries/elf-high';
import { human } from './ancestries/human';
import { memonek } from './ancestries/memonek';
import { nullClass } from './classes/null';
import { orc } from './ancestries/orc';
import { polder } from './ancestries/polder';
import { radenwight } from './monsters/radenwight';
import { revenant } from './ancestries/revenant';
import { shadow } from './classes/shadow';
import { tactician } from './classes/tactician';
import { talent } from './classes/talent';
import { timeRaider } from './ancestries/time-raider';
import { troubadour } from './classes/troubadour';
import { wodeElf } from './ancestries/elf-wode';

export class SourcebookData {
	static core: Sourcebook = {
		id: '',
		name: 'Core',
		description: 'Core game elements.',
		isHomebrew: false,
		ancestries: [
			devil,
			dragonKnight,
			dwarf,
			wodeElf,
			highElf,
			human,
			orc,
			polder,
			revenant
		],
		cultures: [],
		careers: [
			CareerData.agent,
			CareerData.aristocrat,
			CareerData.artisan,
			CareerData.beggar,
			CareerData.criminal,
			CareerData.disciple,
			CareerData.explorer,
			CareerData.farmer,
			CareerData.gladiator,
			CareerData.laborer,
			CareerData.magesApprentice,
			CareerData.performer,
			CareerData.politician,
			CareerData.sage,
			CareerData.sailor,
			CareerData.soldier,
			CareerData.warden,
			CareerData.watchOfficer
		],
		classes: [
			censor,
			conduit,
			elementalist,
			fury,
			nullClass,
			shadow,
			tactician,
			talent,
			troubadour
		],
		complications: [
			ComplicationData.cultVictim,
			ComplicationData.devilDeal,
			ComplicationData.elementalAbsorption,
			ComplicationData.fireAndChaos,
			ComplicationData.primordialSickness,
			ComplicationData.punishmentCurse,
			ComplicationData.shipwrecked,
			ComplicationData.vividDreams,
			ComplicationData.ward,
			ComplicationData.warOfTheGuilds
		],
		domains: [
			DomainData.creation,
			DomainData.death,
			DomainData.fate,
			DomainData.knowledge,
			DomainData.life,
			DomainData.love,
			DomainData.nature,
			DomainData.protection,
			DomainData.storm,
			DomainData.sun,
			DomainData.trickery,
			DomainData.war
		],
		kits: [
			KitData.arcaneArcher,
			KitData.battlemind,
			KitData.cloakAndDagger,
			KitData.dualWielder,
			KitData.guisarmier,
			KitData.martialArtist,
			KitData.mountain,
			KitData.panther,
			KitData.pugilist,
			KitData.raider,
			KitData.ranger,
			KitData.rapidFire,
			KitData.retiarius,
			KitData.shiningArmor,
			KitData.sniper,
			KitData.spellsword,
			KitData.stickAndRobe,
			KitData.swashbuckler,
			KitData.swordAndBoard,
			KitData.warriorPriest,
			KitData.whirlwind,
			KitData.boren,
			KitData.corven,
			KitData.raden,
			KitData.vuken
		],
		perks: [
			PerkData.areaOfExpertise,
			PerkData.expertArtisan,
			PerkData.handy,
			PerkData.homesteader,
			PerkData.improvisationCreation,
			PerkData.inspiredArtisan,
			PerkData.travellingArtisan,
			PerkData.brawny,
			PerkData.camouflageHunter,
			PerkData.dangerSense,
			PerkData.friendCatapult,
			PerkData.iveGotYou,
			PerkData.monsterWhisperer,
			PerkData.putYourBackIntoIt,
			PerkData.survivalist,
			PerkData.teamwork,
			PerkData.teamLeader,
			PerkData.woodWise,
			PerkData.charmingLiar,
			PerkData.cunningPlan,
			PerkData.dazzler,
			PerkData.engrossingMonologue,
			PerkData.fastNegotiator,
			PerkData.harmonizer,
			PerkData.lieDetector,
			PerkData.openBook,
			PerkData.pardonMyFriend,
			PerkData.persistent,
			PerkData.powerPlayer,
			PerkData.soTellMe,
			PerkData.spotTheTell,
			PerkData.criminalContacts,
			PerkData.forgettableFace,
			PerkData.gumUpTheWorks,
			PerkData.luckyDog,
			PerkData.masterOfDisguise,
			PerkData.slippedLead,
			PerkData.butIKnowWhoDoes,
			PerkData.eideticMemory,
			PerkData.expertSage,
			PerkData.iveReadAboutThisPlace,
			PerkData.linguist,
			PerkData.polymath,
			PerkData.specialist,
			PerkData.travellingSage,
			PerkData.arcaneTrick,
			PerkData.creatureSense,
			PerkData.familiar,
			PerkData.invisibleForce,
			PerkData.psychicWhisper,
			PerkData.thingspeaker,
			PerkData.ritualist
		],
		titles: [],
		items: [],
		monsterGroups: [
			radenwight
		],
		skills: [
			{ name: 'Alchemy', description: 'Make bombs and potions.', list: SkillList.Crafting },
			{ name: 'Architecture', description: 'Create buildings and vehicles.', list: SkillList.Crafting },
			{ name: 'Blacksmithing', description: 'Forge metal armor and weapons.', list: SkillList.Crafting },
			{ name: 'Fletching', description: 'Make ranged weapons and ammunition.', list: SkillList.Crafting },
			{ name: 'Forgery', description: 'Create false badges, documents, and other items.', list: SkillList.Crafting },
			{ name: 'Jewelry', description: 'Create bracelets, crowns, rings, and other jewelry.', list: SkillList.Crafting },
			{ name: 'Mechanics', description: 'Build machines and clockwork items.', list: SkillList.Crafting },
			{ name: 'Tailoring', description: 'Craft cloth and leather clothing.', list: SkillList.Crafting },
			{ name: 'Climb', description: 'Move up vertical surfaces.', list: SkillList.Exploration },
			{ name: 'Drive', description: 'Control vehicles.', list: SkillList.Exploration },
			{ name: 'Endurance', description: 'Remain engaged in strenuous activity over a long period of time.', list: SkillList.Exploration },
			{ name: 'Gymnastics', description: 'Move across unsteady or narrow surfaces, and tumble.', list: SkillList.Exploration },
			{ name: 'Heal', description: 'Use mundane first aid.', list: SkillList.Exploration },
			{ name: 'Jump', description: 'Leap vertical and horizontal distances.', list: SkillList.Exploration },
			{ name: 'Lift', description: 'Pick up, carry, and throw heavy objects.', list: SkillList.Exploration },
			{ name: 'Navigate', description: 'Read a map and travel without becoming lost.', list: SkillList.Exploration },
			{ name: 'Ride', description: 'Ride and control a mount who isn’t sapient, such as a horse.', list: SkillList.Exploration },
			{ name: 'Swim', description: 'Move through deep liquid.', list: SkillList.Exploration },
			{ name: 'Brag', description: 'Impress others with stories of your deeds.', list: SkillList.Interpersonal },
			{ name: 'Empathize', description: 'Relate to someone on a personal level.', list: SkillList.Interpersonal },
			{ name: 'Flirt', description: 'Attract romantic attention from someone.', list: SkillList.Interpersonal },
			{ name: 'Gamble', description: 'Make bets with others.', list: SkillList.Interpersonal },
			{ name: 'Handle Animals', description: 'Interact with animal wildlife that isn’t sapient.', list: SkillList.Interpersonal },
			{ name: 'Interrogate', description: 'Obtain information from a creature withholding it.', list: SkillList.Interpersonal },
			{ name: 'Intimidate', description: 'Awe or scare a creature.', list: SkillList.Interpersonal },
			{ name: 'Lead', description: 'Inspire people to action.', list: SkillList.Interpersonal },
			{ name: 'Lie', description: 'Convince someone that a falsehood is true.', list: SkillList.Interpersonal },
			{ name: 'Music', description: 'Perform music vocally or with an instrument.', list: SkillList.Interpersonal },
			{ name: 'Perform', description: 'Engage in dance, oratory, acting, or some other physical performance.', list: SkillList.Interpersonal },
			{ name: 'Persuade', description: 'Convince someone to agree with you through use of your charms and grace.', list: SkillList.Interpersonal },
			{ name: 'Read Person', description: 'Read the emotions and body language of other creatures.', list: SkillList.Interpersonal },
			{ name: 'Alertness', description: 'Intuitively sense the details of your surroundings.', list: SkillList.Intrigue },
			{ name: 'Conceal Object', description: 'Hide an object on your person or in your environment.', list: SkillList.Intrigue },
			{ name: 'Disguise', description: 'Change your appearance to look like a different person.', list: SkillList.Intrigue },
			{ name: 'Eavesdrop', description: 'Actively listen to something that is hard to hear, such as a whispered conversation through a door.', list: SkillList.Intrigue },
			{ name: 'Escape Artist', description: 'Escape from bonds such as rope or manacles.', list: SkillList.Intrigue },
			{ name: 'Hide', description: 'Conceal yourself from others’ observation.', list: SkillList.Intrigue },
			{ name: 'Pick Lock', description: 'Open a lock without using the key.', list: SkillList.Intrigue },
			{ name: 'Pick Pocket', description: 'Steal an item that another person wears or carries without them noticing.', list: SkillList.Intrigue },
			{ name: 'Sabotage', description: 'Disable a mechanical device such as a trap.', list: SkillList.Intrigue },
			{ name: 'Search', description: 'Actively search an environment for important details and items.', list: SkillList.Intrigue },
			{ name: 'Sneak', description: 'Move silently.', list: SkillList.Intrigue },
			{ name: 'Track', description: 'Follow a trail that another creature has left behind.', list: SkillList.Intrigue },
			{ name: 'Culture', description: 'Knowing about a culture’s customs, folktales, and taboos.', list: SkillList.Lore },
			{ name: 'Criminal Underworld', description: 'Knowing about criminal organizations, their crimes, their relationships, and their leaders.', list: SkillList.Lore },
			{ name: 'History', description: 'Knowing about significant past events.', list: SkillList.Lore },
			{ name: 'Magic', description: 'Knowing about magical places, spells, rituals, items, and phenomena.', list: SkillList.Lore },
			{ name: 'Monsters', description: 'Knowing monster ecology, strengths, and weaknesses.', list: SkillList.Lore },
			{ name: 'Nature', description: 'Knowing about natural flora, fauna, and weather.', list: SkillList.Lore },
			{ name: 'Psionics', description: 'Knowing about psionic places, spells, rituals, items, and phenomena.', list: SkillList.Lore },
			{ name: 'Religion', description: 'Knowing about religious mythology, practices, and rituals.', list: SkillList.Lore },
			{ name: 'Rumors', description: 'Knowing gossip, legends, and uncertain truths.', list: SkillList.Lore },
			{ name: 'Society', description: 'Knowing noble etiquette and the leadership and power dynamics of noble families.', list: SkillList.Lore }
		],
		languages: []
	};

	static orden: Sourcebook = {
		id: 'orden',
		name: 'Orden',
		description: 'The default setting for Draw Steel.',
		isHomebrew: false,
		ancestries: [
			hakaan,
			memonek,
			timeRaider
		],
		cultures: [
			FactoryLogic.createCulture('Devil', 'Urban, bureaucratic, academic.', [ 'Anjali' ], EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.academic),
			FactoryLogic.createCulture('Dragon Knight', 'Secluded, bureaucratic, martial.', [ 'Vastariax' ], EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.martial),
			FactoryLogic.createCulture('Dwarf', 'Secluded, bureaucratic, creative.', [ 'Zaliac' ], EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.creative),
			FactoryLogic.createCulture('Wode Elf', 'Wilderness, bureaucratic, martial.', [ 'Yllric' ], EnvironmentData.wilderness, OrganizationData.bureaucratic, UpbringingData.martial),
			FactoryLogic.createCulture('High Elf', 'Secluded, bureaucratic, martial.', [ 'Hyrallic' ], EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.martial),
			FactoryLogic.createCulture('Hakaan', 'Rural, communal, labor.', [ 'Vhoric' ], EnvironmentData.rural, OrganizationData.communal, UpbringingData.labor),
			FactoryLogic.createCulture('Human', 'Urban, communal, labor.', [ 'Vaslorian' ], EnvironmentData.urban, OrganizationData.communal, UpbringingData.labor),
			FactoryLogic.createCulture('Memonek', 'Nomadic, communal, academic.', [ 'Axiomatic' ], EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.academic),
			FactoryLogic.createCulture('Orc', 'Wilderness, anarchic, creative.', [ 'Kaliac' ], EnvironmentData.wilderness, OrganizationData.anarchic, UpbringingData.creative),
			FactoryLogic.createCulture('Polder', 'Urban, communal, creative.', [ 'Khoursirian' ], EnvironmentData.urban, OrganizationData.communal, UpbringingData.creative),
			FactoryLogic.createCulture('Time Raider', 'Nomadic, anarchic, martial.', [ 'Voll' ], EnvironmentData.nomadic, OrganizationData.anarchic, UpbringingData.martial),
			FactoryLogic.createCulture('Artisan Guild', 'Urban, bureaucratic, creative.', [], EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.creative),
			FactoryLogic.createCulture('Borderland Homestead', 'Wilderness, communal, labor.', [], EnvironmentData.wilderness, OrganizationData.communal, UpbringingData.labor),
			FactoryLogic.createCulture('College Conclave', 'Urban, bureaucratic, academic.', [], EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.academic),
			FactoryLogic.createCulture('Criminal Gang', 'Urban, communal, illegal.', [], EnvironmentData.urban, OrganizationData.communal, UpbringingData.illegal),
			FactoryLogic.createCulture('Farming Village', 'Rural, bureaucratic, labor.', [], EnvironmentData.rural, OrganizationData.bureaucratic, UpbringingData.labor),
			FactoryLogic.createCulture('Herding Community', 'Nomadic, communal, labor.', [], EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.labor),
			FactoryLogic.createCulture('Knightly Order', 'Secluded, bureaucratic, martial.', [], EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.martial),
			FactoryLogic.createCulture('Mercenary Band', 'Nomadic, bureaucratic, martial.', [], EnvironmentData.nomadic, OrganizationData.bureaucratic, UpbringingData.martial),
			FactoryLogic.createCulture('Merchant Caravan', 'Nomadic, bureaucratic, creative.', [], EnvironmentData.nomadic, OrganizationData.bureaucratic, UpbringingData.creative),
			FactoryLogic.createCulture('Monastic Order', 'Secluded, bureaucratic, academic.', [], EnvironmentData.secluded, OrganizationData.bureaucratic, UpbringingData.academic),
			FactoryLogic.createCulture('Noble House', 'Urban, bureaucratic, noble.', [], EnvironmentData.urban, OrganizationData.bureaucratic, UpbringingData.noble),
			FactoryLogic.createCulture('Outlaw Band', 'Wilderness, bureaucratic, illegal.', [], EnvironmentData.wilderness, OrganizationData.anarchic, UpbringingData.illegal),
			FactoryLogic.createCulture('Pauper Neighborhood', 'Urban, communal, labor.', [], EnvironmentData.urban, OrganizationData.communal, UpbringingData.labor),
			FactoryLogic.createCulture('Pirate Crew', 'Nomadic, anarchic, illegal.', [], EnvironmentData.nomadic, OrganizationData.anarchic, UpbringingData.illegal),
			FactoryLogic.createCulture('Telepathic Hive', 'Secluded, communal, creative.', [], EnvironmentData.secluded, OrganizationData.communal, UpbringingData.creative),
			FactoryLogic.createCulture('Traveling Entertainers', 'Nomadic, communal, creative.', [], EnvironmentData.nomadic, OrganizationData.communal, UpbringingData.creative)
		],
		careers: [],
		classes: [],
		complications: [],
		domains: [],
		kits: [],
		perks: [],
		titles: [],
		items: [],
		monsterGroups: [],
		skills: [
			{
				name: 'Timescape',
				description: 'Knowing about the various planets of the timescape',
				list: SkillList.Lore
			}
		],
		languages: [
			{
				name: 'Anjali',
				description: 'Spoken in the Hells; the language of contract law.'
			},
			{
				name: 'Axiomatic',
				description: 'Spoken by Memoneks; native language of Axiom; the common language of the timescape by trade.'
			},
			{
				name: 'Caelian',
				description: 'The language of the ancient Caelian Empire; the common tongue of Orden.'
			},
			{
				name: 'Filliaric',
				description: 'Spoken by Angulotls; an offshoot of Cyllinric.'
			},
			{
				name: 'Higaran',
				description: 'Spoken in Higara.'
			},
			{
				name: 'High Kuric',
				description: 'Spoken by bredbeddles, giants, ogres, and trolls.'
			},
			{
				name: 'High Rhyvian',
				description: 'Dead language; was spoken by sun elves.'
			},
			{
				name: 'Hyrallic',
				description: 'Spoken by high elves; the language of interspecies diplomacy.'
			},
			{
				name: 'Illyvric',
				description: 'Spoken by shadow elves.'
			},
			{
				name: 'Kalliak',
				description: 'Spoken by orcs; an offshoot of Zaliac.'
			},
			{
				name: 'Khamish',
				description: 'Dead language; was spoken by beast lords.'
			},
			{
				name: 'Kheltivari',
				description: 'Dead language; was spoken by the fae.'
			},
			{
				name: 'Khemharic',
				description: 'Spoken in Khemhara.'
			},
			{
				name: 'Kethaic',
				description: 'Spoken by kobolds; a patois of Vastariax and Caelian.'
			},
			{
				name: 'Khelt',
				description: 'Spoken by bugbears and the fey; an offshoot of Kheltivari.'
			},
			{
				name: 'Khoursirian',
				description: 'Spoken in Koursir; a distant offshoot of Khamish.'
			},
			{
				name: 'Low Kuric',
				description: 'Spoken by elementals.'
			},
			{
				name: 'Low Rhyvian',
				description: 'Dead language; was spoken by sky elves.'
			},
			{
				name: 'Mindspeech',
				description: 'Spoken by voiceless talkers; a symbolic language shared among native telepaths.'
			},
			{
				name: 'Oaxuatl',
				description: 'Spoken in Ix.'
			},
			{
				name: 'Old Variac',
				description: 'Dead language; was spoken by olothecs and voiceless talkers.'
			},
			{
				name: 'Phaedran',
				description: 'Spoken in Phaedros.'
			},
			{
				name: 'Phorialtic',
				description: 'Dead language; was spoken by elementals.'
			},
			{
				name: 'Proto-Ctholl',
				description: 'Spoken by demons; an incomplete offshoot of Tholl.'
			},
			{
				name: 'Rallarian',
				description: 'Dead language; was spoken by steel dwarves.'
			},
			{
				name: 'Riojan',
				description: 'Spoken in Rioja.'
			},
			{
				name: 'Szetch',
				description: 'Spoken by goblins and radenwights.'
			},
			{
				name: 'The First Language',
				description: 'Spoken by elder dragons; the language of magic.'
			},
			{
				name: 'Tholl',
				description: 'Spoken by gnolls.'
			},
			{
				name: 'Ullorvic',
				description: 'Dead language; was spoken by star elves.'
			},
			{
				name: 'Urollialic',
				description: 'Spoken by olothecs.'
			},
			{
				name: 'Uvalic',
				description: 'Spoken by the gol.'
			},
			{
				name: 'Vaniric',
				description: 'Spoken in Vanigar.'
			},
			{
				name: 'Variac',
				description: 'Spoken by gnomes, olothecs, trolls, and voiceless talkers; the common language of the World Below.'
			},
			{
				name: 'Vaslorian',
				description: 'Spoken in Vasloria.'
			},
			{
				name: 'Vastariax',
				description: 'Spoken by dragons and dragon knights.'
			},
			{
				name: 'Vhoric',
				description: 'Spoken by hakaan; offshoot of the stone giant dialect of High Kuric.'
			},
			{
				name: 'Voll',
				description: 'Spoken by time raiders.'
			},
			{
				name: 'Yllric',
				description: 'Spoken by wode elves; the language of druids.'
			},
			{
				name: 'Za\'hariax',
				description: 'Spoken by overminds.'
			},
			{
				name: 'Zaliac',
				description: 'Spoken by dwarves; the language of engineering.'
			}
		]
	};
}
