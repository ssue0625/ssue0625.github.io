import TetrisModel from './TetrisModel.mjs';
import TetrisView from './TetrisView.mjs';
import TetrisViewModel from './TetrisViewModel.mjs';
import TetrisPanel from './TetrisPanel.mjs';
import HelperClass from '../Utility/HelperClass.mjs';

(new TetrisViewModel('tetris')).run(); //IIFE
window.$ = new HelperClass();