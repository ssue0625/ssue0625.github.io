import TetrisViewModel from './TetrisViewModel.mjs';
import HelperClass from '../Utility/HelperClass.mjs';
(new TetrisViewModel('tetris')).run(); //IIFE
window.$ = new HelperClass();

var tetrisMusic = new Audio();
tetrisMusic.src = "./TetrisMusic.mp3";
tetrisMusic.play();