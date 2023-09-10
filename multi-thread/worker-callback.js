module.exports = ({ params, callBack }) => {
  if (callBack instanceof Function) {
    callBack(params);
  }
  return;
};