export default function SuccessAndErrorMsg({stateSuccessAndErrorMsg}){
  return (
    <h2 className={`${stateSuccessAndErrorMsg['style'][stateSuccessAndErrorMsg.msgType]} ${stateSuccessAndErrorMsg.displayNone}`}>
      <span className="font-semibold">{stateSuccessAndErrorMsg.msgType}: </span>
      <span>{stateSuccessAndErrorMsg.msg}</span>
    </h2>
  );
}

function showError(updateStateSuccessAndErrorMsg, error){
  // console.log('hi');
  updateStateSuccessAndErrorMsg(previousState=>{
    return {
      ...previousState,
      msgType: 'Error',
      msg : error, 
      displayNone: ''
    }
  });
}
function hideError(updateStateSuccessAndErrorMsg){
  updateStateSuccessAndErrorMsg(previousState=>{
    return {
      ...previousState,
      displayNone: 'displayNone'
    }
  });
}

export {showError, hideError};