//import fetch from 'cross-fetch'

//const REST_SERVER = "http://simple-route-nodeportfolio.193b.starter-ca-central-1.openshiftapps.com:8080/"; //process.env.rest_server || 'http://127.0.0.1:8088/';
//export const REST_SERVER = 'http://127.0.0.1:8088/';
export const REST_SERVER = 'http://' + process.env.srv_addr + ':' + process.env.srv_port + '/'; //"http://voidfill.openode.io/";
console.log("Rest server is: '" + REST_SERVER + "'");

export function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}



export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE'

export const showMessage = makeActionCreator(SHOW_MESSAGE, 'message');
export const dismissMessage = makeActionCreator(DISMISS_MESSAGE);


export function dispatchMessagedFailure(d, failure) {
	return function(dispatch) {
		dispatch(d);
		dispatch(showMessage(failure.error));
	};
}
