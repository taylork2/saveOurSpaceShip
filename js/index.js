import './player_engine';
import './room';
import { state } from './state';
import { initializeNavigator } from './navigator';
import { initializeRoom } from './room';

initializeNavigator(state);
initializeRoom(state);