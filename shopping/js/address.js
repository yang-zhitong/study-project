var vm = new Vue({
	el :'.container',
	data: {
		addressList: [],
		limitNum: 3,
		more: "more",
		currentIndex: 0,
		transport: 1,
		flagShow: false,
		readyToDel: null,
		addAdress: false
	},
	mounted: function () {
		this.$nextTick(function(){
			this.getAdressList();
		});
	},
	computed: {
		sliceAdressList: function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods: {
		getAdressList: function(){
			var _this = this;
			_this.$http.get("data/address.json").then(function(response){
				var res = response.data;
				if(res.status == "0"){
					_this.addressList = res.result;
				}
			});
		},
		loadMore: function(){
			if(this.more == "more"){
				this.more = "less";
				console.log(this.more);
				this.limitNum = this.addressList.length;
			}else {
				this.more = "more";
				this.limitNum = 3;
			}
		},
		toDefault: function(index){
			this.addressList.forEach(function(item,i){
				if( i == index){
					item.isDefault = true;
				}else {
					item.isDefault = false;
				}
			});
		},
		toDel: function(index){
			this.flagShow = true;
			this.readyToDel = index;
		},
		delProduct: function(){
			this.addressList.splice(this.readyToDel,1);
			this.flagShow = false;
		}

	}
});