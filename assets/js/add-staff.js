// Add staff functioning
const addStaffBtn = document.querySelector('.add-staff-btn');

const addStaffName = document.querySelector('.add-staff-name')

const addStaffEmail = document.querySelector('.add-staff-email')

addStaffBtn.addEventListener('click', () => {
    if (addStaffName.value.length > 1 && addStaffEmail.value.includes('@') && addStaffEmail.value.includes('.')) {
        obj = {
            name: addStaffName.value,
            email: addStaffEmail.value
        }

        // console.log(obj)
        firebase.database()
            .ref('Staff/')
            .push(obj);

        addStaffName.value = ''
        addStaffEmail.value = ''

        Swal.fire({
            icon: 'success',
            title: 'Staff Added Successfully',
        });
    }
})