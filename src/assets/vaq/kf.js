/**
 * 客服
 */
  import $ from 'jquery';
define(function (require) {
    $(document).on('click', '.open_cckf_chatwin_cls', function () {

        doyoo.util.openChat('g=10075906');
        return false;
        // window.location.href = 'http://chat2431.talk99.cn/chat/chat/p.do?_server=0&c=20002331&f=10087471&g=10068721&command=forceChat';
    });
    $('body').on('click','#qq', function () {
        // var code = parseInt(Math.random() * (2 - 1 + 1) + 1);
        // switch (code) {
        //     case 1:
        //         window.open('http://sighttp.qq.com/authd?IDKEY=84f2cc2fad76d9f9f6cbd62c75323ee68a7f04ebb076c1f5');
        //         break;
        //     case 2:
        //         window.open('http://sighttp.qq.com/authd?IDKEY=4b5f182fb647f4a4581883024e9dfdffd44fb9fe3b9ad5a6');
        //         break;
        //     default:
        //         window.open('http://sighttp.qq.com/authd?IDKEY=4b5f182fb647f4a4581883024e9dfdffd44fb9fe3b9ad5a6');
        //         break;
        // }
        window.open('http://sighttp.qq.com/authd?IDKEY=57882016919cab6cad8d29ae056e42339ce7a56d10043734');
    });
    $('body').on('mouseover','#kf_wechat,#kf_tel', function () {
      $(this).children('.box.pngfix').css('display', 'block');
    });
    $('body').on('mouseout','#kf_wechat,#kf_tel', function () {
        $(this).children('.box.pngfix').css('display', 'none');
    });
});
