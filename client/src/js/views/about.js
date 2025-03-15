import banner from '../about/banner';
import explore from '../about/explore';
import gallery from '../about/gallery';
import history from '../about/history';
import story from '../about/story';
import team from '../about/team';

export default () => /*html*/ `
 
${banner()}

${story()}

${history()}

  ${gallery()}



  ${team()}

${explore()}
`;
