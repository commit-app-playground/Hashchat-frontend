<template>
  <div class=welcome>
    <h3>Welcome to Hashchat!</h3>
    <form @submit.prevent="addUser">
        <div class="form-group row">
              <h4 class="header">Enter your username to continue</h4>

            <input type="text" class="form-control col-9 username" v-model="username"
                placeholder="Enter username here">
            <button v-on:click="addUser" type="submit" value="Join" class="btn btn-sm btn-info ml-1" >Join</button>
        </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
     data () {
        return {
          username:  "", 
      }
    },
    methods: {
      addUser() {
        this.$emit('childToParent', this.username)
        this.$router.push({ path: `/user/${this.username}` })
      },
    },
  }
</script>
<style scoped>
.welcome {
  margin: 70px;
  text-align: center;
}
.username {
  max-width: 700px;
}
.header {
  text-align: center;
  margin: auto;
}
</style>

