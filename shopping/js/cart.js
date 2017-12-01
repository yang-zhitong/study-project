var vm = new Vue({
	el: "#app",
	data: {
		productList:[],
		checkAll : false,
		flagShow: false,
		readyToDel: null
	},
	filters: {
		formatMoney: function(value) {
			return "$" + value.toFixed(2);
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.cartView();
		});
	},
	computed:{
		totalMoney: function(){
			var _this = this;
			var total = 0;
			_this.productList.forEach(function(value,index){
				if( value.checked){
					total = total + (value.productQuantity * value.productPrice);
				}
			});
			return total;
		}
	},
	methods:{
		cartView: function (argument) {
			var _this = this;
			this.$http.get("data/cartData.json",{"id":123}).then(function(response){
				_this.productList = response.data.result.list;
			});
		},
		change: function(item,way){
			if (way>0){
				item.productQuantity++;
			}else{
				if(item.productQuantity == 1){
					item.productQuantity = 1;
					return false;
				}
				item.productQuantity--;

			}
			// this.calcTotal();
		},
		selectProduct: function(item) {
			var _this = this;
			var c=0;
			if (typeof item.checked == 'undefined'){
				_this.$set(item,'checked',true);
			}else {
				item.checked = !item.checked;
			}
			_this.productList.forEach(function(value,index){
				if (value.checked) {
					c++;
					if (c==3)   _this.checkAll = true;
				}
				if (c==0) _this.checkAll = false;
			});
			// _this.calcTotal();
		},
		changeAll: function(flag){
			var _this = this;
			_this.checkAll = flag;
			_this.productList.forEach(function(item,index){
				if (typeof item.checked == 'undefined'){
					_this.$set(item,'checked',_this.checkAll);
				}else {
					item.checked = _this.checkAll;
				}			
			})
			// _this.calcTotal();
		},

		toDel: function(index){
			this.flagShow = true;
			this.readyToDel = index;
		},
		delProduct: function(){
			this.productList.splice(this.readyToDel,1);
			this.flagShow = false;
		}
	}
})