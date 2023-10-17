const displayDiv = document.querySelector('#todays-spl')
const displaySection = document.querySelector('.todays-spl-section')
const spl1 = document.querySelector('.spl-1')
const spl2 = document.querySelector('.spl-2')
const spl3 = document.querySelector('.spl-3')

firebase.database()
    .ref('Todays_Spl')
    .on('value', (snapshot) => {
        if (snapshot.exists()) {
            let arr = snapshot.val()
            for (data in arr) {
                displaySection.classList.remove('hide-stuff')
                displaySection.classList.remove('show')
                spl1.innerHTML = `
                    <article class="flex space-between" style="width: 100%;">
                        <div class="div-index-image flex jc-ai-center">
                            <img class="index-image" src="${arr[1].fields.image.fields.file.url}" loading="lazy"
                                alt="Today's Special">
                        </div>
                        <div class="my-2 flex-column">
                            <h1 style="font-size: 38px;" class="todays-spl-title mat-2">${arr[1].fields.title}</h1>
                            <h4 style="font-size: 24px;" class="mat-2 mab-2">Only For &#8377; ${arr[1].fields.price}</h4>
                            <a href="#${arr[1].sys.id}"><button id="sign-modal" class="my-1 btn btn-primary" style="font-size: 20px;">Order Now</button></a>
                        </div>
                    </article>`
                spl2.innerHTML = `
                    <article class="flex space-between" style="width: 100%;">
                        <div class="div-index-image flex jc-ai-center">
                            <img class="index-image" src="${arr[2].fields.image.fields.file.url}" loading="lazy"
                                alt="Today's Special">
                        </div>
                        <div class="my-2 flex-column">
                            <h1 style="font-size: 38px;" class="todays-spl-title mat-2">${arr[2].fields.title}</h1>
                            <h4 style="font-size: 24px;" class="mat-2 mab-2">Only For &#8377; ${arr[2].fields.price}</h4>
                            <a href="#${arr[2].sys.id}"><button id="sign-modal" class="my-1 btn btn-primary" style="font-size: 20px;">Order Now</button></a>
                        </div>
                    </article>`
                spl3.innerHTML = `
                    <article class="flex space-between" style="width: 100%;">
                        <div class="div-index-image flex jc-ai-center">
                            <img class="index-image" src="${arr[3].fields.image.fields.file.url}" loading="lazy"
                                alt="Today's Special">
                        </div>
                        <div class="my-2 flex-column">
                            <h1 style="font-size: 38px;" class="todays-spl-title mat-2">${arr[3].fields.title}</h1>
                            <h4 style="font-size: 24px;" class="mat-2 mab-2">Only For &#8377; ${arr[3].fields.price}</h4>
                            <a href="#${arr[3].sys.id}"><button id="sign-modal" class="my-1 btn btn-primary" style="font-size: 20px;">Order Now</button></a>
                        </div>
                    </article>`
            }
        }
    })