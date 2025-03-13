import { Element } from './element';
import { Tier } from '../enums/tier';
import { Feat } from './feat';

export interface Talent extends Element {
  tier: Tier;
  cost: number;
  feats: Feat[];
}
