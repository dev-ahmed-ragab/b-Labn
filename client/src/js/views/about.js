import banner from '../about/banner.js';
import explore from '../about/explore.js';
import gallery from '../about/gallery.js';
import history from '../about/history.js';
import story from '../about/story.js';
import team from '../about/team.js';

export default () => /*html*/ `
  ${banner()}
  ${story()}
  ${history()}
  ${gallery()}
  ${team()}
  ${explore()}
`;
