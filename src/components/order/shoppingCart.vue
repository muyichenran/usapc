<template>
  <div class="order-center">
    	<div class="order-list">
            <div v-if="orderList&&orderList.length" class="order-item">
				
				<table class="order-table">
					<thead>
						<tr>
							<td width="450">商品信息</td>
							<td width="150">单价</td>
							<td width="150">数量</td>
							<td width="150">金额</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in orderList" v-bind:class="{ errorgoods: item.error }" >
							<td>
								<div class="goods-info">
									<img class="img" :src="item.picUrl">
									<p class="title">{{item.itemTitle}}</p>
								</div>
								<div class="goods-size" v-html="item.itemType">
								</div>
							</td>
							<td>{{item.price}}</td>
							<td>
								<el-input-number :min="1" v-model="item.num" @change="checkNumber(index)" style="width:150px"></el-input-number>
								<p v-if="item.error" class="error-text">
									库存：{{item.onlynum}}
								</p>
							</td>
							
							<td>${{item.priceTotal}}</td>
							<td>
								<el-button @click="editCart(index)" type="danger">删除</el-button>
							</td>
						</tr>
					</tbody>
				</table>
				<p class="all-money">
					总金额：${{payment}}
				</p>
				<p class="go-buy">
					<el-button @click="goBuy()" type="primary">&nbsp;&nbsp;&nbsp;立即购买&nbsp;&nbsp;&nbsp;</el-button>
				</p>
				
			</div>  
			<div v-if="orderList==''||orderList==undefined" class="no-list">
				暂无数据
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
            var url='http://luxma.helpyoulove.com/pc/item/get/sku/'+this.orderList[e].itemId+'?properties='+this.orderList[e].skuProperties;;
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==200){
					this.catNum=response.data.data.quantity;
					if(this.orderList[e].num>this.catNum){
						this.$message.error('库存不足');
						this.orderList[e].error=true;
						// this.orderList[e].num=this.catNum;
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
			this.$confirm('商品删除后需要重新添加, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.orderList.splice(e, 1);
				this.$store.state.orderList=this.orderList;
				localStorage.setItem("cartGoods", JSON.stringify(this.orderList));
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		goBuy(){
			var length=this.orderList.length-1;
			for(var i in this.orderList){
				var url='http://luxma.helpyoulove.com/pc/item/get/sku/'+this.orderList[i].itemId+'?properties='+this.orderList[i].skuProperties;;
				var vm=this;
				this.$http.post(url).then(response => {   
					if(response.data.status==200){
						this.catNum=response.data.data.quantity;
						if(this.orderList[i].num>this.catNum){
				
							this.notGoBuy=true;  
							this.$message.error('库存不足');
							this.orderList[i].error=true;
							this.orderList[i].onlynum=this.catNum;
							// this.orderList[i].num=this.catNum;
							this.orderList[i].priceTotal=this.orderList[i].price*this.orderList[i].num;
						}else{
							// this.orderList[i].priceTotal=this.orderList[i].price*this.orderList[i].num;
						}
	
						if(i==length){
							if(this.notGoBuy){
								this.notGoBuy=false
							}else{
								var obj={};
								obj.payment=this.payment;
								obj.items=this.orderList;
								var url='http://luxma.helpyoulove.com/pc/order/insert';
								var vm=this;
								this.$http.post(url,obj).then(response => {   
									if(response.data.status==200){
										
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
			}
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
	width: 300px;
	float: left;
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
