var itemVue = new Vue({
    el: '#balance',
    data: {
        balance:0
    },
    created:function () {
        var _this = this;
        this.getInfor();
    },
    methods: {
        getInfor:function () {
            var _this = this;
            $.ajax({
                url: contextPath + "doctor/doctorDetails",
                dataType: "json",
                success: function (res) {
                    if (res.code == 0) {
                        _this.balance = res.content.balance;
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