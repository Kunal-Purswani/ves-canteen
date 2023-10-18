const foodItems = document.getElementById('food-items')
const removeBtn = document.getElementById('remove-btn')
const todaysSplFoodItems1 = document.getElementById('todays-spl-food-items-1');
const todaysSplFoodItems2 = document.getElementById('todays-spl-food-items-2');
const todaysSplFoodItems3 = document.getElementById('todays-spl-food-items-3');

firebase.database()
    .ref('Todays_Spl/1')
    .on('value', (snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val()
            todaysSplFoodItems1.value = data.value
        } else {
            todaysSplFoodItems1.value = 'delete'
        }
    })

firebase.database()
    .ref('Todays_Spl/2')
    .on('value', (snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val()
            todaysSplFoodItems2.value = data.value
        } else {
            todaysSplFoodItems2.value = 'delete'
        }
    })

firebase.database()
    .ref('Todays_Spl/3')
    .on('value', (snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val()
            todaysSplFoodItems3.value = data.value
        } else {
            todaysSplFoodItems3.value = 'delete'
        }
    })

firebase.database()
    .ref('Menu')
    .on('value', (snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val()
            for (item in data) {
                foodItems.innerHTML += '<option value="Menu/' + item + '">' + data[item]?.fields?.title + '</option>'
            }
        }
    })

removeBtn.addEventListener('click', (e) => {
    firebase.database().ref(foodItems.value).remove()
})

// firebase.database()
//     .ref('Menu')
//     .on('value', (snapshot) => {
//         if (snapshot.exists()) {
//             let data = snapshot.val()
//             for (item in data) {
//                 todaysSplFoodItems1.innerHTML += '<option value="Menu/' + item + '">' + data[item].fields.title + '</option>'
//             }
//         }
//     })

const setBtn = document.getElementById('todays-spl-btn')
setBtn.addEventListener('click', (e) => {
    if (todaysSplFoodItems1.value == 'delete') {
        firebase.database().ref('Todays_Spl/1').remove()
    } else {
        firebase.database()
            .ref(todaysSplFoodItems1.value)
            .on('value', (snapshot) => {
                let data = snapshot.val()
                firebase.database()
                    .ref('Todays_Spl/1')
                    .set({
                        ...data,
                        value: todaysSplFoodItems1.value,
                    })
            })
    }
    if (todaysSplFoodItems2.value == 'delete') {
        firebase.database().ref('Todays_Spl/2').remove()
    } else {
        firebase.database()
            .ref(todaysSplFoodItems2.value)
            .on('value', (snapshot) => {
                let data = snapshot.val()
                firebase.database()
                    .ref('Todays_Spl/2')
                    .set({
                        ...data,
                        value: todaysSplFoodItems2.value,
                    })
            })
    }
    if (todaysSplFoodItems3.value == 'delete') {
        firebase.database().ref('Todays_Spl/3').remove()
    } else {
        firebase.database()
            .ref(todaysSplFoodItems3.value)
            .on('value', (snapshot) => {
                let data = snapshot.val()
                firebase.database()
                    .ref('Todays_Spl/3')
                    .set({
                        ...data,
                        value: todaysSplFoodItems3.value,
                    })
            })
    }
    Swal.fire({
        icon: 'success',
        title: 'Today\'s Special Set',
    })
})

// for(i=26;i<=1012;i++)
//   firebase.database().ref('Menu/'+i).remove()
const title = document.getElementById('add-title');
const cal = document.getElementById('add-calories');
const price = document.getElementById('add-price');
const fileInput = document.getElementById('fileInput');
const category = document.getElementById('add-category');
const uploadButton = document.getElementById('uploadButton');
let isUploaded = false
let len = 0
let url = ''
uploadButton.addEventListener('click', () => {
    console.log(title.value, cal.value, price.value, category.value);
    firebase.database()
        .ref('Menu')
        .on('value', (snapshot) => {
            let data = snapshot.val();
            len = data.length
            const file = fileInput.files[0];

            if (file) {
                const storageRef = firebase.storage().ref('/');
                const imageRef = storageRef.child(`images/${file.name}`);

                imageRef.put(file).then((snapshot) => {
                    console.log('Image uploaded successfully');
                    snapshot.ref.getDownloadURL().then(function (url) {
                        url = url
                        if (!isUploaded) {
                            firebase.database().ref('Menu/' + len).set({
                                fields: {
                                    caleories: cal.value,
                                    category: category.value,
                                    image: {
                                        fields: {
                                            file: {
                                                url: url,
                                            }
                                        }
                                    },
                                    price: price.value,
                                    title: title.value,

                                },
                                sys: {
                                    id: len + 1,
                                }
                            }).then(() => {
                                isUploaded = true
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Product Added',
                                })
                            }).catch(error => console.error(error))
                        }
                    });
                }).catch((error) => {
                    console.error('Error uploading image:', error);
                });
            } else {
                console.error('No file selected.');
            }
        })
});