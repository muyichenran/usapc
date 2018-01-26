<template>
    <div class="goods">
        <div class="m-sortbar">
            <div v-if="isSearchObj && !supId && isSearchObj.values" class="sortbar-item clearfix">
                <span class="name" v-if="isSearchObj.property">{{isSearchObj.property.title}}：</span>      
                <div class="item-list">
                    <a v-bind:class="{ active: searchId=='' }" @click="styleFind()" href="javascript:;">All</a>
                    <a v-for="(item,index) in isSearchObj.values"  @click="styleFind(item.propertyValueId)" v-bind:class="{ active: searchId==item.propertyValueId }"  href="javascript:;">{{item.valueTitle}}</a>
                </div>  
            </div>
            <!-- <div class="sortbar-item clearfix">
                <span class="name">品牌：</span>      
                <div class="item-list">
                    <a class="active" href="javascript:;">全部</a>
                    <a v-for="(item,index) in supplierList" href="javascript:;">{{item.name}}</a>
                </div>  
            </div> -->
            <div class="sortbar-item clearfix">
                <span class="name">Rank：</span>      
                <div class="item-list">
                    <a v-bind:class="{ active: orderType=='' }" href="javascript:;" @click="orderFind('','')">Default</a>
                    <a v-bind:class="{ active: orderType=='price' }" href="javascript:;"  @click="orderFind('price','',priceType)">Price
                        <span class="icon">
                            <i v-bind:class="{ active: priceType==1 }" class="i-a iconfont">&#xe622;</i>
                            <i v-bind:class="{ active: priceType==2 }" class="i-b iconfont">&#xe62c;</i>
                        </span>
                    </a>
                    <a v-bind:class="{ active: orderType=='create_time' }"  href="javascript:;" @click="orderFind('create_time','ASC')">Added date<i class="iconfont v-middle" v-bind:class="{ active: orderType=='create_time' }">&#xe767;</i></a>
                </div>  
            </div>
        </div>
        <div class="goods-list">
            <ul class="ul-goods-list clearfix">
                <li v-for="(item,index) in goodList" class="item">
                    <div @click="goGoodDetail(item.itemId)" class="item-product">
                        <div class="hd-top">
                            <img :src="item.picUrl" />
                        </div>
                        <div class="bd-bot">
                            <p class="name">{{item.title}}</p>
                            <p class="price">${{item.price}}</p>
                            <div class="desc">
                                <hr>
                                <p>{{item.sellPoint}}</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="goodList.length<=0" class="no-content">
            No Data
        </div>
        <div v-if="total>=10" class="text-align-center">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="curPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes,prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            catId:this.$route.query.catId,
            supId:this.$route.query.supId,
            goodList:[],
            supplierList:[],
            searchValueList:[],
            total:0,
            curPage:1,
            pageSize:10,


            isSearchObj:{},
            searchId:'',
            orderType :'',
            order:'',
            priceType:''
        }
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize=val
            this.bodyReady()
        },
        handleCurrentChange(val) {
            this.curPage=val
            this.bodyReady()
        },
        bodyReady:function(){
            if(this.supId){
                var url='http://ws.luxtonusa.com/pc/item/searchBySupplierId/'+this.curPage+'?stage='+this.pageSize+'&supplierId='+this.supId+'&orderType='+this.orderType+'&order='+this.order;
            }else if(this.catId){
                var url='http://ws.luxtonusa.com/pc/item/searchByCatId/'+this.curPage+'?stage='+this.pageSize+'&catId='+this.catId+'&orderType='+this.orderType+'&order='+this.order;
            }
            
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==432){
                    this.$message.error("Your login has been expired, please re-login！");
                    this.$cookie.delete('userLogin');this.$store.state.userLogin=''
                    this.$router.replace("/Login")
                }else  if(response.data.status==200){
                    this.goodList=response.data.data.rows;
                    this.total=response.data.data.total;
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });  
        },
        // supplierReady:function(){ 
        //     var url='http://ws.luxtonusa.com/pc/supplier/index/list';
	    //     var vm=this;
	    //     this.$http.post(url).then(response => {   
	    //         if(response.data.status==200){
        //             this.supplierList=response.data.data;
		// 		}else{
		// 			this.$message.error(response.data.msg);
		// 		}
	    //     }, response => {
	    //     });
        // },

        searchValueReady:function(){ 
            var url='http://ws.luxtonusa.com/property/getSearchValue/'+this.catId;
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==432){
                    this.$message.error("Your login has been expired, please re-login！");
                    this.$store.state.login=false;
                    localStorage.setItem("login", false);
                    this.$router.replace("/Login")
                }else  if(response.data.status==200){
                    this.searchValueList=response.data.data;
                    for(var i in this.searchValueList){
                        if(this.searchValueList[i].property.isSearch){
                            this.isSearchObj=this.searchValueList[i];
                            
                        }
                    }
                    console.log(this.isSearchObj)
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
        },
            
        orderFind(e,f,g){
            this.orderType=e;
            if(e=='create_time'){
                if(this.firstTime){
                    this.priceType='';
                    this.order='ASC';
                    this.firstTime=false;
                }else{
                    this.priceType='';
                    this.orderType='';
                    this.order='';
                    this.firstTime=true;
                }
            }else if(e=='price'){
                if(this.priceType==''){
                    this.order='DESC';
                    this.priceType=1;
                }else if(this.priceType==1){
                    this.order='ASC';
                    this.priceType=2;
                }else if(this.priceType==2){
                    this.orderType='';
                    this.order='';
                    this.priceType=''
                }
            }
            if(this.searchId){
                this.searchBySearchIdFun();
            }else{
                this.bodyReady();
            }
            
        },

        searchBySearchIdFun:function(){
            var url='http://ws.luxtonusa.com/pc/item/searchBySearchId/'+this.curPage+'?propertyValueId='+this.searchId+'&stage='+this.pageSize+'&catId='+this.catId+'&orderType='+this.orderType+'&order='+this.order;
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==200){
                    this.goodList=response.data.data.rows;
                    this.total=response.data.data.total;
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });  
        },
        styleFind:function(e){
            this.searchId=e;
            if(this.searchId){
                this.searchBySearchIdFun();
            }else{
                this.bodyReady();
            }
        },
        goGoodDetail:function(e){
            this.$router.push({path:'/GoodsDetail',query:{Id:e}})
        },



    },
    created(){
        if(this.catId){
            this.searchValueReady();
        }
        
    	this.bodyReady();
        
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/mixin.scss";
    .text-align-center{
        text-align: center;
    }
    .goods{
        width: 1200px;
        margin: 0 auto;
        padding: 0 40px;
        padding-bottom: 20px;
        background: $white;
        .m-sortbar{
            overflow: hidden;
            .sortbar-item{
                font-size: 20px;
                overflow: hidden;
                border-bottom: 1px dashed #dedede;
                line-height: 1;
                &:first-child{
                    // border: none;
                }
                &>span{
                    display: inline-block;
                    float: left;
                    color: #999;
                    padding: 15px 0;
                    padding-right: 15px;
                    box-sizing: border-box;
                    width: 100px;
                    text-align: right;
                }
                .item-list{
                    float: left;
                    width: 1000px;
                    overflow: hidden;
                    a{
                        display: inline-block;
                        padding: 15px 15px;
                        color: #333;
                        i{
                            color: #999;
                        }
                        &:hover{
                            color: #b4a078;
                            i{
                                color: #999;
                            }
                        }
                    }
                    .v-middle{
                        vertical-align: middle;
                    }
                    .active{
                        color: #b4a078;
                    }
                    .icon{
                        display: inline-block;
                        width: 16px;
                        position: relative;
                        vertical-align: middle;
                        i{
                            position: absolute;
                        }
                        .i-a{
                            top: -2px;
                        }
                        .i-b{
                            bottom: -2px;
                        }
                    }
                    
                }
            }
        }    
    }
    .goods-list{
        margin-top: 30px;
        position: relative;
        background-color: #fff;
        .ul-goods-list{
            margin-right: -20px;
            .item{
                height: 375px;
                margin-right: 20px;
                margin-bottom: 20px;
                float: left;
                .item-product{
                    height: 100%;
                    line-height: 1;
                    text-align: center;
                    font-size: 13px;
                    width: 265px;
                    border: 1px solid #e5e5e5;
                    padding-bottom: 20px;
                    // height: 361px;
                    position: relative;
                    &:hover .hd-top img {
                        -webkit-transform: scale(1.05);
                        -moz-transform: scale(1.05);
                        -ms-transform: scale(1.05);
                        -o-transform: scale(1.05);
                        transform: scale(1.05)
                    }
                    .hd-top{
                        position: relative;
                        margin-bottom: 8px;
                        overflow: hidden;
                        background-color: #f4f4f4;
                        img{
                            width: 265px;
                            height: 265px;
                            -webkit-transition: transform 1s;
                            -moz-transition: transform 1s;
                            -o-transition: transform 1s;
                            transition: -webkit-transform 1s;
                            transition: transform 1s;
                            transition: transform 1s,-webkit-transform 1s;
                            background-color: #f4f4f4;
                            border: 1px solid transparent;
                            color: #f4f4f4;
                            display: block;
                            margin: 0 auto;
                        }
                    }
                    .bd-bot{
                        .name{
                            margin-bottom: 4px;
                            height: 20px;
                            line-height: 20px;
                            padding: 0 10px;
                            @include tooverflow();
                            font-weight: bold;
                            text-align: center;
                        }
                        .price{
                            color: #d4282d;
                            text-align: center;
                        }
                        .desc{
                            hr{
                                display: block;
                                width: 130px;
                                height: 1px;
                                padding: 0;
                                margin: 6px auto 14px;
                                border: 0;
                                border-top: 1px solid #e8e8e8;
                            }
                            p{
                                width: 100%;
                                padding: 0 10px;
                                line-height: 18px;
                                color: #999;
                                @include tooverflow();
                            }
                        }

                    }
                }
            }
        }
    }
</style>
