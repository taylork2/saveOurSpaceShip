import 'matter-js';

import { state } from './state';
import { initializeNavigator } from './navigator';
import { initializeRoom } from './room';
import { Game } from './game/game';
import { begin } from './start';


initializeRoom(state);
const game = new Game(state);
initializeNavigator(state, game);
begin(game);

