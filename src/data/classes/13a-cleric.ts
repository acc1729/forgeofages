import { Characteristic } from '../../enums/characteristic';
import { Tier } from '../../enums/tier';
import { FactoryLogic } from '../../logic/factory-logic';
import { HeroClass } from '../../models/class';

export const cleric: HeroClass = {
	id: 'class-cleric',
	name: 'Cleric',
	description: `
**Ability Scores:** Clerics gain a +2 class bonus to Wisdom or Strength, as long as it isn't the same ability you increase with your +2 racial bonus.

**Backgrounds:** Possible backgrounds include: healer, archivist, military chaplain, temple guard, bartender, reformed thief, dwarven hierophant, initiate, and bishop.

**Gear:** At 1st level, a cleric starts with a melee weapon, decent armor, a holy symbol, and other minor possessions suggested by their backgrounds. They might even have a crossbow.`,
	primaryCharacteristics: [Characteristic.Strength, Characteristic.Constitution],
	featuresByLevel: [
		{
			level: 1,
			features: [
				FactoryLogic.feature.create({
					id: 'cleric-magic',
					name: 'Cleric Magic',
					description: `
All clerics have the Ritual Magic class feature. They also receive a bonus spell: *heal*.

There are certain abilities specific to the cleric that can affect their powers:
- Cast for power and cast for broad effect: The spell can be used one of two ways— either as a more powerful effect on one target (power) or as a weaker effect on multiple targets (broad). Spells cast for power cannot target the caster. Spells cast for broad effect can.
- Free recovery: The cleric can recover hit points as if they were using a recovery (without actually spending the recovery).
- Heal using a recovery: The character targeted with a healing effect uses one of their recoveries and rolls their own recovery dice.
- Invocation: A quick action that offers advantages in battle. It can be made once a day. More than one cleric in a party cannot use the same invocation during a battle.`
				}),
				FactoryLogic.feature.createChoice({
					id: 'cleric-characteristic-bonus',
					name: 'Cleric Characteristic Bonus',
					options: [
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'cleric-bonus-wis',
								characteristic: Characteristic.Wisdom,
								value: 2,
							}),
							value: 1,
						},
						{
							feature: FactoryLogic.feature.createCharacteristicBonus({
								id: 'cleric-bonus-str',
								characteristic: Characteristic.Strength,
								value: 2,
							}),
							value: 1,
						},
					]
				}),
				FactoryLogic.feature.createClassTalentChoice({
					id: 'cleric-talents-1',
					name: 'Talents: Cleric Domains',
					description: "Choose three cleric talents/domains. Each talent/domain provides an ability that can be improved by feats. It also provides an invocation you can use as a quick action once per day, per battle, per party.",
					count: 3,
					tier: Tier.Adventurer,
				})
			]
		},
	],
	talents: [
		FactoryLogic.createTalent({
			id: 'cleric-domain-healing',
			name: 'Domain: Healing',
			description: `
When you cast a spell that lets you or an ally heal using a recovery, the target also adds hit points equal to double your level to the recovery.

**Invocation of Healing:** This battle, you gain an additional use of the heal spell. The first heal spell you cast after using this invocation allows the target to heal using a free recovery instead of spending a recovery.

**Adventurer Feat:** When you cast a spell that allows an ally to heal using a recovery, you can let them use one of your recoveries instead. (If you also have the Protection/Community domain, any nearby ally can expend the recovery instead of you.)

**Champion Feat:** The invocation of healing gives you two additional uses of heal this battle instead of only one.

**Epic Feat:** Increase the additional hit points the target heals to triple your level.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'cleric-domain-justice-vengeance',
			name: 'Domain: Justice/Vengeance',
			description: `
Once per turn when an enemy scores a critical hit against you or a nearby ally, or drops you or a nearby ally to 0 hp or below, you gain an attack-reroll blessing. Immediately choose a nearby ally and give them the blessing as a free action.

An ally with this blessing can use it to reroll an attack as a free action this battle. An ally can only have one such blessing on them at a time.

**Invocation of Justice/Vengeance:** This battle, add double your level to the miss damage of your attacks and the attacks of your nearby allies. (For example, your basic melee attack as a cleric will deal triple your level as miss damage while this invocation is active.)

**Adventurer Feat:** You can take the attack-reroll blessing yourself.

**Champion Feat:** When you gain an attack-reroll blessing to distribute, you gain two blessings to distribute instead.

**Epic Feat:** Attacks rolls from your reroll blessings gain a +4 bonus.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'cleric-domain-knowledge-lore',
			name: 'Domain: Knowledge/Lore',
			description: `
You gain 4 additional background points that must be used somehow in relation to knowledge or lore.

**Invocation of Knowledge/Lore:** You must use this invocation during your first round of a battle. When you do, you get a quick glimpse of the battle's future. Roll a d6; as a free action at any point after the escalation die equals the number you rolled, you can allow one of your
allies to reroll a single attack roll with a +2 bonus thanks to your vision of this future.

**Adventurer Feat** Once per day, you can change one of your skill checks involving knowledge to a natural 20 instead. Interpret the word “knowledge” as loosely as your GM allows. GMs, be generous.

**Champion Feat** You now roll a d4 for the invocation, not a d6.

**Epic Feat** You gain a different positive relationship point each day with a random icon, purely because the icon has realized you know something they need to know. It changes every day and it might contradict your usual icon relationships.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'cleric-domain-life-death',
			name: 'Domain: Life/Death',
			description: `
You and your nearby allies gain a +1 bonus to death saves.

**Invocation of Life/Death:** This battle, you and each of your allies can each separately add the escalation die to a single save made by that character. In addition, you and your allies do not die from hit point damage when your negative hit points equal half your normal hit points. Instead, you die when your negative hit points equal your full hit points.

**Adventurer Feat:** The death save bonus increases to +2.

**Champion Feat:** Each battle, the first time an ally near you becomes staggered, that ally immediately heals hit points equal to twice your level.

**Epic Feat:** Your first use of the resurrection spell is free, and doesn't count against your total.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'cleric-domain-love-beauty',
			name: 'Domain: Love/Beauty',
			description: `
Once per level, you can generate a one-point conflicted relationship with a heroic or ambiguous icon you do not already have a relationship with. The relationship point remains with you until you gain a level, and then it's time for another one-level relationship.

**Champion Feat:** You gain two points in the relationship instead.

**Invocation of Love/Beauty:** As a free action, at some dramatic moment, you or an ally of your choice can roll for one icon relationship that might have an effect on the battle. Rolls of 5 and 6 are beneficial as usual, though the GM will have to improvise what that means in the middle of combat. The invocation's advantage does not occur the moment you roll initiative; wait for a dramatic moment instead.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'cleric-domain-protection-community',
			name: 'Domain: Protection/Community',
			description: `
Once per battle, you can affect two additional allies when you cast a spell for broad effect.

**Adventurer Feat:** Whenever you target one or more allies with a spell, one ally of your choice can roll a save against a save ends effect.

**Invocation of Protection/Community:** This battle, critical hits against you and your nearby allies deal normal damage instead of critical damage.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'cleric-domain-strength',
			name: 'Domain: Strength',
			description: `
You can wield heavy/martial weapons without an attack penalty.

**Adventurer Feat:** Once per battle, you can deal extra damage to one target you hit with a melee attack as a free action. The damage bonus is a number of d4 equal to your Strength modifier or to your level, whichever is higher.

**Champion Feat:** You can use d8s instead of d4s for the bonus damage dice.

**Epic Feat:** Once per day, you can use d20s instead of d8s for the bonus damage dice.

**Invocation of Strength:** This battle, you and your nearby allies deal triple damage instead of double damage on critical hits with melee attacks.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'cleric-sun-anti-undead',
			name: 'Domain: Sun/Anti-Undead',
			description: `
Every attack you make deals holy damage instead of other types of damage unless you choose otherwise for a specific attack.

**Adventurer Feat:** If your attack already deals holy damage, it gains the following bonus damage—adventurer tier: +1 damage; champion tier: +2 damage; epic tier: +3 damage.

**Champion Feat:** You gain a +2 bonus to all defenses against attacks by undead.

**Epic Feat:** The invocation also affects your allies' daily spells.

**Invocation of Sun/Anti-Undead:** When you cast a daily cleric spell this battle, roll a d6. If you roll less than or equal to the escalation die, you regain the use of that daily spell after the battle.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'cleric-trickery',
			name: 'Domain: Trickery',
			description: `
Once per battle, as a quick action when you are engaged with an enemy, roll a d20 (your “trick die”). As a free action before the start of your next turn, give your trick die to a nearby ally or enemy who is about to make an attack roll. The trick die result becomes the natural result of their roll instead.

**Champion Feat:** Your trick die can be used for any one d20 roll, not just an attack.

**Epic Feat:** You get another trick die roll to use each battle the first time the escalation die reaches 3+.

**Invocation of Trickery/Illusion:** This battle, attacks against you by enemies that moved to engage you during their turn miss on natural odd rolls.`,
			tier: Tier.Adventurer,
		}),
		FactoryLogic.createTalent({
			id: 'cleric-war-leadership',
			name: 'Domain: War/Leadership',
			description: `
Once per turn when you make a melee attack against an enemy, hit or miss, your allies gain a +1 attack bonus against that enemy until the start of your next turn.

**Adventurer Feat:** The attack no longer has to be a melee attack, close and ranged attacks also work.

**Champion Feat:** The bonus now applies against all enemies you attack; you no longer have to single out one foe if you use a spell that attacks multiple enemies.

**Epic Feat:** Allies now also get a damage bonus against such enemies equal to double your Charisma modifier.

**Invocation of War/Leadership:** Increase the escalation die by 1.`,
			tier: Tier.Adventurer,
		}),
	],
	abilities: [],
	level: 1,
	characteristics: []
};
