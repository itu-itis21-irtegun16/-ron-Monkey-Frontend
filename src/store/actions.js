import axios from 'axios'
const APIUrl = 'http://3.139.54.157:8080'
// const APIUrlLocalHost = 'http://localhost:3000'
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
    }
}