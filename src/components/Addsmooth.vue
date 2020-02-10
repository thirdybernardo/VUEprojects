<template>
  <div class="addsmooth container">
    smoothie
    <h2 class="center-align"></h2>
    <form @submit.prevent="Addsmoothf">
        <div class="field title">
          <label for="title">Smoothie title</label>
          <input type="text" name="title" v-model="title">
        </div>
        <div v-for="(ing, index) in ingredients" :key="index">
            <label for="ingredient">ing</label>
            <input type="text" name="ingredent" v-model ="ingredients[index]">
        </div>
        <div class="field add-ingredient">
           <label for="title">Add an ingredient</label>
           <input type="text" name="add-v1" @keydown.tab.prevent="adingf" v-model="another"> 
        </div>
        <div class="field add-ingredient">
             <button class="btn blue" @click="onPickFile">upload image</button>
             <input 
             type="file" 
             style="display:none" 
             ref="fileInput" 
             accept="image/*"
             @change="onFilePicked"
             > 
        </div>
        <div class="field center-align">
            <button class="btn pink">add smooth</button>
            <p v-if="feeback" class="red-text">{{feeback}}</p>
        </div>
    </form>
  </div> 
</template>

<script>

import {dbb,fb} from '../firebase/init'
import slugify from 'slugify'
export default {
  name: 'Addsmooth',
  data () {
    return {
      title:null,
      another:null,
      feeback:null,
      ingredients:[],
      slug:null,
      image:null
      
    }
    
  },
  methods:{
    Addsmoothf(){
      if(this.title){
       this.feeback = null
       this.slug = slugify(this.title, {
           replacement: '-',
           remove : /[`%$*_+~.()'"!\=:@]/g,
           lower:true
       })
       dbb.collection('smooth').add({
           title:this.title,
           ingredients:this.ingredients,
           slug:this.slug

       }).then(()=> {
           this.$router.push({name:'Index'})
       }).catch(err => {
           console.log("error", err)
       }) 

       // console.log("slug",this.slug);
        }else{
            this.feeback = 'you muster enter valid date.'
        }

    },
    adingf(){
        if(this.another){
            this.ingredients.push(this.another)
            this.another=null;
            this.feeback=null;
             
            console.log("pushmasok",this.ingredients);

        }else {
            this.feeback = "you must enter a value"
        }
    },
    deletingf(img){
        this.ingredients = this.ingredients.filter(ingredient =>{
            return ingredient !=img
        })

    },
    onPickFile(){
        this.$refs.fileInput.click()
    },
    onFilePicked(event){
       const file = event.target.files[0];
        // Create a root reference
       var storageRef =  fb.storage().ref('products/'+ file.name);
       let uploadTask = storageRef.put(file);
       uploadTask.on('state_changed', (snapshot) => {
  
       }, (error) => {

       }, () => {
            //console.log("file",file);
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                 console.log('file available at',downloadURL);
            });

       });
 

  
    } 
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
.addsmooth{
    margin-top:60px;
    padding:20px;
    max-width: 500px;
}


</style>
