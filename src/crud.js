export let tasks = JSON.parse(localStorage.getItem('tasksList')) ||  [];

 
function addTaskToStorage(){

    let tasksInfo = JSON.stringify(tasks);
    localStorage.setItem('tasksList', tasksInfo );

}


export function AddTask(){

    const task = {
        description: document.querySelector(".input-task").value,
        completed: false,
        index:  tasks.length  
      };

    tasks.push(task);
    addTaskToStorage();
  

}

export function deleteCompletedTask(taskArr){ 

    let storeLength = JSON.parse(localStorage.getItem('tasksList')).length;

    taskArr =  taskArr.filter((task) => task.completed == false );

    localStorage.setItem('tasksList', JSON.stringify(taskArr));

    location.reload();
    taskArr.forEach((task,i) => task.index = Array.from(Array(storeLength).keys())[i]);
    localStorage.setItem('tasksList', JSON.stringify(taskArr));

}

export function editTask(description, taskArr, event){



    if(event.target && event.target.matches("li.li-task")){


  
       
  
        if([...description.attributes][1].value == "false")
        {
  
          
          event.target.style.backgroundColor = '#fff176';
          [...description.attributes][1].value = true;

          let trashCan = [...document.querySelectorAll('.trash')];
          let ellipses = [...document.querySelectorAll('.fa-ellipsis-v')];

          trashCan.forEach((can) => can.classList.add('trash-active'));
          ellipses.forEach((ellipse) => ellipse.classList.add('.fa-ellipsis-v-inactive'));

        
          
          

         
  

        trashCan.forEach((can) => can.addEventListener('click', (e) => {

            
    
            let storeLength = JSON.parse(localStorage.getItem('tasksList')).length;

            taskArr =  taskArr.filter((task) => task.index == parseInt([...e.currenttarget.id][5],10));

            localStorage.setItem('tasksList', JSON.stringify(taskArr));

            location.reload();
            taskArr.forEach((taskArr,i) => taskArr.index = Array.from(Array(storeLength).keys())[i]);
            localStorage.setItem('tasksList', JSON.stringify(taskArr));



        }));
        
  
      }
  
      else if([...description.attributes][1].value == "true"){
      
      
        [...[...event.target.children][1].attributes][1].value = false;
        event.target.style.backgroundColor = 'white';
        const tmp = taskArr.findIndex((el) => el.index === parseInt([...description.id][5], 10));
        taskArr[tmp].description = description.textContent;
        addTaskToStorage();
        
    
      }
  
  
  
    }

}


