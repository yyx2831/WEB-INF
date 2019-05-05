var itemVue = new Vue({
    el: '#account',
    data: {
        list:[]
    },
    created:function () {
        var _this = this;
        this.getAccount()
    },
    methods: {
        delate:function (index,id) {
            var _this = this;
            $.ajax({
                url: contextPath + "bill/delById",
                dataType: "json",
                data:{id:id},
                success: function (res) {
                    if (res.code == 0) {
                        _this.list.splice(index,1);
                        myToast('删除成功')
                    } else {
                        myToast(res.msg)
                    }
                },
                error: function (res) {
                    myToast('连接错误')
                }
            });
        },
        getAccount:function () {
            var _this = this;
            $.ajax({
                url: contextPath + "bill/selBill",
                dataType: "json",
                success: function (res) {
                    if (res.code == 0) {
                        _this.list = res.content
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