<template>
    <div class="goods-detail clearfix">
        <div class="m-slide">
            <div class="view">
                <img :src="showPicUrl">
            </div>
            <div v-if="goodDetail.item" class="list">
                <ul>
                    <li v-for="(item,index) in goodDetail.item.picList" v-bind:class="{ active: showPicUrl==item }">
                        <a href="javascript:;" @click="showPicUrl=item">
                            <img :src="item">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="goodDetail.item" class="m-info">
            <div class="name">{{goodDetail.item.title}}</div>
            <div class="desc">{{goodDetail.item.sellPoint}}</div>
            <div class="price">
                <div class="p-box clearfix">
                    <span class="label-1 label">
                        Price
                    </span>
                    <span class="pri">
                        <span class="do">$</span>{{goodDetail.item.price}}
                    </span>
                </div>
                <div v-if="goodDetail.supplier" class="field remark">
                    <span class="label">Vendor</span>
                    <span class="remarkCt">{{goodDetail.supplier.name}}</span>
                </div>
            </div>
            <div class="goods-skin" v-bind:class="{ goodserror: errorShow }">
                <div v-if="errorShow" class="good-error clearfix">
                    <span>请选择您要的商品信息</span>
                    <a class="close" style="float:right" @click="errorShow=false" href="javascript:;">x</a>
                </div>
                <table class="choose-speci">
                    <tr>
                        <td valign="top"  width="60px" class="title" style="padding-top:25px;">
                            {{itemProperty[0].property.title}}
                        </td>
                        <td>
                            <div class="color-list">
                                <a class="item" v-for="(item,index) in itemProperty[0].values" 
                                    @click="colorClick(item.propertyValueId,item.remark)"
                                    v-bind:style="{ background: item.valueTitle}"
                                    v-bind:class="{active:item.propertyValueId==colorId}"
                                    href="javascript:;" >

                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" class="title" style="padding-top:15px;">
                            {{itemProperty[1].property.title}}
                        </td>
                        <td>
                            <div class="size-list">
                                <a @click="sizeClick(item.propertyValueId,item.valueTitle)" 
                                v-for="(item,index) in itemProperty[1].values" 
                                v-bind:class="{active:item.propertyValueId==sizeId}"
                                class="item" 
                                href="javascript:;">
                                    {{item.valueTitle}}
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" class="title" style="padding-top:15px;">
                            Num
                        </td>
                        <td>
                            <el-input-number :min="1" v-model="num1" style="width:150px"></el-input-number><span v-if="catNum" style="color:#95989a;padding-left:15px;">库存{{catNum}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" class="title" style="padding-top:15px;">
                            
                        </td>
                        <td>
                            <el-button @click="addGoods()" type="primary">加入购物车</el-button>
                        </td>
                    </tr>
                </table>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            goodId:this.$route.query.Id,
            goodDetail:{},
            showPicUrl:'',
            itemProperty:[],
            colorId:'',
            sizeId:'',
            num1:'',
            errorShow:false,
            catNum:'',
            colorRemark:"",
            sizeRemark:"",
            copy:false
        }
    },
    computed:{
        cartGoods () {
            return this.$store.state.orderList;
        },
    },
    watch:{
		catId(val){
			if(val){
				this.GoodsInfo.catId=val;
				this.getPropertyAll();
			}
		},
		colorId(val){
			if(this.sizeId){
                this.errorShow=false;
                this.searchGoods();

            }
		},
        sizeId(){
            if(this.colorId){
                this.errorShow=false;
                this.searchGoods();
            }
        }
    },

    methods:{
        bodyReady:function(){
            var url='http://ws.luxtonusa.com/pc/item/get/'+this.goodId;
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==432){
                    this.$message.error("登录过期，请重新登录！");
                    this.$cookie.delete('userLogin');this.$store.state.userLogin=''
                    this.$router.replace("/Login")
                }else  if(response.data.status==200){
                    this.goodDetail=response.data.data;
                    this.itemProperty=response.data.data.itemProperty;
                    this.showPicUrl=this.goodDetail.item.picList[0];
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
             
        },
        colorClick:function(e,f){
            this.colorId=e;
            this.colorRemark=f
        },
        sizeClick:function(e,f){
            this.sizeId=e;
            this.sizeRemark=f
        },
        searchGoods:function(){
            var searchVal=this.colorId+','+this.sizeId;
            var url='http://ws.luxtonusa.com/pc/item/get/sku/'+this.goodId+'?properties='+searchVal;;
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==432){
                    this.$message.error("登录过期，请重新登录！");
                    this.$cookie.delete('userLogin');this.$store.state.userLogin=''
                    this.$router.replace("/Login")
                }else  if(response.data.status==200){
                    this.catNum=response.data.data.quantity;
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
        },
        addGoods(){
            if(this.colorId==''||this.sizeId==''){
                this.errorShow=true;
                return false;
            }
            if(this.num1>this.catNum){
                this.$message.error('库存不足，请重新修改库存数量');
                return false;
            }
            var item={};
            item.itemId=this.goodId;
            item.num=this.num1;
            item.price=this.goodDetail.item.price
            item.priceTotal=this.num1*this.goodDetail.item.price;
            item.itemTitle=this.goodDetail.item.title;
            item.skuProperties=this.colorId+','+this.sizeId;   
            item.itemType='Color：'+this.colorRemark+'<br/>Size：'+this.sizeRemark
            if(this.goodDetail.supplier){
                item.supplierName=this.goodDetail.supplier.name;
            }
            
            item.picUrl=this.goodDetail.item.picUrl;
            if (this.cartGoods) {
                var cartGoods=this.cartGoods;
                for(var i in cartGoods){
                    if(cartGoods[i].itemId==item.itemId&&cartGoods[i].skuProperties==item.skuProperties){
                        this.copy=true;
                        cartGoods[i].num=cartGoods[i].num + item.num;
                        cartGoods[i].priceTotal=cartGoods[i].num*cartGoods[i].price;
                        break;
                    }else{

                    }
                }
                if(this.copy){
                    
                }else{
                    cartGoods.push(item)
                }
                
                localStorage.setItem("cartGoods", JSON.stringify(cartGoods));
                this.$store.state.orderList=cartGoods;
            } else {
                var cartGoods=[];
                cartGoods.push(item)
                console.log(cartGoods)
                localStorage.setItem("cartGoods", JSON.stringify(cartGoods));
                this.$store.state.orderList=cartGoods;
            }
            this.$confirm('加入购物车公告，去购物车结算?', '提示', {
                confirmButtonText: '前往购物车',
                cancelButtonText: '留在当前页',
                type: 'success'
            }).then(() => {
                this.$router.push({path:'/shoppingCart'})
            }).catch(() => {

            });
        }    
    },
    components: {
    },
    created(){
    	this.bodyReady();
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/mixin.scss";
    .goods-detail{
        width: 1200px;
        margin: 0 auto;
        padding: 20px 40px;
        background: $white;
        .m-slide{
            float: left;
            width: 525px;
            overflow: hidden;
            .view{
                float: left;
                width: 430px;
                height: 430px;
                border: 1px solid #e8e8e8;
                margin-right: 15px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .list{
                float: right;
                overflow: hidden;
                ul{
                    margin-top: 1px;
                    position: relative;
                    li{
                        zoom: 1;
                        width: 80px;
                        height: 80px;
                        overflow: hidden;
                        margin-bottom: 7px;
                        display: block;
                        vertical-align: top;
                        &:last-child{
                            margin-bottom: 0;
                        }
                        a{
                            display: block;
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border: 1px solid #e8e8e8;
                            img{
                                display: block;
                                width: 100%;
                                height: 100%;
                                background-color: #f4f4f4;
                            }
                        }  
                    }
                    .active{
                        a{
                            margin: 0;
                            border: 2px solid #b4a078;
                        }
                    }
                }
            }
        }
        .m-info{
            float: right;
            width: 566px;
            padding-left: 62px;
            word-break: break-all;
            word-wrap: break-word;
            .name{
                font-size: 20px;
                font-weight: 700;
                line-height: 20px;
                margin-bottom: 7px;
            }
            .desc{
                width: 300px;
                font-size: 12px;
                padding-top: 10px;
                line-height: 18px;
                color: #999;
            }
            .price{
                margin-top: 20px;
                background-color: #f5f3ef;
                border-top: 1px dotted #dedede;
                border-bottom: 1px dotted #dedede;
                padding: 0 0 13px;
                line-height: 24px;
                font-size: 13px;
                position: relative;
                .label{
                    width: 55px;
                    font-size: 14px;
                    float: left;
                    color: #666;
                    margin-left: 10px;
                }
                .p-box{
                    .label-1{
                        line-height: 30px;
                        margin-top: 16px;
                    }
                    .pri{
                        float: left;
                        font-size: 18px;
                        font-weight: 700;
                        margin-right: 1px;
                        margin-top: 13px;
                        margin-left: 0;
                        height: 30px;
                        color: #d7282d;
                        font-size: 28px;
                        line-height: 30px;
                        .do{
                            margin-left: 0;
                            line-height: 30px;
                            font-size: 18px;
                        }
                    }
                }
                .field{
                    margin-bottom: 3px;
                }
                .remark{
                    margin-top: 2px;
                    height: 24px;
                    .remarkCt {
                        display: inline-block;
                        width: 436px;
                        height: 24px;
                        line-height: 24px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        color: #666;
                    }
                }
            }
            .choose-speci{
                width: 100%;
                
                td{
                    padding: 10px;
                }
            }
        }
        .color-list{
            .item{
                width: 50px;
                height: 50px;
                display: block;
                float: left;
                margin-right: 10px;
                margin-bottom: 15px;
                box-sizing: border-box;
                border: 1px solid #ddd;
            }
            .active{
                border: 2px solid #b4a078;
            }
        }
        .size-list{
            .item{
                margin-right: 10px;
                margin-bottom: 15px;
                padding: 0 25px;
                height: 30px;
                line-height: 28px;
                border: 1px dashed #e4e4e4;
                font-size: 14px;
                display: inline-block;
                float: left;
                box-sizing: border-box;
                border: 1px solid #ddd;
            }
            .active{
                border: 2px solid #b4a078;
            }
        }
    }   
    .goods-skin{
        margin-top: 20px;
        position: relative;
        .good-error{
            background: #f5f5f5;
            padding: 5px 10px;
        }
        .close{
            font-weight: bold;
            color: #fe4343;
        }
    } 
    .goodserror{
        border: 2px solid #fe4343;
    }
</style>
