firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        let trimedEmailID = user.email.split('@')[0]
        firebase.database()
            .ref('Users_Order/' + trimedEmailID + '_Orders')
            .on('value', function (snapshot) {
                if (snapshot.exists()) {
                    // Gets Data
                    var data = snapshot.val();
                    // Get Encrytion Keys
                    var userOrder = Object.keys(data)

                    // Puts keys & extracts values -
                    let i = 0
                    userOrder.forEach(key => {
                        // All Required Stuff
                        var total = data[key].User_Cart.Total_Amount
                        var date = data[key].Order_Date
                        var time = data[key].Order_Time
                        var deliveryStatus = data[key].Delivery_Status
                        var UserCart = data[key].User_Cart.Details
                        var orderStatus = data[key].Order_Status
                        var cookingStatus = data[key].Cooking_Status
                        var trimedID = '';
                        var orderID = 'UO' + date

                        // Creates Order ID
                        for (let j = 0; j < orderID.length; j++) {
                            if (orderID[j] != '/') {
                                trimedID += orderID[j]
                            }
                        }
                        if (data[key].Order_Status === true) {
                            i += 1

                            // Check Order If accepted or not
                            if (orderStatus === true) { orderStatus = 'Order Received' }
                            if (cookingStatus === true) { orderStatus = 'Cooking' }
                            if (deliveryStatus === true) { orderStatus = 'Ready' }

                            // --- Creates Main Container ---
                            const div = document.createElement('main');
                            div.classList.add('current-details');

                            div.innerHTML = `
                    <!-- Current Order Main Titles -->
                    <table class="main-details">
                    <div class="flex" style="justify-content: space-between;">
                    <div><button class="table-btn my-1">Ordered Detail</button></div>
                    <div class="md">${'#' + i}</div>
                    </div>
                    <thead>
                    <tr>
                    <th><i class="fas fa-th-list" style="margin-right: 5px;"></i> Order ID</th>
                    <th><i class="fas fa-tenge" style="margin-right: 5px;"></i> Total</th>
                    <th><i class="fas fa-calendar-alt" style="margin-right: 5px;"></i> Ordered Date</th>
                    <th><i class="fas fa-clock" style="margin-right: 5px;"></i> Ordered Time</th>
                    <th><i class="fas fa-calendar-check" style="margin-right: 5px;"></i> Order Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td data-label= "Order ID">${trimedID}</td>
                    <td data-label= "Total">&#8377; ${total}</td>
                    <td data-label= "Date">${date}</td>
                    <td data-label= "Time">${time}</td>
                    <td data-label= "Order Status">${orderStatus}</td>
                    </tr>
                    </tbody>
                    </table>
                    <button class="table-btn" id="show-order-details">More Details</button>
                    `
                            orderInner.appendChild(div)

                            // --- Creates table of Current Order ---
                            let sID = 0
                            const currentDiv = document.createElement('table')
                            currentDiv.classList.add('descriptive-details')
                            currentDiv.innerHTML = `
                    <thead>
                    <tr>
                    <th><i class="fas fa-coins" style="margin-right: 5px;"></i> ${'S. No'}</th>
                    <th><i class="fas fa-th-list" style="margin-right: 5px;"></i> ${'Food'}</th>
                    <th><i class="fas fa-money-bill-alt" style="margin-right: 5px;"></i> ${'Price'}</th>
                    <th><i class="fab fa-buffer" style="margin-right: 5px;"></i> ${'Quantity'} </th>
                    <th><i class="fas fa-tenge" style="margin-right: 5px;"></i> ${'Sub Total'}</th>
                    </tr>
                    </thead>
                    `
                            // Create table Data Body
                            var tbody = document.createElement('tbody');
                            // Puts data in Table
                            UserCart.forEach(itemID => {
                                sID += 1
                                let foodID = itemID.FoodID
                                let subTotal = newMenu[foodID - 1].fields.price * itemID.Quantity
                                // Creates Table Fields 
                                var tr = document.createElement('tr');
                                tr.classList.add('my-1')
                                tr.innerHTML = `
                        <td data-label= "S. No">${sID}</td>
                            <td data-label= "Item">${newMenu[foodID - 1].fields.title}</td>
                            <td data-label= "Price">&#8377 ${newMenu[foodID - 1].fields.price}</td>
                            <td data-label= "Quantity">${itemID.Quantity}</td>
                            <td data-label= "Sub Total">&#8377 ${subTotal}</td>
                            `
                                tbody.appendChild(tr)
                            })

                            // Line Seperating Two Orders -
                            var lineHR = document.createElement('hr')
                            lineHR.style.margin = '2rem auto 0rem auto';
                            lineHR.classList.add('hrStyle')
                            // Structures Container & other stuff
                            currentDiv.appendChild(tbody)
                            div.appendChild(currentDiv)
                            orderInner.appendChild(div)
                            orderInner.appendChild(lineHR)

                        }
                        // If order isn't accepted by administrator
                        else if (data[key].Order_Status === false) {
                            i += 1

                            // --- Creates Main Container ---
                            const div = document.createElement('main');
                            div.classList.add('current-details');

                            div.innerHTML = `
                    <!-- Current Order Main Titles -->
                    <table class="main-details">
                    <div class="flex" style="justify-content: space-between;">
                    <div><button class="table-btn my-1">Ordered Detail</button></div>
                    <div class="md">${'#' + i}</div>
                    </div>
                    <thead>
                    <tr>
                    <th><i class="fas fa-th-list" style="margin-right: 5px;"></i> Order ID</th>
                    <th><i class="fas fa-tenge" style="margin-right: 5px;"></i> Total</th>
                    <th><i class="fas fa-calendar-alt" style="margin-right: 5px;"></i> Ordered Date</th>
                    <th><i class="fas fa-clock" style="margin-right: 5px;"></i> Ordered Time</th>
                    <th><i class="fas fa-calendar-check" style="margin-right: 5px;"></i> Order Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td data-label= "Order ID">${trimedID}</td>
                                    <td data-label= "Total">&#8377; ${total}</td>
                                    <td data-label= "Date">${date}</td>
                                    <td data-label= "Time">${time}</td>
                                    <td data-label= "Order Status">${'Not Confirmed Yet'}</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                    `
                            orderInner.appendChild(div)
                        }
                    })
                } else {
                    console.log('no orders');
                }
            })
    }
});