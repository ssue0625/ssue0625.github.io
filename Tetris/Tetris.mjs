import TetrisModel from './TetrisModel.mjs'; 
import TetrisView from './TetrisView.mjs';
import TetrisViewModel from './TetrisViewModel.mjs';
import TetrisPanel from './TetrisPanel.mjs';
import HelperClass from '../Utility/HelperClass.mjs';
// const tetrisViewModel = new TetrisViewModel('tetris');
// tetrisViewModel.run(); 
(new TetrisViewModel('tetris')).run();  //IIFE
//(new TetrisViewModel('game')).run();  //IIFE
// const $ = new HelperClass();
// $.c('ppp'); 
// mjs는 파일 단위이므로, 전역변수에 프로퍼티 추가.
window.$ = new HelperClass();
//window = {$: new HelperClass(), ...}
//$.d('이상해', '???');
