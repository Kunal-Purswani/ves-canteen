const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const title = document.querySelector('.title')

const heading = document.querySelector('.heading')

const ordStatus = document.querySelector('#status')

const date = document.querySelector('#date')

const time = document.querySelector('#time')

const ordItems = document.querySelector('#ordItems')

firebase.database()
    .ref('Users_Order')
    .on('value',(snapshot)=>{
        if(snapshot.exists()){
            var data = snapshot.val()
            for(users in data){
                i=0
                for(order in data[users]){
                    i++
                    if(order==id){
                        uid = data[users][order].Email_ID.split('@')[0]
                        uid = uid[0].toUpperCase()+ uid.substring(1)
                        title.innerHTML= uid + '\'s Order'

                        // heading
                        heading.innerHTML = uid + '\'s #'+i+' Order'

                        date.innerHTML = '&nbsp; &nbsp;' + data[users][order].Order_Date

                        time.innerHTML = '&nbsp; &nbsp;' + data[users][order].Order_Time

                        if(!data[users][order].Cooking_Status)
                            ordStatus.innerHTML = '&nbsp; &nbsp; Order Received'
                        else if(data[users][order].Cooking_Status && !data[users][order].Delivery_Status)
                            ordStatus.innerHTML = '&nbsp; &nbsp; Cooking'
                        else if(data[users][order].Cooking_Status && data[users][order].Delivery_Status)
                            ordStatus.innerHTML = '&nbsp; &nbsp; You Meal is Ready!'

                        let text = ''

                        for(foodItem in data[users][order].User_Cart.Details){
                            let id = data[users][order].User_Cart.Details[foodItem].FoodID
                            let quantity = data[users][order].User_Cart.Details[foodItem].Quantity
                            let name = ''
                            firebase.database()
                                .ref('Menu')
                                .on('value',(snapshot)=>{
                                    if(snapshot.exists()){
                                        let menu = snapshot.val()
                                        for(items in menu){
                                            // console.log(menu[items].sys.id)
                                            // console.log(id)
                                            if(id==menu[items].sys.id){
                                                name = menu[items].fields.title
                                            }
                                        }
                                        text+='<li><h5>'+name+'&nbsp; x &nbsp;'+quantity+'</h5></li>'
                                    }
                                    ordItems.innerHTML=text
                                })
                        }
                    }
                }
            }
        }
    })