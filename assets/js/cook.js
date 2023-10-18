let table = new DataTable('#myTable', {
    responsive: true
});
tableBody = document.querySelector('.orders')
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        let userEmailID = user.email
        // console.log(userEmailID)
        firebase.database()
            .ref('Worker/')
            .on('value', function (snapshot) {
                if (snapshot.exists()) {
                    // Gets Data
                    var data = snapshot.val();
                    for (worker in data) {
                        if (data[worker].email == userEmailID && data[worker].role == 'cook' && window.location.pathname != '/cook-side.html')
                            window.location.replace('http://127.0.0.1:5502/cook-side.html')
                    }
                }
            })
    }
})
text = ''
firebase.database()
    .ref('Users_Order/')
    .on('value', function (snapshot) {
        text = ''
        if (snapshot.exists()) {
            // Gets Data
            var data = snapshot.val();
            let i = 0
            for (users in data) {
                for (order in data[users]) {
                    if (!data[users][order].Delivery_Status) {
                        text += '<tr>'
                        text += '<td>' + ++i + '</td>'
                        for (detail in data[users][order]) {
                            if (detail == 'User_Cart' || detail == 'Order_Status' || detail == 'Payment_Status' || detail == 'Cooking_Status' || detail == 'Delivery_Status' || detail == 'Eat_At_Canteen' || detail == 'Lab_No' || detail == 'Done_Eating')
                                continue
                            else
                                text += '<td>' + data[users][order][detail] + '</td>'
                        }
                        if (!data[users][order].Cooking_Status)
                            text += '<td><div><button type="button" id="cook" class="width-8 cook btn btn-primary" name="Users_Order/' + users + '/' + order + '">Cook Order</button><button type="button" id="deliver" class="width-8 deliver btn btn-secondary disabled" name="Users_Order/' + users + '/' + order + '" disabled>Deliver Order</button></div></td>'
                        if (data[users][order].Cooking_Status && !data[users][order].Delivery_Status)
                            text += '<td><div><button type="button" id="cook" class="width-8 cook btn btn-secondary disabled" name="Users_Order/' + users + '/' + order + '" disabled>Cooking</button><button type="button" id="deliver" class="width-8 deliver btn btn-primary" name="Users_Order/' + users + '/' + order + '">Deliver Order</button></div></td>'
                        text += '<td><a target="_blank" rel="noopener noreferrer" class="ord-details btn btn-primary" href="http://127.0.0.1:5502/order-details.html?id=' + order + '">Order Detail</a></button></td>'
                        text += '</tr>\n'
                    }
                }
            }
        }
        tableBody.innerHTML = text
    })

tableBody.addEventListener('click', (e) => {
    let target = e.target.closest('.cook')
    if (target) {
        firebase.database()
            .ref(target.name)
            .on('value', function (snapshot) {
                if (snapshot.exists()) {
                    // Gets Data
                    var data = snapshot.val();
                    firebase.database()
                        .ref(target.name)
                        .update({
                            Cooking_Status: true
                        });
                    console.log(data)
                }
            })
    }
    target = e.target.closest('.deliver')
    if (target) {
        firebase.database()
            .ref(target.name)
            .on('value', function (snapshot) {
                if (snapshot.exists()) {
                    // Gets Data
                    var data = snapshot.val();
                    firebase.database()
                        .ref(target.name)
                        .update({
                            Delivery_Status: true
                        });
                    console.log(data)
                }
            })
    }
})