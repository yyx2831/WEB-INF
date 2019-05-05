var itemVue = new Vue({
    el: '#upload',
    data: {
        upload1:'',
        upload2:''
    },
    created:function () {
        var _this = this;
        this.getImg();
    },
    methods: {
        getImg:function () {
            var _this = this;
            $.ajax({
                url: contextPath + "doctor/selLicense",
                dataType: "json",
                success: function (res) {
                    if (res.code == 0) {
                        var upImg = JSON.parse(res.content);
                        _this.upload1 = upImg.license;
                        _this.upload2 = upImg.license1;
                    }
                },
                error: function (res) {
                    myToast('连接错误')
                }
            });
        },
        uploadBtn:function () {
            var data = {
                license:this.upload1,
                license1:this.upload2
            };
            $.ajax({
                url: contextPath + "doctor/dataUpload",
                dataType: "json",
                data:data,
                success: function (res) {
                    if (res.code == 0) {
                        myToast('上传成功')
                    } else {
                        myToast(res.msg)
                    }
                },
                error: function (res) {
                    myToast('连接错误')
                }
            });
        }
    },
    mounted:function () {
        var ids = new Array("cardzmbtn","cardbmbtn");
        $.each(ids,function(i,n){
            var self = this.toString();
            var uploader = new plupload.Uploader({
                runtimes : 'html5,flash,silverlight,html4',
                browse_button : self,
                // container: document.getElementById('container'),
                url : 'http://oss.aliyuncs.com',
                filters: {
                    mime_types : [ //只允许上传图片和zip,rar文件
                        { title : "Image files", extensions : "jpg,gif,png,bmp" },
                        { title : "Zip files", extensions : "zip,rar" }
                    ],
                    max_file_size : '10mb', //最大只能上传10mb的文件
                    prevent_duplicates : true //不允许选取重复文件
                },

                init: {
                    PostInit: function() {
                    },
                    FilesAdded: function(up, files) {
                        set_upload_param(uploader, '', false);
                    },
                    BeforeUpload: function(up, file) {
                        set_upload_param(up, file.name, true);
                    },
                    FileUploaded: function(up, file, info) {
                        var url = host + '/' + get_uploaded_object_name(file.name) + '-ly';
                        if(info.status == 200 ){
                            if(self.search('cardzmbtn')===0){  // 正
                                itemVue.upload1 = url;
                            }else{//反面
                                itemVue.upload2 = url;
                            }
                        }
                    },
                    Error: function(up, err) {
                        console.log(err)
                    }
                }
            });
            uploader.init();
        })
    }
})
