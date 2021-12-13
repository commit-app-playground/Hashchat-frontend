<template>
  <div class="container">
      <div class="col-lg-8 offset-lg-3">
        <h1>Welcome {{ name }} </h1>
        <h5>
          Please select a chat channel on the left to take part in.
        </h5>
        
        <div class="newHashtag">
          <h5>
            Alternatively, add a new hashtag below to join or enter multiple hashtags (comma seperated!) to view many conversations.
          </h5>
          <div  class="newHashtagDiv">
            <input type="text" class="form-control col-9"  placeholder="Enter hashtag here" v-model="newHashtag">
            <button v-on:click="addHashtag" type="submit" value="Join" class="btn btn-sm btn-info ml-1" >+</button>
          </div>  
        </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Home',
    props: {
      ["name"]: String
    },
    data () {
        return {
          newHashtag: "",
            
      }
    },
    methods: {
      addHashtag() {
        const payload = this.$data.newHashtag
        axios.post(`http://hashchat-api.onboarding.dev/app/v1/user/${this.name}`, {hashtagId: payload})
        .then(() => (this.$emit('onUpdateHashags', payload)))
        .catch(err => console.log(err))
        this.$data.newHashtag = ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.newHashtag {
  padding-top: 20px;
}
.newHashtagDiv {
  display: flex;
}
</style>
