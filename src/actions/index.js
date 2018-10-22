function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}



export const LIST_CONTENT = 'LIST_CONTENT';
export const SHOW_CONTENT = 'SHOW_CONTENT';
export const ADD_CONTENT = 'ADD_CONTENT';
export const READ_CONTENT = 'READ_CONTENT';
export const HIDE_CONTENT = 'HIDE_CONTENT';

export const listContent = makeActionCreator(LIST_CONTENT);
export const showContent = makeActionCreator(SHOW_CONTENT, 'id');
export const readContent = makeActionCreator(READ_CONTENT, 'id');
export const hideContent = makeActionCreator(HIDE_CONTENT, 'id');
export const addContent  = makeActionCreator(ADD_CONTENT, 'name', 'title', 'content');

