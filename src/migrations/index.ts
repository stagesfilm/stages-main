import * as migration_20260330_153644 from './20260330_153644';
import * as migration_20260330_164145 from './20260330_164145';

export const migrations = [
  {
    up: migration_20260330_153644.up,
    down: migration_20260330_153644.down,
    name: '20260330_153644',
  },
  {
    up: migration_20260330_164145.up,
    down: migration_20260330_164145.down,
    name: '20260330_164145'
  },
];
