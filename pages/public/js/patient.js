var itemVue = new Vue({
    el: '#patient',
    data: {
        list:[],
        index:1
    },
    created:function () {
        var _this = this;
        this.getPatientList();
    },
    methods: {
        getPatientList:function () {
            var _this = this;
            $.ajax({
                url: contextPath + "patient/list",
                dataType: "json",
                data:{index:_this.index},
                success: function (res) {
                    if (res.code == 0) {
                        _this.list = _this.list.concat(res.content.list);
                        _this.index = res.content.index + 1;
                    } else {
                        myToast(res.msg)
                    }
                },
                error: function (res) {
                    myToast('连接错误')
                }
            });
        },
        menu: function () {
            var innerHeight = window.innerHeight; //window的高度，即手机的高度
            var clientHeight = document.body.clientHeight;
            if ($(window).scrollTop() + innerHeight == $(document).height()) {
                this.getPatientList();
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.menu)
    }
})