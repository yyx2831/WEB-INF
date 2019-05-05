var itemVue = new Vue({
    el: '#erweima',
    data: {
        selfInfor:{}
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
                        _this.selfInfor = res.content;
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