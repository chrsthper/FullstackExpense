
window.addEventListener('DOMContentLoaded', () => {
  findPremium();
  fetchData();
});

 
function premiumData (response){
  const premimuContainer = document.getElementById('premium-container');
  premimuContainer.removeChild(premimuContainer.firstElementChild);
  const premimuContainer2 =document.getElementById('premium-container2')
   const premiumtext = document.createTextNode('You are Premium User.');
   const userName = document.createTextNode(response.data.name);

   const br = document.createElement('br');
   const br2 = document.createElement('br');
   const br3 = document.createElement('br');
   const br4 = document.createElement('br');
   const br5 = document.createElement('br');
   const space = document.createTextNode('All Expeses : ');
   const space2 = document.createTextNode('All Incomes : ');

   

   

   let lbutton = document.createElement('button');
   let downloadBtn = document.createElement('button');
   let IncomDownload = document.createElement('button');
   let leaderBoardText = document.createTextNode('leaderBoard');
   let downloadText = document.createTextNode('Download ');
   let downloadText2 = document.createTextNode('Download ');

   lbutton.classList = 'btn btn-dark leaderBoard-btn';
   downloadBtn.classList ='btn btn-dark';
   IncomDownload.classList ='btn btn-dark';
   
   premimuContainer.appendChild(userName);
   premimuContainer.appendChild(br);
   premimuContainer.appendChild(premiumtext);

   premimuContainer.appendChild(space);
   premimuContainer.appendChild(lbutton);
  
   lbutton.appendChild(leaderBoardText);
   premimuContainer.appendChild(br2);
   premimuContainer.appendChild(br5);



   premimuContainer2.appendChild(space)
   premimuContainer2.appendChild(downloadBtn);
   downloadBtn.appendChild(downloadText);
   premimuContainer2.appendChild(br3);
   premimuContainer2.appendChild(br4);


   premimuContainer2.appendChild(space2);
   premimuContainer2.appendChild(IncomDownload);
   IncomDownload.appendChild(downloadText2);






    downloadBtn.addEventListener('click' , async function (){
               
       const token = localStorage.getItem('token');

       await axios.get('http://localhost:4000/download',{headers:{"Authorization" : token}})
       .then((result) => {
          window.location.href = result.data.url;
       })
       .catch((err) =>{
        throw new Error(err);
       })
          

    });

    IncomDownload.addEventListener('click' , async function (){
               
      const token = localStorage.getItem('token');

      await axios.get('http://localhost:4000/downloadIncomes',{headers:{"Authorization" : token}})
      .then((result) => {
         window.location.href = result.data.url;
      })
      .catch((err) =>{
       throw new Error(err);
      })
         

   });

   
    lbutton.addEventListener('click', async function () {
    const token = localStorage.getItem('token');
    
    await axios.get('http://localhost:4000/premium-user-leaderboard',{headers : {"Authorization" : token}})
    .then((result) => {
        

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
      const li = document.createElement('tr');
      const td1 =document.createElement('td');
      const td2 =document.createElement('td');
      
      td1.appendChild(document.createTextNode(name));
      //li.appendChild(document.createTextNode(' '));
      td2.appendChild(document.createTextNode('Total Expense : '));
      td2.appendChild(document.createTextNode(totalExpense));
      li.appendChild(td1);
      li.appendChild(td2);
      
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
   
  const  select = document.getElementById('select').value;
   const  amount  = document.getElementById('amount').value;
   const  description = document.getElementById('discribe').value;
   const category = document.getElementById('category').value;
   const date = document.getElementById('date').value;
   const  time = document.getElementById('time').value;

   const expense ={
       money : select,
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

        //  fetch expenses data---
          await axios.get('http://localhost:4000/expenses', { headers : {"Authorization" : token}})
          .then(results => {
            console.log(results);
            const expenses = results.data.allExpense;
              const exp = 0;
            for(let i=0 ; i<=expenses.length; i++)
            {
                      AddExpence(expenses[i],exp);
            }

          })
          .catch(err => console.log('FetchData expense function error', err));

          //fetch incomes data ---

          await axios.get('http://localhost:4000/incomes', { headers : {"Authorization" : token}})
          .then(results => {
            console.log(results);
            const incomes = results.data.allIncomes;
              const inc=1;
            for(let i=0 ; i<=incomes.length; i++)
            {
                      AddExpence(incomes[i],inc);
            }

          })
          .catch(err => console.log('FetchData income function error', err));

          await axios.get('http://localhost:4000/balance', { headers : {"Authorization" : token}})
          .then(results => {
            console.log(results);
            const balance = results.data.balance;

            const tBalance = document.getElementById('balance');
            const balanceNode = document.createTextNode(balance);
             tBalance.appendChild(balanceNode);
            
           

          })
          .catch(err => console.log('FetchData Balance function error', err));


    };


function AddExpence(expense, select){
    
      const { amount , description, category, date, time  } = expense;
       const token = localStorage.getItem('token');   

      //  Creating li element ul ***************
      if(select == 1){
        var tr = document.getElementById('income-items');

      }
      if(select == 0){
        var tr = document.getElementById('items');

      }


      var li = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var td3 = document.createElement('td');
      var td4 = document.createElement('td');
      var td5 = document.createElement('td');

      td1.appendChild(document.createTextNode(amount));
    //  li.appendChild(document.createTextNode(" "));
      td2.appendChild(document.createTextNode(description));
      //li.appendChild(document.createTextNode(" "));
      td3.appendChild(document.createTextNode(category));
    //  li.appendChild(document.createTextNode(" "));
      td4.appendChild(document.createTextNode(date));
    //  li.appendChild(document.createTextNode(" "));
    //  td5.appendChild(document.createTextNode( time));
     // li.appendChild(document.createTextNode(" "));

     li.appendChild(td1);
     li.appendChild(td2);
     li.appendChild(td3);
     li.appendChild(td4);
   //  li.appendChild(td5);

    
       // Creatig delete button ***************************

       var deletebtn = document.createElement('button');
       deletebtn.className = " btn btn-danger  btn-sm float-right";
       deletebtn.appendChild(document.createTextNode("X"));
       li.appendChild(deletebtn);

      // li.appendChild(document.createTextNode(" "));

       // creating edit button *********************

       var edit = document.createElement('button');
       edit.className= "btn btn-primary";
       edit.appendChild(document.createTextNode('Edit'));
       li.appendChild(edit);


       // appending li element to ul *********************

    
        tr.appendChild(li);
     
        deletebtn.addEventListener('click', removeLi);
        deletebtn.addEventListener('click', decreas);
        
         async function decreas(){
      
              
          await axios.post(`http://localhost:4000/decreas-exspense`,{amount,select},{headers:{"Authorization" : token}})
            .then(()=> {
                    console.log("Decreases..")
            }).catch((err) => {
              console.log(err)
            })
         };

        async function removeLi(){
             let id = expense.id;
              let router;

             console.log(id);
              if(select ==1){
                router = 'incomes';
              }
              if(select == 0){
            
               router ='expenses';
              }
              console.log(select)
              console.log(router)
            
            
            await axios.delete(`http://localhost:4000/${router}/${id}`)
              .then( result => {
               console.log('deleted..');
                tr.removeChild(li);
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

            let router;
            console.log(id);
             if(select ==1){
                router ='expenses';
             }
             if(select == 0){
              router = 'incomes';
             }

            try {
                await axios.delete(`http://localhost:4000/${router}/${id}`)
                tr.removeChild(li);
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

