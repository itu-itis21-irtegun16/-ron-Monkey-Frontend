import axios from 'axios'
const APIUrl = 'http://3.144.72.23:3000'
// const APIUrl = 'http://localhost:3000'
export default {
    initMessageList({commit}){
        axios.get(`${APIUrl}/wise-saying`)
            .then((response) =>{
                commit("setMessageList", response.data)
            })
    },
    saveNewMessage({commit}, payload){
        axios.post(`${APIUrl}/wise-saying`, payload)
            .then((response) =>{
                if(response.status == 200) 
                {
                    commit("updateMessageList", response.data.newMes)
                }
            })
    },
    addLikeOrDislikeAction({commit}, payload){
        axios.post(`${APIUrl}/wise-saying`,payload)
            .then((response) =>{
                if(response.status == 200){
                    commit("addLikeOrDislike", payload);
                }
            })
    },
    updateUser({commit}, payload){
        axios.post(`${APIUrl}/updateUser`,payload)
            .then(response =>{
                if(response.status == 200){
                    commit("updateUser",payload)
                }
            })
    },
    saveWorkout({commit},payload){
        axios.post(`${APIUrl}/saveWorkout`,payload)
        .then(response =>{
            if(response.status == 200){
                commit('addWorkoutPrograms',payload);
            }else{
                console.log('burda')
            }
        })
    },
    saveEvent({commit},payload){
        axios.post(`${APIUrl}/saveEvent`,payload)
        .then(response =>{
            if(response.status == 200){
                commit('addEvent',payload.eventDetails);
            }
        })
    }
}