// Add staff functioning
const addWorkerBtn = document.querySelector('.add-worker-btn');

const addWorkerName = document.querySelector('.add-staff-name')

const addWorkerEmail = document.querySelector('.add-staff-email')

const addWorkerRole = document.querySelector('#cars')

addWorkerBtn.addEventListener('click', () => {
    if (addWorkerName.value.length > 1 && addWorkerEmail.value.includes('@') && addWorkerEmail.value.includes('.')) {
        obj = {
            name: addWorkerName.value,
            email: addWorkerEmail.value,
            role: addWorkerRole.value 
        }

        // console.log(obj)
        firebase.database()
            .ref('Worker/')
            .push(obj);

        addWorkerName.value = ''
        addWorkerEmail.value = ''

        Swal.fire({
            icon: 'success',
            title: 'Worker Added Successfully',
        });
    }
})