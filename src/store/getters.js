
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
    getMuscleFilters(state){
        return state.muscleTypes;
    },
    getFilterDialog(state){
        return state.filterDialog;
    },
    getExercisePopupDialog(state){
        return state.exercisePopupDialog;
    },
    getHoverEffectDialog(state){
        return state.hoverEffectDialog;
    },
    getWorkoutNameDialog(state){
        return state.workoutNameDialog;
    }
}