
fillGrid("benefits", 4, "./assets/img/about", "png", []);



const caroHolder = new CaroHolder("mycaro", "mycaroInd",
 ["./assets/img/carousel/1.jpg", "./assets/img/carousel/2.jpg", "./assets/img/carousel/3.jpg", "./assets/img/carousel/4.jpg"],
 ["./assets/img/carousel/m1.jpg", "./assets/img/carousel/m2.jpg", "./assets/img/carousel/m3.jpg", "./assets/img/carousel/m4.jpg"],
 ["#"]);



fillGrid("presents", 8, "./assets/img/homePage", "jpg", []);



fillGrid("presents2", 4, "./assets/img/homePage/two", "jpg", []);


// JQuery
    $( ".pDecripText" ).hide();
        $( ".pDecrip" ).click(function() {
          $( ".pDecripText" ).toggle( "slow" );
    });

