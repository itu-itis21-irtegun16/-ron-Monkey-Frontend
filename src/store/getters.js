
export default {
    isLoggedIn(state){
        return !!state.token;
    },
    userInfo(state){
        return state.user;
    },
    getMessageList(state){
        return state.messageList;
    },
    getDialog(state){
        return state.dialog;
    },
    getAddEventDialog(state){
        return state.addEventDialog;
    },
    getEvents(state){
        return state.events;
    }
}