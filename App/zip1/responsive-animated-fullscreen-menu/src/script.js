var spread_tl = new TimelineMax()
  .to(".circle",0, {left:"50%", top: "50%"})
  .to("#circle1", 0.3, {left:"40", top: "40", ease:Expo.easeInOut})
  .to("#circle2", 0.3, {x: "50%", left: "240", right: "0%", top: "42", ease:Expo.easeInOut})
  .to("#circle3", 0.3, {x: "50%", left: "auto", right: "0%", top: "auto", y: "50%", bottom: "0", ease:Expo.easeInOut})
  .to("#circle4", 0.3, {left: "0%", top: "auto", y: "50%", bottom: "0", ease:Expo.easeInOut})
  // .to("#container", 0.3, {rotation: 360, ease:Power4.easeInOut}, "-=0.1")
  // .to(".circle p", 0.3, {rotation: -360, ease:Power4.easeInOut}, "-=0.3")
  .reverse();

var grow_tl = new TimelineMax()
  .to("#circle5", 0.1, {scale: 2, ease:Power1.easeInOut})
 
  .to("#circle5", 0.2, {scale: 1., ease:Power4.easeInOut})
  .reverse();

function changeImage() {

        if (document.getElementById("imgClickAndChange").src == "http://www.userinterfaceicons.com/80x80/minimize.png") 
        {
            document.getElementById("imgClickAndChange").src = "http://www.userinterfaceicons.com/80x80/maximize.png";
        }
        else 
        {
            document.getElementById("imgClickAndChange").src = "http://www.userinterfaceicons.com/80x80/minimize.png";
        }
    }

$(".menu, #circle5").click(function() {
  $(".menu").toggleClass("menu-animated");
  $("#bg").toggleClass("bg-animated");
  // $("#container").toggleClass("container-animated");
  $(".circle").toggleClass("circle-animated");
  $(".circle p").toggle();
  spread_tl.reversed(!spread_tl.reversed());
  grow_tl.reversed(!grow_tl.reversed());
});

// $(".menu").hover(function() {
//   $("#circle2").css({"left":"initial","right":"0","top":"0"})
// },
//     function() {
//       $("#circle2").css({"left":"50%","right":"initial","top":"50%"});
//   });