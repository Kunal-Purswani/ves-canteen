let table = new DataTable('#myTable', {
    responsive: true
});
tableBody = document.querySelector('.orders')
text = ''
firebase.database()
    .ref('Users_Order/')
    .on('value', function(snapshot){
        if (snapshot.exists()){
            // Gets Data
            var data = snapshot.val();
            let i=0
            for(users in data){
                for(order in data[users]){
                    if(!data[users][order].Delivery_Status){
                        text+='<tr>'
                        text+='<td>'+ ++i +'</td>'
                        for(detail in data[users][order]){
                                if(detail == 'User_Cart' || detail == 'Order_Status' || detail == 'Payment_Status')
                                    continue
                                else if(detail == 'Cooking_Status'){
                                    if(!data[users][order][detail])
                                        text+='<td><button id="cook" class="cook btn btn-primary">'+'Cook'+'</button></td>'
                                    else
                                        text+='<td><button class="btn btn-disabled cook" disabled>'+'Cooking'+'</button></td>'
                                }
                                else if(detail == 'Delivery_Status'){
                                    if(!data[users][order][detail])
                                        text+='<td><button class="btn btn-primary ready">'+'Ready'+'</button></td>'
                                    else
                                        text+='<td><button class="btn btn-disabled ready" disabled>'+'Delivered'+'</button></td>'
                                }
                                else
                                    text+='<td>'+data[users][order][detail]+'</td>'
                        }
                        text+='</tr>\n'
                    }
                }
            }
        }
        tableBody.innerHTML=text
    })

cookBtn = document.querySelector('#cook')


tableBody.addEventListener('click',(e)=>{
    const target = e.target.closest(".cook")
    if(target)
        console.log(cookBtn.classList)
})