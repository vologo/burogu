import hljs from 'highlight.js';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

$(document).on("turbolinks:load", () => {
    const codeBlocks = $('.markdown-body pre>code');
    for (let i = 0; i < codeBlocks.length; i++) {
        hljs.highlightBlock(codeBlocks[i]);
    }

    // * .format_date为后端created_at格式时间，自动将其格式化
    const formatDateContainer = $('.format_date');
    for (let i = 0; i < formatDateContainer.length; i++) {
        const current = $(formatDateContainer[i]);
        current.text(dayjs(current.text()).fromNow());
    }

    // * 生成目录并添加锚点
    $("article h1," +
        "article h2," +
        "article h3," +
        "article h4," +
        "article h5," +
        "article h6").each(function (i, item) {

        const tag = $(item).get(0).localName;
        $(item).attr("id", "toc" + i);
        $("#toc").append('<a class="toc_' + tag + '" href="#toc' + i + '">' + $(this).text() + '</a></br>');
        $(".toc_h1").css("margin-left", 0);
        $(".toc_h2").css("margin-left", 20);
        $(".toc_h3").css("margin-left", 40);
        $(".toc_h4").css("margin-left", 60);
        $(".toc_h5").css("margin-left", 80);
        $(".toc_h6").css("margin-left", 100);
    });

    $("#toc > a").each((index, item) => {
        $(item).click(e => {
            e.preventDefault();
            $('html, body').animate({scrollTop: $($(item).attr('href')).offset().top - 80}, 450);
        })
    })

});