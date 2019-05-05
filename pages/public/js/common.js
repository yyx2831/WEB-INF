var constURL = "/rsys-doctor/", contextPath = "/rsys-doctor/";

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


$(function () {
    $.extend({
        showMsg: function (isSuccess, callback, title, content) {
            if (typeof (title) == "undefined" || title == null) {
                title = "";
            }
            if (typeof (content) == "undefined" || content == null) {
                content = "";
            }

            if (!$(".msg-box").length) {
                $("body").append('<div class="mask">'+
                    '<div class="msg-box">'+
                    '<div class="success">'+
                    '<img src="public/img/caozuo_1.png" />'+
                    '<h2>' + title + '</h2>'+
                    '<p>' + content + '</p>'+
                    '<button>我知道了</button>'+
                    '</div>'+
                    '<div class="fail">'+
                    '<img src="public/img/caozuo_2.png" />'+
                    '<h2>' + title + '</h2>'+
                    '<p>' + content + '</p>'+
                    '<button>我知道了</button>'+
                    '</div>'+
                    '</div>'+
                    '</div>)');
            } else {
                $(".msg-box h2").html(title);
                $(".msg-box p").html(content);
            }
            if (isSuccess) {
                $(".mask").show().find(".success").show();
                $(".mask").show().find(".fail").hide();
                $(".success button").off().on("click", function () {
                    $(".mask").hide();
                    if (callback) {
                        callback()
                    }
                })
            } else {
                $(".mask").show().find(".fail").show();
                $(".mask").show().find(".success").hide();
                $(".fail button").off().on("click", function () {
                    $(".mask").hide();
                    if (callback) {
                        callback()
                    }
                })
            }
        },
        showLoading: function () {
            if (!$("#loading").length) {
                $("body").append('<div id="loading">'+
								'<img src="public/img/jiazai.gif"/>'+
							'</div>');
            }
            $("#loading").show();
        },
        hideLoading: function () {
            $("#loading").fadeOut();
        }
    });
})

// $.ajaxSetup({
//     beforeSend: function (xhr) {
//         $.showLoading();
//     }
// });
// $(document).ajaxStop(function () {
//     $.hideLoading();
// });

//提示
var timer;
function myToast(msg, callback) {
    if (!$("#tip-toast").html()) {
        $("body").append('<div id="tip-toast"><div class="toast-body"></div></div>');
    }
    var tip = $("#tip-toast");
    tip.find(".toast-body").html(msg);
    tip.show();
    var self = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
        tip.fadeOut();
        if (callback) {
            callback();
        }
    }, 2000);
}
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function JumpPage(path) {
    let a = document.createElement('a');
    a.id = 'demo';
    a.href = path;
    document.body.appendChild(a);
    document.getElementById('demo').click();
}

function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); //返回参数值
    return null;
}

jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1;
        }
        let expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        let path = options.path ? '; path=' + (options.path) : '';
        let domain = options.domain ? '; domain=' + (options.domain) : '';
        let secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
