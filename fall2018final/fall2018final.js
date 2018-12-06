'use strict';
let verseChoose = document.querySelector("form"); // the select menu
 let display =  document.querySelector("article"); // the space for the verse to display
let verse = "article0.txt" ; // the chosen verse; initialize with first menu option

function updateVerse(verse) {
let verseRequest = new XMLHttpRequest();  // defines a specific request
verseRequest.open('GET', verse);  // specifies what to do when request is sent
verseRequest.responseType = 'text'; // specifies that the files should be treated as text
verseRequest.onload = function () {  // specifies what to do when file is loaded
   display.innerHTML = verseRequest.response;  // place the response text in the selected element
};

verseRequest.send(); // actually sends the request
};

verseChoose.onchange = function () {
  verse = verseChoose.value;
  updateVerse(verse);
};

verseChoose.value = verse; // shows initial menu option
updateVerse(verse);  // shows intial content


$(".menu").ready(function(){
    $(".items").hide();
    $(".menu").click(function(){
        $(this).next(".items").slideToggle("slow");
    })
});


$("clickme").ready(function(){
    var countNum = 0;
    $("clickme").click(function(){
        countNum ++;
        $('#count').text('countNum');
    })
});
