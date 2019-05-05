var itemVue = new Vue({
    el: '#withdrawal',
    data: {
        selfInfor:{},
        accountName:'',
        accountText:'',
        bankname:'',
        accountPrice:0,
        isChose:1,
        balance:0
    },
    created:function () {
        var _this = this,id = getQueryString('id');
        this.getInfor();
        if (id) this.getInforById(id)
    },
    methods: {
        bindMoney:function () {
            this.accountPrice = this.balance
        },
        returnText:function(){
            this.accountName = '';
            this.accountText = '';
            this.bankname = '';
            this.isChose = 1;
        },
        addAccount:function () {
            var _this = this;
            var data = {
                withdrawtype: 3, //1===支付，2===收款，3===提现
                userName: _this.accountName,
                number: _this.accountText,
                payWXORYIN: _this.isChose, //1代表微信2代表银行卡
            };
            if (_this.accountPrice <= _this.balance) {
                data.price= _this.accountPrice
            } else {
                myToast('金额不足');return
            }
            if (data.payWXORYIN == 2) {
                data.bankname = _this.bankname
            }
            $.ajax({
                url: contextPath + "bill/withdrawBill",
                dataType: "json",
                data:data,
                success: function (res) {
                    if (res.code == 0) {
                        _this.returnText();
                        _this.getInfor();
                        myToast('提现成功');
                    } else {
                        myToast(res.msg)
                    }
                },
                error: function (res) {
                    myToast('连接错误')
                }
            });
        },
        getInfor:function () {
            var _this = this;
            $.ajax({
                url: contextPath + "doctor/doctorDetails",
                dataType: "json",
                success: function (res) {
                    if (res.code == 0) {
                        _this.selfInfor = res.content;
                        _this.balance = res.content.balance;
                    } else {
                        myToast(res.msg)
                    }
                },
                error: function (res) {
                    myToast('连接错误')
                }
            });
        },
        getInforById:function (id) {
            var _this = this;
            $.ajax({
                url: contextPath + "bill/selById",
                dataType: "json",
                data:{id:id},
                success: function (res) {
                    if (res.code == 0) {
                        _this.accountName = res.content.userName;
                        _this.accountText = res.content.number;
                        _this.isChose = res.content.withdrawType;
                        _this.bankname = res.content.withdrawType==2?res.content.bankName:'';
                    } else {
                        myToast(res.msg)
                    }
                },
                error: function (res) {
                    myToast('连接错误')
                }
            });
        }
    }
})
