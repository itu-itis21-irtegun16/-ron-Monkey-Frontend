<template>
    <v-app style="height: 0px; margin-bottom:64px;">
      <v-app-bar light fixed shaped > 
        <v-app-bar-nav-icon @click="drawer = true">
           <v-icon class="dumbbell-icon">mdi-dumbbell</v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title class="navbar-title">Iron Monkey 1</v-toolbar-title>


        <v-menu bottom left >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="dark" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list v-if="!isLoggedIn">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.route" exact active-class="deep-purple--text text--accent-4">
              <v-list-item-icon style="margin-right: 20px;"> <v-icon> {{item.icon}} </v-icon> </v-list-item-icon>
              <v-list-item-title style="margin-right: 12px;">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>

           <v-list v-else>
            <v-list-item v-for="(item, i) in loginItems" :key="i" :to="item.route" exact active-class="deep-purple--text text--accent-4">
              <v-list-item-icon style="margin-right: 20px;"> <v-icon> {{item.icon}} </v-icon> </v-list-item-icon>
              <v-list-item-title style="margin-right: 12px;">{{ userInfo['firstname'] }}</v-list-item-title>
            </v-list-item>
            <!-- Start logout function -->
            <v-list-item @click="signOut" :to="logout.route" exact active-class="deep-purple--text text--accent-4">
              <v-list-item-icon style="margin-right: 20px;"> <v-icon> {{logout.icon}} </v-icon> </v-list-item-icon>
              <v-list-item-title style="margin-right: 12px;">{{ logout.title }}</v-list-item-title>
            </v-list-item>
            <!-- End logout function -->
          </v-list>

          
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer fixed v-model="drawer" :width="drawerWidth"  temporary light mobile-breakpoint="0">
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">

            <v-list-item  v-for="route in routeList" :key="route.title" :to="route.route">
              <v-list-item-icon> <v-icon>{{route.icon}}</v-icon> </v-list-item-icon>
              <v-list-item-title> {{route.title}} </v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
  export default {

    data: () => ({
      drawer: false,
      group: null,
      items: [
        { title: 'Register', icon : 'mdi-account-plus', route: '/register'},
        { title: 'Sign-in', icon : 'mdi-account', route: '/sign-in'},
        { title: 'Contact', icon : 'mdi-email-outline', route: '/contact'},
        // { title: 'logout', icon: 'mdi-logout', route: '/', func : 'logOut'}, 
      ],
      loginItems : [
        { title: 'account', icon : 'mdi-account', route: '/account'},
        // { title: 'logout', icon: 'mdi-logout', route: '/'}, 
      ],
      logout : {title: 'logout', icon: 'mdi-logout', route: '/'},
      drawerWidth : null,
      routeList : [
        { title : 'Home', route : '/', icon : 'mdi-home', },
        { title : 'Food', route : '/food-list', icon : 'mdi-silverware-variant', },
        { title : 'Calendar', route : '/calendar', icon : 'mdi-calendar-month', },
        { title : 'Wise-Saying', route : '/wise-saying', icon : 'mdi-pencil', },
       
      ],
      check : true
    }),
    created() {
      if(this.$isMobile())
      {
        this.drawerWidth = screen.width / 2;
      }else {
        this.drawerWidth = screen.width / 5;
      }
    },
    computed : {
      ...mapGetters([
        'isLoggedIn', 
        'userInfo'
        ]),
    },
    methods : {
      ...mapMutations(['clearTokenAndUser']),
      signOut(){
        this.clearTokenAndUser();
        let keysToRemove = ["user", "token"];
        keysToRemove.forEach(key =>
          localStorage.removeItem(key))
        }
    },
  }
</script>

<style scoped>
  .navbar-title{
    font-size: 2em;
    font-weight: 400;
    margin: auto;
  }
  .dumbbell-icon {
    height: 36px ;
    font-size: 36px;
    width: 36px;
  }
</style>