<template>
  <div class="hello">
    <ul>
      <li v-for='item in list'>{{item.author}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list:[]
    }
  },
  mounted (){
    // alert(11);
    this.loadList()
  },
  methods:{
    loadList(){

      var vm = this;
      this.$http.get('api/posts').then(function(res){
        console.log(res.data);
        vm.list = res.data;

      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
