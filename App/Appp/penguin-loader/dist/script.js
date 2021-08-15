$(document).ready(function(){
  let div=[],j,i,k;
  for(i=1;i<15;i++){
  div[i] = $('<div id="god' + i + '"><div id="parent' + i + '"><div id="body' + i + '"></div><div id="face' + i + '"></div><div id="hand' + i + '"></div><div id="beek' + i + '"></div><div id="eye' + i + '"> </div><div id="feet' + i + '"></div></div></div>'); 
    j = Math.floor((Math.random() * 2) + 1);
     $("#move").append(div[i]);
    
     $("#god"+i).css({   "position":"absolute",
                         "margin-left":(i*200) + "px",
                         "animation":"parent1 16s linear infinite",
                         "padding":"50px"
                     });
     $("#body"+i).css({  "width":"80px",
                         "height":"110px",
                         "border-radius":"100% 100% 10% 10%",
                         "animation":"body"+j+" 1s ease infinite",
                         "background":"rgba(0,0,0,0.8)"
                     });

     $("#hand"+i).css({  "position":"absolute",
                         "margin-top":"-45px",
                         "margin-left":"30px",
                         "width":"12px",
                         "height":"20px",
                         "transform":"rotate(-20deg)",
                         "border-radius":"10% 10% 100% 100%",
                         "animation":"hand"+j+" 1s ease infinite",
                         "background":"rgba(0,0,0,1)"
                     });
     $("#face"+i).css({  "position":"absolute",
                         "margin-top":"-100px",
                         "margin-left":"0px",
                         "width":"60px",
                         "height":"50px",
                         "border-radius":"90% 90% 100% 25%",
                         "background":"rgba(250,250,250,1)",
                         "animation":"face"+j+" 1s ease infinite"
                     });
     $("#beek"+i).css({  "position":"absolute",
                         "margin-top":"-80px",
                         "margin-left":"0px",
                         "width":"7px",
                         "height":"10px",
                         "border-radius":"100% 20% 10% 10%",
                         "background":"orange",
                         "animation":"beek"+j+" 1s ease infinite"
                     });
     $("#eye"+i).css({  "position":"absolute",
                        "margin-top":"-90px",
                        "margin-left":"20px",
                        "width":"5px",
                        "height":"10px",
                        "border-radius":"100% 100% 100% 100%",
                        "background":"black",
                        "animation":"eye"+j+" 1s ease infinite"
                     });
     $("#feet"+i).css({  "position":"absolute",
                         "margin-top":"-15px",
                         "margin-left":"5px",
                         "width":"40px",
                         "height":"30px",
                         "border-radius":"100% 100% 50% 50%",
                         "background":"orange",
                         "transform":"rotateX(89deg)",
                         "animation":"feet"+j+" 1s ease infinite"
                     });
     $("#tail"+i).css({  "position":"absolute",
                         "margin-top":"-10px",
                         "margin-left":"65px",
                         "width":"20px",
                         "height":"10px",
                         "border-radius":"50% 100% 0% 100%",
                         "background": "black",
                         "transform":"rotateX(89deg)",
                         "animation":"feet"+j+" 1s linear infinite"
                     });
    
  }//forij
  for(i=15,k=1;i<35;i++,k++){
  div[i] = $('<div id="god' + i + '"><div id="parent' + i + '"><div id="body' + i + '"></div><div id="face' + i + '"></div><div id="hand' + i + '"></div><div id="beek' + i + '"></div><div id="eye' + i + '"> </div><div id="feet' + i + '"></div></div></div>'); 
         
     j = Math.floor((Math.random() * 2) + 1);
     $("#move").append(div[i]);
    
     $("#god"+i).css({   "position":"absolute",
                         "margin-top":"70px",
                         "margin-left":(k*100) + "px",
                         "animation":"parent2 4s linear infinite",
                         "padding":"50px"
                     });
     $("#body"+i).css({  "width":"40px",
                         "height":"45px",
                         "border-radius":"50% 70% 20% 20%",
                         "animation":"body"+j+" 0.5s ease infinite",
                         "background":"linear-gradient(to top, #d1d1d1 , #1e1e1e)"
                     });
     $("#hand"+i).css({  "position":"absolute",
                         "margin-top":"-27px",
                         "margin-left":"30px",
                         "width":"8px",
                         "height":"10px",
                         "transform":"rotate(-20deg)",
                         "border-radius":"10% 10% 300% 300%",
                         "animation":"khand"+j+" 0.5s ease infinite",
                         "background":"#444444"
                     });
     $("#face"+i).css({  "position":"absolute",
                         "margin-top":"-40px",
                         "margin-left":"0px",
                         "width":"30px",
                         "height":"17px",
                         "border-radius":"90% 90% 100% 25%",
                         "background":"rgba(250,250,250,1)",
                         "animation":"kface"+j+" 0.5s ease infinite"
                     });
     $("#beek"+i).css({  "position":"absolute",
                         "margin-top":"-33px",
                         "margin-left":"-2px",
                         "width":"4px",
                         "height":"5px",
                         "border-radius":"100% 20% 10% 10%",
                         "background":"orange",
                         "animation":"kbeek"+j+" 0.5s ease infinite"
                     });
     $("#eye"+i).css({  "position":"absolute",
                        "margin-top":"-35px",
                        "margin-left":"20px",
                        "width":"5px",
                        "height":"5px",
                        "border-radius":"100% 100% 100% 100%",
                        "background":"black",
                        "animation":"keye"+j+" 0.5s ease infinite"
                     });
     $("#feet"+i).css({  "position":"absolute",
                         "margin-top":"-7px",
                         "margin-left":"1px",
                         "width":"20px",
                         "height":"15px",
                         "border-radius":"70% 70% 50% 50%",
                         "background":"orange",
                         "transform":"rotateX(89deg)",
                         "animation":"feet"+j+" 0.5s ease infinite"
                     });
     $("#tail"+i).css({  "position":"absolute",
                         "margin-top":"-10px",
                         "margin-left":"65px",
                         "width":"20px",
                         "height":"10px",
                         "border-radius":"50% 100% 0% 100%",
                         "background": "black",
                         "transform":"rotateX(89deg)",
                         "animation":"feet"+j+" 0.5s linear infinite"
                     });
    
  }//forij
});//(jquery)