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
    	if(this.$store.state.userLogin==undefined||this.$store.state.userLogin==null||this.$store.state.userLogin==""){
            var userLogin='';
            userLogin=this.$cookie.get('userLogin');
            this.$store.commit('LOG_IN',userLogin);
            
        }else{
            
        }
        if(localStorage.getItem("cartGoods")){
            var orderList=JSON.parse(localStorage.getItem("cartGoods"));
            this.$store.commit('cart_Goods',orderList);
        }
    }
}
</script>

<style lang="scss">
    @import "./assets/index.scss";
    #app{
        width: 100%;
        min-width: 1200px;
    }
    .usa-center{
      padding-top: 120px;  
      margin: 20px auto;
    }
</style>
