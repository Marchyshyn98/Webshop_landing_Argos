$(document).ready(function() {
    function scrollTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > 250) {
            $('.scroll_top').fadeIn();
        } else {
            $('.scroll_top').fadeOut();
        }
    });

    $('.scroll_top').on("click", function() {
        scrollTop();
    });

    $.getJSON("./js/products.json", function(data) {
        let products = [];
        products = data;

        // console.log(products);

        let id;
        let productObj;
        let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EFC71D" width="17px" height="15px"><path d="M12 18.472l-5.382 2.83a.75.75 0 0 1-1.088-.79l1.028-5.994-4.354-4.244a.75.75 0 0 1 .415-1.28l6.017-.873 2.691-5.453a.75.75 0 0 1 1.346 0l2.69 5.453 6.018.874a.75.75 0 0 1 .415 1.28l-4.354 4.243 1.028 5.993a.75.75 0 0 1-1.088.79L12 18.473z"></path></svg>';
        let currency = '&dollar;';
        let colours;
        let currColour;
        let quantity;
        let about;

        $(".offerwall__item .main_img, .offerwall__item .btn-add").click(function() {
            if (!$(this).parents(".offerwall__item").hasClass("stock_out")) {
                id = getProductId($(this));
                getProductObj(id);
            } else {
                modalEffects();
            }
        });

        function getProductId(el) {
            var mainEl = el.parents(".offerwall__item");
            id = mainEl.attr("id");
            return id;
        }

        function getProductObj(productId) {
            products.forEach(element => {
                if (productId == element.name) {
                    productObj = element; // parse object from array
                }
            });

            // console.log(productObj);

            $("#offerwall, footer").fadeOut(100);
            $(".preloader").delay(100).fadeIn(300);

            setTimeout(() => {
                $(".preloader").fadeOut(100);
                $("#cart, footer").delay(100).fadeIn(300);
                scrollTop();
            }, 800);

            $(".cart__product").append(productObj.title);

            for (var i = 0; i < productObj.rating; i++) {
                $(".cart__stars").append(svg);
            }

            $(".cart__reviews").append(productObj.reviews);
            $(".cart__img img").attr("src", productObj.imagePath);
            $(".cart__price").append(currency + productObj.price);

            var nectar_points = Math.round(productObj.price);
            $(".nectar_points").append(nectar_points + " Nectar");

            $(".cart__category").append(productObj.category);

            // colours
            colours = productObj.colours;

            if (colours.length == 0) {
                $(".cart__colours").hide();
            } else {
                colours.forEach(colour => {
                    if (productObj.imagePath.includes(colour)) {
                        currColour = colour;
                    }
                    $("ul.cart__colour-menu").append("<li class='cart__colour-item'></li>");
                });
                $(".cart__colour-item").append("<span class='cart__colour-border'></span>");
                $(".cart__colour-item:first-child").addClass(colours[0]);
                $(".cart__colour-item:nth-child(2)").addClass(colours[1]);
                $(".cart__colour-item:nth-child(3)").addClass(colours[2]);
                $(".cart__colour-item:nth-child(4)").addClass(colours[3]);
                $(".cart__colour-item:nth-child(5)").addClass(colours[4]);

                $(".cart__colour-menu").find(`.${currColour}`).find(".cart__colour-border").addClass("selected");
            }

            $("li.cart__colour-item").on("click", function() {
                switchBorder($(this));

                var currImgSrc = $(".cart__img img").attr("src");
                var prevColour;
                var currColour;

                colours.forEach(colour => {
                    if (currImgSrc.includes(colour)) {
                        prevColour = colour;
                        // console.log("Prev colour:", prevColour);
                    }
                    if ($(this).hasClass(colour)) {
                        currColour = colour;
                        // console.log("Current colour:", currColour)
                    }
                });

                var newImgSrc = currImgSrc.replace(prevColour, currColour);
                $(".cart__img img").attr("src", newImgSrc).hide()
                $(".cart__img img").fadeIn(500);
            });

            function switchBorder(el) {
                $(".cart__colour-border").removeClass("selected");
                el.find(".cart__colour-border").addClass("selected");
            }
            // quantity
            quantity = productObj.quantity;
            for (var i = 1; i <= quantity; i++) {
                $("select#product__quantity").append(`<option value="${i}">${i}</option>`);
            }

            // about
            about = productObj.about;
            $(".cart__about-text").append(about);

            // click number
            clickNumber = productObj.click;
            $(".btn_buy").attr("href", `https://www.google.com/${clickNumber}`);
        }

        // modal
        let modal = $(".modal-main");
        let modalDialog = $(".modal-main .modal-dialog");

        modal.on("click", function() {
            modalHide();
        });

        $(".btn-ok").on("click", function() {
            modalHide();
        });

        function modalEffects() {
            modalDialog.removeClass("slideFadeOut");
            modalDialog.addClass("slideIn");

            modal.fadeIn();
            modal.css("background-color", "rgba(44, 44, 45, 0.701961)")
        }

        function modalHide() {
            modalDialog.removeClass("slideIn");
            modalDialog.addClass("slideFadeOut");
            $(".modal").fadeOut();
        }
    });
});