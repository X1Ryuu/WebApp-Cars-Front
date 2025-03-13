import {Brand} from '../brand/brand';
import {Generation} from '../generation/generation';
import {Version} from '../version/version';

export interface Model {
  id: number;
  name: string;

  brand: Brand;


  versions: Version[];
  generations: Generation[];
}
