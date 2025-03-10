$(document).ready(function() {
    let images = [
        "./imgs/hampter.jpg",
        "./imgs/hampter2.jpg",
        "./imgs/hampter2.png",


    ];
    let texts = ["Keep going!", "You're awesome!", "Believe in yourself!"];
    let imgIndex = 0;
    let textIndex = 0;

    function changeImage() {
        $("#image").fadeOut(1000, function() {
            imgIndex = (imgIndex + 1) % images.length;
            $(this).attr("src", images[imgIndex]).fadeIn(1000);
        });
    }

    function changeText() {
        textIndex = (textIndex + 1) % texts.length;
        $("#text").fadeOut(500, function() {
            $(this).text(texts[textIndex]).fadeIn(500);
        });
    }

    

    setInterval(changeImage, 3000);
    setInterval(changeText, 4000);    
    $("button").click(function(){
        setInterval(moveDiamond, 800);
        setInterval(moveCircle, 400); 
        

        setTimeout(function(){$("#star1, #star2").fadeIn(500, function() {
          
            $("#star1").animate({
                left: "80%"  
            }, 1000);

          
            $("#star2").animate({
                left: "20%"  
            }, 1000);
        });
    }, 7000);  // 3000ms = 3 seconds

    });
    //originally tried to make it bounce by adding incremental keyframes, but it seems animate has a default ease function in it resulting in janky animation.
    //a quick search into api.jquery.com/animate taught me that there's already specific bounce easing functions.
    //second parametre is the time it takes to travel a specific distance
    //position needs to be adjusted for mobile users
    function moveCircle() { 
        $("#circle")
            .animate({top: 600}, 200)
            .animate({top: 475}, 400)
            .animate({top: 600}, 200)
            .animate({top: 500}, 400)
            .animate({top: 600}, 200)
            .animate({top: 525}, 400)
            .animate({top: 600}, 200)
            .animate({top: 550}, 400)
            .animate({top: 600}, 200)
            .animate({top: 575}, 400)
            .fadeOut(500, function() {  
                $("#image2").fadeIn(500);
            });
    }
    function moveDiamond() { 
        $("#diamond-left")
            
            .animate({top: 20}, 400)
            .animate({top: 600}, 400);
        $("#diamond-right")
            
            .animate({top: 20}, 400)
            .animate({top: 600}, 400);
    }
    
});

