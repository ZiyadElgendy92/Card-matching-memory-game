$(function() {
    //this line sets the game to start when the page is loaded.
    $(document).ready(resetting);
    
    //this variables containes the cards DOMs used in the game.
    var cards=['<li class="card"><i class="fa fa-diamond"></i></li>','<li class="card"><i class="fa fa-paper-plane-o"></i></li>','<li class="card"><i class="fa fa-anchor"></i></li>','<li class="card"><i class="fa fa-bolt"></i></li>','<li class="card"><i class="fa fa-cube"></i></li>','<li class="card"><i class="fa fa-leaf"></i></li>','<li class="card"><i class="fa fa-bicycle"></i></li>','<li class="card"><i class="fa fa-bomb"></i></li>','<li class="card"><i class="fa fa-diamond"></i></li>','<li class="card"><i class="fa fa-paper-plane-o"></i></li>','<li class="card"><i class="fa fa-anchor"></i></li>','<li class="card"><i class="fa fa-bolt"></i></li>','<li class="card"><i class="fa fa-cube"></i></li>','<li class="card"><i class="fa fa-leaf"></i></li>','<li class="card"><i class="fa fa-bicycle"></i></li>','<li class="card"><i class="fa fa-bomb"></i></li>'];
    
    //different variables used by the game functions.
    var stars=3, mov=0, c1, match1, matching= [], doms=[], matched=0, seconds = 0, minutes = 0, hours = 0, t;
    
    //this function shuffles the cards and adds them to the deck.
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    
    //this function is responsible for alerting the user when the game is won.
    function alerting(){
        swal({
            title:"Good job!",
            text: "Wou won in "+mov+" moves!\nWith "+stars+ " stars"+"\nYour time is "+$('time').text(),
            icon: "success",
            buttons:{
                cancel: true,
                confirm: "Play again"
            }
        }).then( val => {
            if(val){
                resetting();
            }
        });
    }
    
    //this function resets the game and all the parameters involved in it.
    function resetting (){
        $( ".deck" ).empty();
        while(matching.length > 0) {
            matching.pop();
        }
        while(doms.length > 0) {
            doms.pop();
        }
        matched=0;
        stars=3;
        $(".stars").empty();
        $(".stars").append($('<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'));
        mov=0;
        $(".moves").text(mov);
        shuffle(cards);
        for (var i = 0; i < cards.length ; i++){
            $(".deck").append(cards[i]); 
        }
        $('time').text("00:00:00");
        timer;
        seconds = 0; minutes = 0; hours = 0;
    }
    
    //this line uses the resetting function to reset the game when restart icon is clicked.
    $(".restart").children("i").click(resetting);
    
    //this event opens the cards to be compared, if matching the colors of the blue cards turns green and they stay opened, if not they are closed again, it's designed defensively so the user can't click more than 2 cards at a time or click cards that are already matched. 
    $(".deck").delegate(".card:not(.open):not(.match):not(.closed)" ,"click",  function (){
        c1=$(this).children("i").attr("class");
        $(this).animate({opacity: 0.25 }, 100 );
        $(this).toggleClass("open show").animate({opacity: 1.00 }, 100 );
        match1=$(this);
        matching.push(c1);
        doms.push(match1);
        if (matching.length == 2){
            mov+=2;
            $(".moves").text(mov);
            $(".card:not(.open)").toggleClass("closed");
            //this condition checks if the selected cards are matching.
            if (matching[0] == matching[1]){
                doms[0].attr('class', "card match");
                doms[1].attr('class', "card match");
                console.log("compare");
                matching= [];
                doms=[];
                matched +=1;
                if (matched ==8){
                    setTimeout(alerting, 300);
                    
                }
                $(".card:not(.match)").toggleClass("closed");
                //this condition reduced the star rating after a certain number of moves.
                if (mov == 36 || mov == 48) {//edt
                    stars-=1;
                    $(".stars li").first().remove();
                    $(".stars").append($('<li><i class=" fa fa-star-o "></i></li>'))
                }
            }
            else{
                setTimeout(function(){
                doms[0].animate({opacity: 0.25 }, 100 );
                doms[1].animate({ opacity: 0.25 }, 100 );
                doms[0].toggleClass("open show").animate({opacity: 1.00 }, 100 );
                doms[1].toggleClass("open show").animate({opacity: 1.00 }, 100 );
                $(".card:not(.match)").attr('class', "card");
                matching= [];
                doms=[];
                }, 700);
                //this condition reduced the star rating after a certain number of moves.
                if (mov == 36 || mov == 48) {
                    stars-=1;
                    $(".stars li").first().remove();
                    $(".stars").append($('<li><i class=" fa fa-star-o "></i></li>'))
                }
            }
        }
    });
    
    //this function counts and views the time taken to win the game.
    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        $('time').text((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds)) ;
        
        timer();
    }
    //this function is used with the add function to show time passing
    function timer() {
        t = setTimeout(add, 1000);
    }
    
    //this line launches the timer when the page is loaded.
    $(document).ready(timer);
});
