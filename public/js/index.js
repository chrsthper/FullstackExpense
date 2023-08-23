async function addnewexpense (){

   const  amount  = document.getElementById('amount').value;
   const  description = document.getElementById('discribe').value;
   const category = document.getElementById('category').value;
   const date = document.getElementById('date').value;
   const  time = document.getElementById('time').value;

   const expense ={
       amount: amount,
       description:description,
       category:category,
       date:date,
       time:time
   }

   
   const token = localStorage.getItem('token');
  
  
   await axios.post('http://localhost:4000/register-expense',expense,{ headers: {"Authorization" : token }})
     .then( resonse => {
        console.log(resonse.data);
        
         

     })
     .catch(errr => {
      console.log(errr);
     })
};

   window.addEventListener('DOMContentLoaded', () => {
      fetchData();
   });

   async function fetchData(){

            const token = localStorage.getItem('token');
          await axios.get('http://localhost:4000/expenses', { headers : {"Authorization" : token}})
          .then(results => {
            console.log(results);
            const expenses = results.data.allExpense;
              
            for(let i=0 ; i<=expenses.length; i++)
            {
                      AddExpence(expenses[i]);
            }

          })
          .catch(err => console.log('FetchData function error', err))
    };


function AddExpence(expense){
    
      const { amount , description, category, date, time  } = expense;
          

      //  Creating li element ul ***************

      var liElement = document.getElementById('items');

      var li = document.createElement('li');

      li.appendChild(document.createTextNode(amount));
      li.appendChild(document.createTextNode(" "));
      li.appendChild(document.createTextNode(description));
      li.appendChild(document.createTextNode(" "));
      li.appendChild(document.createTextNode(category));
      li.appendChild(document.createTextNode(" "));
      li.appendChild(document.createTextNode(date));
      li.appendChild(document.createTextNode(" "));
      li.appendChild(document.createTextNode( time));
      li.appendChild(document.createTextNode(" "));
    
       // Creatig delete button ***************************

       var deletebtn = document.createElement('button');
       deletebtn.className = " btn btn-danger";
       deletebtn.appendChild(document.createTextNode("Delete"));
       li.appendChild(deletebtn);

       li.appendChild(document.createTextNode(" "));

       // creating edit button *********************

       var edit = document.createElement('button');
       edit.className= "btn btn-primary";
       edit.appendChild(document.createTextNode('Edit'));
       li.appendChild(edit);

       // appending li element to ul *********************

       liElement.appendChild(li);
     
        deletebtn.addEventListener('click', removeLi);

        async function removeLi(){
             let id = expense.id;
             console.log(id);
           await axios.delete(`http://localhost:4000/expenses/${id}`)
           .then( result => {
            console.log('deleted..');

           })
           .catch( err => {
            console.log(err)
           });
             
             liElement.removeChild(li);
            


         }

         edit.addEventListener('click',editLi);
      async   function editLi(){
                
              let id= expense.id;
              console.log(id);
              
            document.getElementById('amount').value = amount;
            document.getElementById('discribe').value = description;
            document.getElementById('category').value = category;
            document.getElementById('date').value = date;
            document.getElementById('time').value = time;

            try {
                await axios.delete(`http://localhost:4000/expenses/${id}`)
                liElement.removeChild(li);
                console.log('editing data..')
            
        
            } catch (error) {

                console.log(error);
                console.log('Error in editing fun.')
                
            }

              
              
         }

     
}

 function freeHolds (){
    
    setTimeout(() => {
              window.location.reload();
    },300);
 }

