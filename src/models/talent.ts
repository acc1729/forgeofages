import { Element } from './element';
import { Tier } from '../enums/tier';

export interface Talent extends Element {
  tier: Tier;
}
