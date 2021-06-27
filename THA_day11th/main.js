const questions = [
	{
		'question':'who is god',
		'options':['i am' , 'you' , 'ram' , 'all']
	}
]
var score=0;


function shuffle(arr) {
	for (var i=0; i<arr.length; i++)
	{
		let ind = Math.floor(Math.random()*(i+1))
		temp=arr[i]
		arr[ind]=temp
	}
}
function reveal(opt){
	const options = option.closest('.options')
	console.log(options)
	let temp = score
	options.querySelector('button').forEach((button) => {
		button.click
	})
	score = temp
}

function createOption(option,answer=false)
{
	const optionHolder= document.createElement('div')
	optionHolder.className="option"
	
	const button = document.createElement('button')
	button.innerHTML='option'
	button.addEventListener('click',()=>{
		if(answer){
			if(!button.classList.contains('correct')){
				score++

			};
		button.classList.add('correct')
			
		}else{
			button.classList.add('wrong')
		}
		reveal(button)
	});
	optionHolder.append(button)
	return optionHolder
}
question.forEach((current , number)=>{
	console.log(current,number)
	
	const container = document.createElement('div')
	container.className="container"
	
	const container = document.createElement('div')
	container.className="container"

	question.innerHTML =`$(number+1). ${current.question}`
	container.append(question)
	const options = document.createElement('div')
	options.className-"options"
})

const optionArr = []
current.options.forEach((option ,number)=>{
if(number==0){
optionArr.push(createOption(option,true))
}
else{
	optionArr.push(createOption(option))
}
option.forEach((option)=>{
options.append(option)
})
container.append(options)
document.body.append

 

const showresult = document.querySelector(.result)

showresult.addEventListener('click'=>{
	showresult.innerHTML=`$(score)/$ (question.length)`
})
// <div class="container">
// 		<div class="question">1.who is the owner of company?</div>
// 		<div class="options">
// 			<div class="option"><button class="correct"></button></div>
// 			<div class="option"><button></button class="wrong"></div>
// 			<div class="option"><button></button></div>
// 			<div class="option"><button></button></div>>button
// 		</div>