const form = document.querySelector("#calc_form")

form.addEventListener("submit",(event) => {
	event.preventDefault();
})

const output = document.querySelector("#output")
const operand_btns = document.querySelectorAll("button[data-type=operand]")

let is_operator = false;

console.log(operand_btns)

for(const btn of operand_btns){
	btn.addEventListener("click",(e) => {
		if(output.value == "0"){
			output.value = e.target.value;
		} else if(output.value.includes(".")){
			output.value = output.value + "" + e.target.value.replace(".","");
		} else if(is_operator){
			is_operator = false;
		} else{
			output.value = output.value + "" + e.target.value;
		}
	})
}


const operator_btns = document.querySelectorAll("button[data-type=operator]")

let equation = [];

for(const btn of operator_btns){
	btn.addEventListener("click",(e) => {
		e.currentTarget.classList.add("active");
		
		switch(e.target.value){
			case "%":
				output.value = parseFloat(output.value) / 100;
				break;
			case "invert":
				output.value = parseFloat(output.value) * -1;
				break;
			case "=":
				equation.push(output.value);
				output.value = eval(equation.join(""));
				equation = [];
				break;
			default:
				let last_item = equation[equation.length - 1];
				if(["/","*","+","-"].includes(last_item) && is_operator){
					equation.pop();
					equation.push(e.target.value);
				} else{
					equation.push(output.value);
					equation.push(e.target.value);
				}
				is_operator = true;
				break
			
		}
	})
}