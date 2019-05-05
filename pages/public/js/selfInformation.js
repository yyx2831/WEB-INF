var itemVue = new Vue({
    el: '#information',
    data: {
        selfInfor:{},
        changeTitle:'信息修改',
        textIsChange:false,
        changeContent:'',
        clickIndex:1,
        isLoading:false
    },
    created:function () {
        this.getInfor();
    },
    methods: {
        selfMsgChange:function (title,index) {
            this.textIsChange = !this.textIsChange;
            this.changeTitle = title;
            this.changeContent = '';
            this.clickIndex = index;
        },
        selfSexChange:function () {
            var isSex = this.selfInfor.sex,_this = this;
            isSex==1?isSex=2:isSex=1;
            var data = {
                sex:_this.selfInfor.sex
            };
            data.sex = isSex;
            $.ajax({
                url: contextPath + "doctor/updateDoctor",
                data: data,
                dataType: "json",
                success: function (res) {
                    if (res.code == 0) {
                        myToast('性别修改成功');
                        _this.getInfor()
                    } else {
                        myToast(res.msg);
                    }
                },
                error: function (res) {
                    myToast('连接错误')
                }
            });
        },
        selfChange:function () {
            var _this = this;
            var data = {};
            if (this.clickIndex == 1) {
                if(this.changeContent == ""){
                    myToast("名字不能为空");
                    return
                }
                data.name = this.changeContent;
            } else if (this.clickIndex == 2) {
                if(_this.changeContent > 120 || _this.changeContent < 0){
                    myToast('请输入正确的年龄');
                    return
                }
                data.age = this.changeContent;
            } else if (this.clickIndex == 3) {
                if(!(/^1[34578]\d{9}$/.test(this.changeContent))){ 
                    myToast("手机号码有误，请重填");  
                    return 
                } 
                data.phone = this.changeContent;
            } else if (this.clickIndex == 4) {
                if(this.changeContent == ""){
                    myToast("医院不能为空");
                    return
                }
                data.hospital = this.changeContent;
            } else if (this.clickIndex == 5) {
                if(this.changeContent == ""){
                    myToast("职称不能为空");
                    return
                }
                data.title = this.changeContent;
            } else if (this.clickIndex == 6) {
                if(this.changeContent == ""){
                    myToast("部门不能为空");
                    return
                }
                data.department = this.changeContent;
            }
            this.isLoading = true;
            $.ajax({
                url: contextPath + "doctor/updateDoctor",
                data: data,
                dataType: "json",
                success: function (res) {
                    _this.isLoading = false;
                    if (res.code == 0) {
                        myToast('修改成功');
                        _this.getInfor();
                        _this.textIsChange = !_this.textIsChange;
                    } else {
                        myToast(res.msg)
                    }
                },
                error: function (res) {
                    _this.isLoading = false;
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
                        _this.selfInfor = res.content
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
