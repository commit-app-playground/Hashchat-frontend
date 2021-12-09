<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title"  v-on:click="goHome">Hashchat</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full"  v-if="username !== ''">
        <md-toolbar class="md-transparent" md-elevation="0">
          <img alt="Vue logo" src="./assets/hashtag.png" class="test" v-on:click="goHome">
          <button v-on:click="addUser" type="submit" value="Join" class="btn btn-sm btn-info ml-1" >+</button>
        </md-toolbar>

        <md-list v-for="channel in channels" :key="channel">
           <md-list-item v-on:click="goToChat(channel)">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">{{channel}}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view v-on:childToParent="onChildClick"/>
      </md-app-content>
    </md-app>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'App',
  data () {
    return {
      channels: null,
      username:'',
    }
  },
  methods: {
    addUser() {
      console.log("YURT")
      // axios.post("https://hashchat-api.onboarding.dev/app/v1/user/danman", {withCredentials: true})
      // .catch(err => console.log(err))
      axios.post("https://hashchat-api.onboarding.dev/app/v1/user/danman", {hashtagId: 'test2'})
      .catch(err => console.log(err))
    },  
    onChildClick (value) {
      this.username = value
    },
    goToChat(hashtagId) {
      this.$router.push({ path: `/user/${this.username}/chat/${hashtagId}` })
    },
    goHome() {
      this.$router.push({ path: `/user/${this.username}` })
    }
         
  },
  mounted () {
    axios.get("app/v1/user/danman").then(response => (this.channels = response.data))
  }
}

</script>


<style scoped>
  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .md-list-item {
    border-top: 0.5px solid lightgrey;
  }
  .test {
    height: 50px;
    width: 50px;
    margin: auto;
  }
</style>