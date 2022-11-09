let start_quiz_button=document.querySelector(".start_quiz_button")
let continue_button=document.querySelector(".continue_button")
let exit_button=document.querySelector(".exit_button")
let rules_card=document.querySelector(".rules_card")
let quiz_card=document.querySelector(".quiz_card")
let option_lists=document.querySelector(".option_list")
let next_button=document.querySelector(".next_button")
let question=document.querySelector(".question")
let question_count=document.querySelector(".question_count")
let timing=document.querySelector(".timing")
let time_line=document.querySelector(".time_line")
//Start quiz
start_quiz_button.addEventListener("click",()=>{
    rules_card.classList.remove("d-none")
})
//exit quiz
exit_button.addEventListener("click",()=>{
    console.log("Hi I am exit")
    rules_card.classList.add("d-none")
})
//continue to play quiz
continue_button.addEventListener("click",()=>{
    rules_card.classList.add("d-none")
    quiz_card.classList.remove("d-none")
    createlist(0)
    timer(time)
   
})

let que_count=0;
let time=15
let counter
let counter_line
let time_count_for_line=0
//next quiz
next_button.addEventListener("click",()=>{
    que_count++
    if(que_count>quiz_data_obj.length-1){
        alert("Question Ends")
    }
    clearInterval(counter)
    clearInterval(counter_line)
    timer(time)
    timer_for_line(time_count_for_line)
    createlist(que_count)
})
//show case for quiz
function createlist(index){
    question.innerHTML=`${quiz_data_obj[index].number}.${quiz_data_obj[index].question}`
   let li=`
   <li class="option p-2 bg-primary mt-2 rounded-1 bg-opacity-25  d-flex justify-content-between">${quiz_data_obj[index].options[0]} </li>
   <li class="option p-2 bg-primary mt-2 rounded-1 bg-opacity-25  d-flex justify-content-between">${quiz_data_obj[index].options[1]}</li>
   <li class="option p-2 bg-primary mt-2 rounded-1 bg-opacity-25  d-flex justify-content-between">${quiz_data_obj[index].options[2]}</li>
   <li class="option p-2 bg-primary mt-2 rounded-1 bg-opacity-25  d-flex justify-content-between">${quiz_data_obj[index].options[3]}</li>`
   option_lists.innerHTML=li
   question_count.innerHTML=`${quiz_data_obj[index].number} of ${quiz_data_obj.length} Questions`
   let options=document.querySelectorAll(".option")
   options.forEach((val)=>{
    val.addEventListener("click",(event)=>{  
        choosing_answer(val,event)
    })
   })
    
}
createlist(0)
//choosing answer
function choosing_answer(click_option,e){
   let chose_answer= click_option.textContent
   let option_list_children=[...option_lists.children]
   if(chose_answer==quiz_data_obj[que_count].answer){
  e.target.classList.add("correct")
  e.target.insertAdjacentHTML("beforeend",`<i class="bi bi-check-circle text-success"></i>`)
   }else{
    e.target.classList.add("incorrect")
    e.target.insertAdjacentHTML("beforeend",`<i class="bi bi-x-circle text-danger"></i>`)
    //if answer is wrong show right answer automatically
    option_list_children.forEach((val)=>{
        if(val.textContent==quiz_data_obj[que_count].answer){
            val.classList.add("correct")
            val.insertAdjacentHTML("beforeend",`<i class="bi bi-check-circle text-success"></i>`)
        }
       
    })
   
   }
//oncle chose answer all option disabled
option_list_children.forEach((val)=>{
   val.classList.add("disable")
})
clearInterval(counter)
clearInterval(counter_line)
}
//timing
function timer(time){
    counter=setInterval(timecount,1000)
    function timecount(){
        timing.textContent=time
        time--
        if(time<=0){
            
            clearInterval(counter)
        }
        if(time<10){
            timing.textContent="0"+time
        }

    }
   
      
}
//line timer
function timer_for_line(time_count_for_line){
    counter_line=setInterval(timecount,21)
    function timecount(){
          time_count_for_line+=1
          if(time_count_for_line>700){
            clearInterval(counter_line)
          }
          time_line.style.width=time_count_for_line+"px"
    }
   
      
}
timer(15)
timer_for_line(time_count_for_line)



