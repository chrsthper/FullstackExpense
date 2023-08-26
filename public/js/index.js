window.addEventListener('DOMContentLoaded', () => {
  findPremium();
  fetchData();
});


 
function premiumData (response){
  const premimuContainer = document.getElementById('premium-container');
  premimuContainer.removeChild(premimuContainer.firstElementChild);

   const premiumtext = document.createTextNode('You are Premium User.');
   const userName = document.createTextNode(response.data.name);

   const br = document.createElement('br');
   const space = document.createTextNode(' ');

   

   const lbutton = document.createElement('button');
   const leaderBoardText = document.createTextNode('leaderBoard');
   lbutton.classList = 'btn btn-dark leaderBoard-btn';
   
   premimuContainer.appendChild(userName);
   premimuContainer.appendChild(br)
   premimuContainer.appendChild(premiumtext);
   premimuContainer.appendChild(space)
   premimuContainer.appendChild(lbutton);
   lbutton.appendChild(leaderBoardText);

   
    lbutton.addEventListener('click', async function () {
    const token = localStorage.getItem('token');
    
    await axios.get('http://localhost:4000/premium-user-leaderboard',{headers : {"Authorization" : token}})
    .then((result) => {
        
      const heading = document.getElementById('lboardh');
      heading.appendChild(document.createTextNode('LeaderBoard'));

        let data = result.data.expensesl;
        
        
    
        for(let i=0 ; i< data.length; i++){
          leaderBoardData(data[i]);
          
        }
          

    })
    .catch( (err)=> {
      console.log(err);
    })

   });

    function leaderBoardData(data){
      console.log(data)
      const {name , totalExpense} = data;
      const ul= document.getElementById('leaderboard');
      const li = document.createElement('li');
      
      li.appendChild(document.createTextNode(name));
      li.appendChild(document.createTextNode(' '));
      li.appendChild(document.createTextNode('Total Expense : '));
      li.appendChild(document.createTextNode(totalExpense));
      
      ul.appendChild(li);

         

    }

}
  
async function findPremium(){
      
       const token = localStorage.getItem('token');

       await axios.get('http://localhost:4000/is-premium-user', {headers : {"Authorization" : token}})
       .then(( response) => {


              
              if(response.data.isPremiumUser === true){
                  premiumData(response); 
                 
              }


       })
       .catch((err)=> {
         console.log(err);
       })


}



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
       const token = localStorage.getItem('token');   

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
        deletebtn.addEventListener('click', decreas);
        
         async function decreas(){
          await axios.post(`http://localhost:4000/decreas-exspense`,{amount},{headers:{"Authorization" : token}})
            .then(()=> {
                    console.log("Decreases..")
            }).catch((err) => {
              console.log(err)
            })
         };

        async function removeLi(){
             let id = expense.id;
             console.log(id);

            
            
            await axios.delete(`http://localhost:4000/expenses/${id}`)
              .then( result => {
               console.log('deleted..');
               liElement.removeChild(li);
              })
              .catch( err => {
               console.log(err)
              });
                
               
            }
            

          
            


         

         edit.addEventListener('click',editLi);
         edit.addEventListener('click',decreas);
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

/// reazor pau handler  

 async function buyPremiume(e){
     
   const token = localStorage.getItem('token');

   const response = await axios.get('http://localhost:4000/buy-premium', { headers: {"Authorization" : token }})
   
    var options ={
         "key": response.data.key_id,
         "order_id": response.data.order.id,
         "handler": async function (resonse){
             await axios.post('http://localhost:4000/premium-success',{
                 order_id : options.order_id,
                 payment_id: resonse.razorpay_payment_id,
             },
             {
               headers:{"Authorization": token}
             }
             
             )

             setTimeout(() => {
                window.location.reload();
             },300);

   
            

         }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
   e.preventDefault();
   rzp1.on('payment.failed', function (response) {

       console.log(response);
       alert('Something went wrong');

   })
   
   
 

     



 };