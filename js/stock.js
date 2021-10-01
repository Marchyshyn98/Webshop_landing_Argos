$(document).ready(function() {
    let stock_num_1 = 5;
    let stock_num_2 = 7
    let stock_num_3 = 4

    let stock_item_1 = $(".stock_1");
    let stock_item_2 = $(".stock_2");
    let stock_item_3 = $(".stock_3");

    stock_item_1.html(stock_num_1);
    stock_item_2.html(stock_num_2);
    stock_item_3.html(stock_num_3);

    let stock_box = $(".offerwall__stock");

    removeBounce(stock_item_1, 4700);
    setTimeout(() => {
        stock_num_1 -= 2;
        changeStockStatus(stock_item_1, stock_num_1);
    }, 5000);

    removeBounce(stock_item_2, 6700);
    setTimeout(() => {
        stock_num_2 -= 2;
        changeStockStatus(stock_item_2, stock_num_2);
    }, 7000);

    removeBounce(stock_item_3, 8700);
    setTimeout(() => {
        stock_num_3 -= 1;
        changeStockStatus(stock_item_3, stock_num_3);
    }, 9000);

    removeBounce(stock_item_1, 11700);
    setTimeout(() => {
        stock_num_1 -= 2;
        changeStockFinal(stock_item_1);
    }, 12000);

    removeBounce(stock_item_2, 13700);
    setTimeout(() => {
        stock_num_2 -= 2;
        changeStockStatus(stock_item_2, stock_num_2);
    }, 14000);

    removeBounce(stock_item_3, 15700);
    setTimeout(() => {
        stock_num_3 -= 1;
        changeStockStatus(stock_item_3, stock_num_3);
    }, 16000);

    removeBounce(stock_item_2, 18700);
    setTimeout(() => {
        stock_num_2 -= 2;
        changeStockFinal(stock_item_2);
    }, 19000);

    removeBounce(stock_item_3, 20700);
    setTimeout(() => {
        stock_num_3 -= 1;
        changeStockFinal(stock_item_3);
    }, 21000);

    function addBounce(param) {
        param.fadeIn().addClass("animate__bounce");
    }

    function removeBounce(stock_item, time) {
        setTimeout(() => {
            stock_item.parents(".offerwall__stock").fadeOut().removeClass("animate__bounce");
        }, time);
    }

    function changeStockStatus(stock_item, stock_num) {
        var stock_parent = stock_item.parents(".offerwall__stock");
        if (stock_parent.hasClass("green_text")) {
            stock_parent.removeClass("green_text")
                .addClass("orange_text");
        }

        stock_item.html(stock_num);
        addBounce(stock_parent);
    }

    function changeStockFinal(item) {
        var item_parent = item.parents(".offerwall__stock");

        item_parent
            .removeClass("orange_text")
            .addClass("red_text");

        item.html(1).prepend('<i class="fa fa-exclamation-circle"></i>&nbsp;');

        addBounce(item_parent);

        setTimeout(() => {
            item_parent.removeClass("animate__bounce");
        }, 1000);
    }
});