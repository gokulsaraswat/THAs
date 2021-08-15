var main = function(){
	
	//Display initialization message
	$("#console .startmsg").html("<b class='green'>JavaScript and jQuery successfully loaded!</b>");
	
	//create gcon function and use it by printing out a welcome message
	var gcon = function(text){
		$("#console .wrapper").append("<p>"+text+"</p>");
		$("#console .wrapper").scrollTop($("#console .wrapper").height());
	};
	gcon("<b>Welcome to Minimal RPG!</b>");
	gcon("The objective of this game is just like real life, make money. Along the way you will be able to afford upgrades or gain money faster through reaching milestones and unlocking achievement upgrades.");
	gcon("You can speed up your money gain by taking advantage of the ore market. You can invest money into ore and wait for the price to climb higher than you bought it for and sell it back for a profit!");
	gcon("Also, you can ");
	
	//all variables for the stages
	var stagesVal =   [0,1000,10000,100000,1000000,10000000,100000000];
	var stages =      ["Year","Month","Week","Day","Hour","Min","Sec"];
	var stageHrsVal = [8760  ,720    ,168   ,24   ,1     ,0.016667,0.000277];
	var stage =       0;
	
	//incRate (value for how much / year you get) and totalMoney (self explanatory)
	var incRate =     1;
	var totalMoney =  0;
	
	//clickWait variables and payRate (how long it takes before being paid)
	var clickWaitVal =[250,500,1000,1500,2500,5000,10000,25000,50000];
	var clickWait = 1000;//time in ms, 1000 = max
	var payRate =  1000;//waiting time in ms
	
	var lastClick = new Date();
	$("#game .inc.btn").click(function(){
		if((new Date()).getTime() - lastClick.getTime() >= clickWait){
			lastClick = new Date();incRate++;updateRateLabel();
			$(this).addClass("disabled");
			setTimeout(function(){$("#game .inc.btn").removeClass("disabled");}, clickWait);
		}
	});
	
	$(".cheat.btn").click(function(){totalMoney += 10000;updateAll();});
	
	$(".upgrades .ach1").click(function(){
		var progress = (totalMoney / stagesVal[stage+1])*100;
		if(progress >= 100){
			stage+=(stage<6?1:0);updateAll();
		}
	});
	$(".upgrades .ach2").click(function(){
		var progress = (totalMoney / clickWaitVal[10 - (clickWait / 100)])*100;
		if(progress >= 100){
			clickWait-=(clickWait>100?100:0);updateAll();
		}
	});
	
	$("#game .right .tip i.fa").hover(function(e){
		var offset = $(this).offset();
		var X = offset.left, Y = offset.top;console.log("x:"+X+" y:"+Y);
		$("#tooltip").css({"top":(Y - 210)+"px","left":(X - 350)+"px"}).show();
	}, function(){
		$("#tooltip").hide();
	});
	
	var payday = function(){
		totalMoney += (8760 / stageHrsVal[stage]) * (incRate / 100);
		updateMoney();updateTooltip();
		updateAchProg();
	};
	
	var formatToMoney = function(num){var round = parseFloat(Math.round(num * 100) / 100).toFixed(2);var result = round.replace(/(\d)(?=(?:\d{3}){1,}\.\d\d$)/gm, "$1,");return result;};
	var formatToMoneyNoDecimals = function(num){
		var temp = ""+num;
		var result = temp.replace(/(\d)(?=(?:\d{3}){1,}\.\d\d$)/gm, "$1,");
		return result;
	};
	var giveMoney = function(amt){totalMoney += amt;updateMoney();};
	var setMoney = function(amt){totalMoney = amt;updateMoney();};
	var updateMoney = function(){$("#game .stats .money").text("$"+formatToMoney(totalMoney));};
	var updateRateLabel = function(){$("#game .stats .rate").text(incRate+"/"+stages[stage]);};
	var updateTooltip = function(){
		if(stage === 6){
			$("#tooltip p:first").html($.parseHTML("<color class='gray'>No more upgrades available!</color>"));
		}else{
			$("#tooltip p:first").html($.parseHTML(""+(stages[stage])+" &gt; "+(stages[stage+1])+" is unlocked at <color class='"+(totalMoney >= (formatToMoneyNoDecimals(stagesVal[stage+1]))?"green":"red")+"'>$"+(formatToMoneyNoDecimals(stagesVal[stage+1]))+"</color>"));
		}
		if(clickWait <= 100){
			$("#tooltip p:last").html($.parseHTML("<color class='gray'>No more upgrades available!</color>"));
		}else{
			var clickPrice = formatToMoney(clickWaitVal[10 - (clickWait / 100)]);
			$("#tooltip p:last").html($.parseHTML("Reduce click wait is unlocked at <color class='"+(totalMoney >= clickPrice?"green":"red")+"'>$"+clickPrice+"</color>"));
		}
	};
	var progW1 = (totalMoney / stagesVal[stage+1])*100;
	var progW2 = (totalMoney / clickWaitVal[10 - (clickWait / 100)])*100;
	var updateAchProg = function(){
		$("#game .menu .item.progress").each(function(){
			var round = parseFloat(Math.round(totalMoney * 100) / 100).toFixed(2);
			if($("head #pbars").length <= 0){
				$("head").append($.parseHTML("<style id='pbars'></style>"));
			}
			updateProgressBars();
		});
	};
	var updateProgressBars = function(){
		var progW1 = (totalMoney / stagesVal[stage+1])*100;
		var progW2 = (totalMoney / clickWaitVal[10 - (clickWait / 100)])*100;
		$("#pbars").html($.parseHTML("#game .menu .item.ach1.progress:after{width:"+(progW1+"").substr(0,3)+"%!important}#game .menu .item.ach2.progress:after{width:"+(progW2+"").substr(0,3)+"%!important}"));
		if(progW1 >= 100 && !($("#game .menu .item.ach1.progress").hasClass("loaded"))){$("#game .menu .item.ach1.progress").addClass("loaded");}
		if(progW2 >= 100 && !($("#game .menu .item.ach2.progress").hasClass("loaded"))){$("#game .menu .item.ach2.progress").addClass("loaded");}
		if(progW1 < 100 && $("#game .menu .item.ach1.progress").hasClass("loaded")){$("#game .menu .item.ach1.progress").removeClass("loaded");}
		if(progW2 < 100 && $("#game .menu .item.ach2.progress").hasClass("loaded")){$("#game .menu .item.ach2.progress").removeClass("loaded");}
		if($("#game .menu .item.ach1.progress").text() === "Max"){$("#game .menu .item.ach1.progress").addClass("disabled");}
		if($("#game .menu .item.ach2.progress").text() === "Max"){$("#game .menu .item.ach2.progress").addClass("disabled");}
	};
	var updateBtnLabels = function(){
		$(".menu .ach1.item").text(stage===6?"Max":"Change "+stages[stage]+" to "+stages[stage+1]);
		var roundfix = (Math.round(((((Math.round((clickWait / 1000)*10)/10) - 0.1)+"").substr(0,4))*10)/10);
		$(".menu .ach2.item").text((clickWait <= 100)?"Max":"Reduce click wait to "+(roundfix)+"s");
	};
	var updateAll = function(){updateMoney();updateRateLabel();updateTooltip();updateBtnLabels();updateAchProg();};
	
	var progress = 0;
	var lastPayday = new Date();
	setInterval(function(){
		if((new Date()).getTime() - lastPayday.getTime() >= payRate){
			progress=0;lastPayday = new Date();payday();
		}else{
			progress = ((new Date()).getTime() - lastPayday.getTime()) / (payRate / 100);
		}
		$(".stats .progress-bar .progress").css("width",progress+"%");
	},(payRate / 100));
	
	/* Initializations */
	updateTooltip();
	updateAchProg();
	updateBtnLabels();
};
$(document).ready(main);