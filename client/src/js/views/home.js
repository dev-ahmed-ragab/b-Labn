import about from '../home/about.js';
import galler from '../home/galler.js';
import hero from '../home/hero.js';
import menu from '../home/menu.js';

export default () => /*html*/ `

 

 ${hero()}
 ${about()}
${menu()}


${galler()}
 
`;
