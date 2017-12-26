<template>
    <div id="app">
        <v-Header></v-Header>
        <div class="usa-center">
            <router-view :key="key"/>
        </div>
        
    </div>
</template>

<script>
import Header from '@/components/Common/Header';
export default {
    data(){
        return{

        }
    },
    methods:{
    },
    components: {
      'v-Header':Header
    },
    computed:{
        key() {
          if(this.$route.path=='/Login'||this.$route.path=='/goodsList'){
            return  this.$route + +new Date();
          }  
        },
    },   
    created(){
    	
    }
}
</script>

<style lang="scss">
    @import "./assets/index.scss";
    .usa-center{
      padding-top: 100px;  
      margin: 20px auto;
    }
</style>
