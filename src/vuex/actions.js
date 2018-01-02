function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
};



// 登陆
export const loginIn = ({ dispatch }) => {
  dispatch('LOG_IN', initData);
};
// 注销
export const loginOff = makeAction('LOG_OFF');
