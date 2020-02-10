<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smooth" :key="smoothie.id">
    <div class="card-content">
      <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
      <h5 class="indigo-text">{{smoothie.title}}</h5>
     
      <ul class="ingredients">
        <li v-for="(ing, index) in smoothie.ingredients" :key="index">
          <span class="chip">{{ing}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {dbb,fb} from '../firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      smooth:[]
      //msg: 'Welcome to Your Vue.js App'
      
    }
    
  },
  methods:{
    deleteSmoothie(id){
      //delete data from firestore
      dbb.collection('smooth').doc(id).delete()
      .then(() => {
         this.smooth = this.smooth.filter(smoothie => {
           return smoothie.id != id
        }) 
      })
    }
  },
  created(){
     dbb.collection('smooth').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc)
         //console.log(doc.data(),doc.id)
          let smoothie = doc.data()
          smoothie.id = doc.id
          this.smooth.push(smoothie)
           console.log("data",smoothie);
      })
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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

.index .delete {
  position:absolute;
  top:4px;
  right:4px;
  cursor:pointer;
  color:#aaa;
  font: size 10px;
}


</style>
