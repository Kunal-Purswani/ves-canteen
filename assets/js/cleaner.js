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
                        if (data[worker].email == userEmailID && data[worker].role == 'cleaner' && window.location.pathname != '/cleaner-side.html') { }
                        // window.location.replace('https://kunal-purswani.github.io/ves_canteen/cleaner-side.html')
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
                    if (data[users][order].hasOwnProperty('Lab_No') && data[users][order].Done_Eating && !data[users][order].Order_Done) {
                        text += '<tr>'
                        text += '<td>' + ++i + '</td>'
                        for (detail in data[users][order]) {
                            if (detail == 'User_Cart' || detail == 'Order_Status' || detail == 'Payment_Status' || detail == 'Cooking_Status' || detail == 'Delivery_Status' || detail == 'Eat_At_Canteen' || detail == 'Lab_No' || detail == 'Done_Eating')
                                continue
                            else
                                text += '<td>' + data[users][order][detail] + '</td>'
                        }
                        text += '<td>' + data[users][order].Lab_No + '</td>'
                        text += '<td><div><button type="button" class="width-8 clear btn btn-primary" name="Users_Order/' + users + '/' + order + '">Take Plates</button></div></td>'
                        text += '</tr>\n'
                    }
                }
            }
        }
        tableBody.innerHTML = text
    })

tableBody.addEventListener('click', (e) => {
    let target = e.target.closest('.clear')
    if (target) {
        firebase.database()
            .ref(e.target.name)
            .update({
                Order_Done: true
            })
    }
})