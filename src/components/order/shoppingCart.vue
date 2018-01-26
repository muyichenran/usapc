<template>
  <div class="order-center">
    	<div class="order-list">
            <div v-if="orderList&&orderList.length" class="order-item">
				
				<table class="order-table">
					<thead>
						<tr>
							<td width="450">product category</td>
							<td width="150">Price</td>
							<td width="150">Num</td>
							<td width="150">Money</td>
							<td> Operating</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in orderList" v-bind:class="{ errorgoods: item.error }" >
							<td>
								<div class="goods-info" @click="goGoods(item.itemId)">
									<!-- <img class="img" :src="item.picUrl"> -->
									<p class="title">{{item.itemTitle}}</p>
								</div>
								<div class="goods-size" style="font-size:18px;color:#20a0ff" v-html="item.itemType">
								</div>
							</td>
							<td>{{item.price | toDecimal2}}</td>
							<td>
								<el-input-number :min="1" v-model="item.num" @change="checkNumber(index)" style="width:150px"></el-input-number>
								<p v-if="item.error" class="error-text">
									inventory ：{{item.onlynum}}
								</p>
							</td>
							
							<td>${{item.priceTotal  | toDecimal2}}</td>
							<td>
								<el-button @click="editCart(index)" type="danger">Delect</el-button>
							</td>
						</tr>
					</tbody>
				</table>
				<p class="all-money">
					Total Amount：${{payment |toDecimal2}}
				</p>
				<p class="go-buy">
					<el-button @click="goBuy()" type="primary">&nbsp;&nbsp;&nbsp;Buy now&nbsp;&nbsp;&nbsp;</el-button>
				</p>
				
			</div>  
			<div v-if="orderList==''||orderList==undefined" class="no-list">
				No Data
			</div>
  		</div>
  </div>
</template>

<script>
export default {
    data(){
		return{
			orderList:[],
			notGoBuy:false,
			payment:0,
		}
	},
	watch: {
		orderList:{
			handler: function (val, oldVal) {
				this.watchMoney();
			 },
      		deep: true
		}
	},	
    components: {
    },
    methods:{
		checkNumber:function(e){
            var url='http://ws.luxtonusa.com/pc/item/get/sku/'+this.orderList[e].itemId+'?properties='+this.orderList[e].skuProperties;;
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==432){
                    this.$message.error("Your login has been expired, please re-login！");
                    this.$cookie.delete('userLogin');this.$store.state.userLogin=''
                    this.$router.replace("/Login")
                }else if(response.data.status==200){
					this.catNum=response.data.data.quantity;
					if(this.orderList[e].num>this.catNum){
						this.$message.error('out of inventory');
						this.orderList[e].error=true;
						this.orderList[e].num=this.catNum;
						this.orderList[e].onlynum=this.catNum;
						this.orderList[e].priceTotal=this.orderList[e].price*this.orderList[e].num;
					}else{
						this.orderList[e].priceTotal=this.orderList[e].price*this.orderList[e].num;
					}
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
		},
		searchGoods:function(){
            
		},
		editCart:function(e){
			this.$confirm('Product need to be added after deletion, continue?', 'Prompt', {
				confirmButtonText: 'Confirm',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.orderList.splice(e, 1);
				this.$store.state.orderList=this.orderList;
				localStorage.setItem("cartGoods", JSON.stringify(this.orderList));
				this.$message({
					type: 'success',
					message: 'Delect success!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Deleted'
				});          
			});
		},
		goBuy(){
			var length=this.orderList.length;
			var _index=0;
			
			for(var i in this.orderList ){
				var url='http://ws.luxtonusa.com/pc/item/get/sku/'+this.orderList[i].itemId+'?properties='+this.orderList[i].skuProperties;;
				var vm=this;
				this.$http.post(url).then(response => {   
					if(response.data.status==432){
						this.$message.error("Your login has been expired, please re-login！");
						this.$cookie.delete('userLogin');this.$store.state.userLogin=''
						this.$router.replace("/Login")
					}else if(response.data.status==200){
						this.catNum=response.data.data.quantity;
						
						if(this.orderList[i].num>this.catNum){
				
							this.notGoBuy=true;  
							this.$message.error('out of inventory');
							this.orderList[i].error=true;
							this.orderList[i].onlynum=this.catNum;
							this.orderList[i].num=this.catNum;
							this.orderList[i].priceTotal=this.orderList[i].price*this.orderList[i].num;
						}else{
							// this.orderList[i].priceTotal=this.orderList[i].price*this.orderList[i].num;
						}
						_index=_index+1;
						if(_index==length){
							if(this.notGoBuy){
								this.notGoBuy=false
							}else{
								var obj={};
								obj.payment=this.payment;
								obj.items=this.orderList;
								var url='http://ws.luxtonusa.com/pc/order/insert';
								var vm=this;
								this.$http.post(url,obj).then(response => {   
									if(response.data.status==432){
										this.$message.error("Your login has been expired, please re-login！");
										this.$cookie.delete('userLogin');this.$store.state.userLogin=''
										this.$router.replace("/Login")
									}else  if(response.data.status==200){
										this.$message.success("Your purchase is complete");
										this.orderList==[]
										this.$store.state.orderList=[];
										localStorage.removeItem("cartGoods");
										this.$router.push({path:'/orderHistory'})
									}else{
										this.$message.error(response.data.msg);
									}
								}, response => {
								});
							}
						}
					}else{
						this.$message.error(response.data.msg);
					}
				}, response => {
				});
			}			
		},
		watchMoney:function(){
			this.payment=0;
			for(var i in this.orderList){
				this.payment=this.payment+this.orderList[i].priceTotal;
				console.log(this.orderList[i].priceTotal)
				console.log(this.payment)
			}
		},
		goGoods(e){
			this.$router.push({path:'/GoodsDetail',query: {Id: e}})
		}
    },
    created(){
		this.orderList=this.$store.state.orderList;
		this.watchMoney();
		console.log(this.orderList)
    }
}
</script>

<style lang="scss" scoped>
.all-money{
	text-align: center;
	color:#fe4343;
	font-size: 18px;
	margin-top: 40px;
}
.errorgoods{
	background: #fef0f0 !important;
}
.error-text{
	color:#fe4343;
	margin-top: 5px;
	padding-left:3px;
}
.order-center{
	width: 1200px;
	margin: 0 auto;
	padding: 20px 40px;
	// padding-bottom: 20px;
	background: #ffffff;
}
.order-list{

}

.page-list{
	margin: 40px auto;
	text-align: center;
}
.search-top1{
	width: 250px;
	float: left;
	.el-button{
		color: #97a8be;
	}
}
.search-top2{
	width: 300px;
	float: left;
	margin-left: 30px;
}
.order-item{
	// border: 1px solid #e5e5e5;
	margin-bottom: 20px;
	
	.order-table{
		width: 100%;
		td{
			padding:10px 10px;
		}
		thead{
			font-size: 18px;
			background: #eef1f6
		}
		tbody{
			tr{
				background: #FAFAFA;
				&:nth-child(2n+1){
					background: #ffffff;
				}
			}
		}
		td{
			border: 1px solid #e5e5e5
		}
	}
}
.goods-info{
	width: 270px;
	float: left;
	cursor: pointer;
	    min-height: 80px;
	margin-right: 15px;
	.img{
		width: 100px;
		height: 100px;
		float: left;
		margin-right: 8px;
	}
	.title{
		font-size:14px
	}
}
.goods-size{
	p{
		line-height: 24px
	}
}
.no-list{
	padding: 50px;
    font-size: 16px;
    text-align: center;
    color: #95989a;
}
.go-buy{
	padding: 50px;
	text-align: center
}
</style>
