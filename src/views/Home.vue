<template>
  <div class="container">
      <div class="col-lg-8 offset-lg-3">
        <h1>Welcome {{ name }} </h1>
        <h5>
          Please select a chat channel to take part in.
          Alternatively, add a new hashtag to join or enter multiple hashtags to view many conversations.
        </h5>
        <div>
          <span class="md-list-item-text">Add a new Hashtag!</span>
          <input type="text" class="form-control col-9"  placeholder="Enter hashtag here">
          <button v-on:click="addUser" type="submit" value="Join" class="btn btn-sm btn-info ml-1" >+</button>
        </div>
      </div>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    props: {
      ["name"]: String
    },
    data () {
        return {
          messages: [
            {text: "Hey man how are you keeping", user:"jd", id: 12345, type: 1 },
            {text: "Pretty good yourself?", user:"yoyo", id: 123456, type: 1 },
                {text: "What do you think of this new chat app?", user:"jd", id: 123451213, type: 0 },
            {text: "Yeah it's pretty cool, still getting used to it though", user:"yoyo", id: 123412312356, type: 1 },
          
          ],
          info: [
            {username:"jd", id: 123415, type: "admin" },
            {username:"yoyo", id: 1232415, type: "free" },
            ],
          connections: 2,
          connection: null,
          newMessage:  "danman",
            
      }
    },
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
</style>
