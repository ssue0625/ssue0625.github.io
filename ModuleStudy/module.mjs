import myClass, {
    showModule1
} from './module1.mjs';
import hello from './module2.mjs';

//showModule1();
const tClass = new myClass();
tClass.show();
hello();