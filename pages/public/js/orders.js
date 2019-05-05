const ajaxPatient = () => {
    $.ajax({
        url: constURL + "order/list",
        success: function (result) {
            let date;
            if (result.code === '0') {
                console.log(result.content.list);
                for (let i = 0; i < result.content.list.length; i++) {
                    //     console.log(result.content.list[i]);
                    date = new Date(result.content.list[i].createTime);
                    $('.context0').append(`<div class="content1">
    <div class="div0">
            <div class="divC">
                <div class="ysTitle">
                    <img src="${result.content.list[i].doctor.headimg}" alt="">
                    <div class="ysName">${result.content.list[i].doctor.name}</div>
                    <div class="department">${result.content.list[i].doctor.title} | ${result.content.list[i].doctor.department}</div>
                </div>
            </div>
            <div class="ddContent">
                <div class="ddl">
                    <div class="divll">订单号:${result.content.list[i].billNumber}</div>
                </div>
                <div class="ddr">
                    <div class="divrr">
                        ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}
                        </div>
                </div>
            </div>
            <div class="ddContent">
                <div class="ddl">
                    <div class="divll">订单金额</div>
                </div>
                <div class="ddr">
                    <div class="divrr">
                        ￥${result.content.list[i].total}
                    </div>
                </div>
            </div>
            <div class="ddContent">
                <div class="ddl">
                    <div class="divll">优惠金额</div>
                </div>
                <div class="ddr">
                    <div class="divrr">
                        ￥${result.content.list[i].coupon ? result.content.list[i].coupon.value : 0}
                    </div>
                </div>
            </div>
            <div class="ddContent">
                <div class="ddl">
                    <div class="divll">实付金额</div>
                </div>
                <div class="ddr">
                    <div class="divrrend">
                        ￥${result.content.list[i].coupon ? result.content.list[i].total - result.content.list[i].coupon.value : result.content.list[i].total}
                    </div>
                </div>
            </div>
        </div>
</div>`)
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
};
const ajaxDoctor = () => {
    $.ajax({
        url: constURL + "patient/list",
        success: function (result) {
            console.log(result);
            let date;
            if (result.code === '0') {
                console.log(result.content.list);
                for (let i = 0; i < result.content.list.length; i++) {
                    date = new Date(result.content.list[i].createTime);
                    $('.context0').append(`
<div class="content1">
    <div class="div0">
            <div class="divC">
                <div class="ysTitle">
                    <img src="${result.content.list[i].doctor.headimg}" alt="">
                    <div class="ysName">${result.content.list[i].doctor.name}</div>
                    <div class="department">${result.content.list[i].doctor.title} | ${result.content.list[i].doctor.department}</div>
                </div>
            </div>
            <div class="ddContent">
                <div class="ddl">
                    <div class="divll">订单号:${result.content.list[i].billNumber}</div>
                </div>
                <div class="ddr">
                    <div class="divrr">
                        ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}
                        </div>
                </div>
            </div>
            <div class="ddContent">
                <div class="ddl">
                    <div class="divll">订单金额</div>
                </div>
                <div class="ddr">
                    <div class="divrr">
                        ￥${result.content.list[i].total}
                    </div>
                </div>
            </div>
            <div class="ddContent">
                <div class="ddl">
                    <div class="divll">优惠金额</div>
                </div>
                <div class="ddr">
                    <div class="divrr">
                        ￥${result.content.list[i].coupon ? result.content.list[i].coupon.value : 0}
                    </div>
                </div>
            </div>
            <div class="ddContent">
                <div class="ddl">
                    <div class="divll">实付金额</div>
                </div>
                <div class="ddr">
                    <div class="divrrend">
                        ￥${result.content.list[i].coupon ? result.content.list[i].total - result.content.list[i].coupon.value : result.content.list[i].total}
                    </div>
                </div>
            </div>
        </div>
</div>
`)
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
};

$(function () {
    //获取地址栏上的id
    const user = getUrlParam('user');
    user === 'yiShi' ? ajaxDoctor() : ajaxPatient();
});
