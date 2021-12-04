export default {
    setUser(state, user){
        state.user = user;
    },
    setToken(state, token){
        state.token = token;
    },
    clearTokenAndUser(state){
        state.user = null,
        state.token = null
    },
    updateMessageList(state, message){
        state.messageList.push(message);
    },
    setMessageList(state, messages){
        state.messageList = messages;
    },
    addLikeOrDislike(state,packet){
        state.messageList.forEach(element => {
            if(element._id == packet.message_id) {
                if(packet.type == 'like'){
                    
                    if(packet.isLiked){
                        element.like.forEach((user,index) =>{
                            if(user.id == packet.user_id){
                                element.like.splice(index,1);
                            }
                        })
                    }else if (packet.isDisliked){
                        element.like.push({
                            'id' : packet.user_id
                        })
                        element.dislike.forEach((user,index) =>{
                            if(user.id == packet.user_id){
                                element.dislike.splice(index,1);
                            }
                        })
                    }else{
                        element.like.push({
                            'id' : packet.user_id
                        })
                    }
                }
                else{
                    if(packet.isLiked){
                        element.like.forEach((user,index) =>{
                            if(user.id == packet.user_id){
                                element.like.splice(index,1);
                            }
                        })

                        element.dislike.push({
                            'id' : packet.user_id
                        })
                    }else if (packet.isDisliked){
                        element.dislike.forEach((user,index) =>{
                            if(user.id == packet.user_id){
                                element.dislike.splice(index,1);
                            }
                        })
                    }else{
                        element.dislike.push({
                            'id' : packet.user_id
                        })
                    }
                }
            }
        });
    },
    updateDialog(state){
        state.dialog = !state.dialog;
    },
    updateAddEventDialog(state){
        state.addEventDialog = !state.addEventDialog;
    },
    updateUser(state,payload){
        state.user.tall = payload.tall
        state.user.wight = payload.weight
        state.user.gender = payload.gender
    },
    addEvent(state,payload){
        if(state.user.events){
            state.user.events.push(payload)
        }else{
            state.user.events = payload;
        }
        localStorage.setItem('user', JSON.stringify(state.user)) 
    },
    updateMuscleFilters(state, payload){
        state.muscleTypes = payload;
    },
    updateFilterDialog(state){
        state.filterDialog = !state.filterDialog
    },
    updateExerciseDialog(state){
        state.exercisePopupDialog = !state.exercisePopupDialog
    },
    updateHoverEffectDialog(state){
        state.hoverEffectDialog = !state.hoverEffectDialog;
    },
    updateWorkoutNameDialog(state){
        state.workoutNameDialog = !state.workoutNameDialog;
    },
    addWorkoutPrograms (state,payload){
        state.user.workoutPrograms.push({
            'workoutList' : payload.workoutList,
            'workoutName' : payload.workoutName,
        })
        localStorage.setItem('user', JSON.stringify(state.user));
    }
}