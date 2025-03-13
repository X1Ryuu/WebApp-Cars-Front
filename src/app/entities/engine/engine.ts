import {Version} from '../version/version';

export interface Engine {
  id: number;
  name: string;
  nameId: string;
  version: Version;

  gasoline: string;

  volume: number;
  hp: number;
  kWp: number;
  injection: string;
  from: number;
}
