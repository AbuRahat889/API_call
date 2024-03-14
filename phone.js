//load data form API
const loadPhone = async (inputText='iphone') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    const data = await res.json();
    // console.log(data.data);
    displayPhone(data.data);
}


const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    //clear old data befor search
    phoneContainer.textContent = '';
    // console.log(phones);

    // show more btn
    const showMore = document.getElementById('show-more');
    if (phones.length > 9) {
        showMore.classList.remove('hidden');
    }
    else {
        showMore.classList.add('hidden');
    }
    //show more btn
    phones = phones.slice(0, 9);
    // console.log(phones);

    phones.forEach(phone => {
        // console.log(phone);

        //step 2 create element
        const createDiv = document.createElement('div');
        createDiv.classList = `card card-compact p-6 bg-base-500 shadow-md shadow-zinc-300`;
        //step 3: add inner html
        createDiv.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body ">
            <h2 class="card-title justify-center">${phone.phone_name}</h2>
            <p class = "text-center">${phone.slug}</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" id="show-details" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;

        //step 4: append element
        phoneContainer.appendChild(createDiv);
    })
    //hide loading conatiner
    toggoleLoading(false);
}
//handle show-details btn
const handleShowDetails = async (id)=>{
    // console.log('clik show details',id);
    
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await res.json();
        // console.log(data.data);

        handleModal(data);
}

//handel model/pop-up
const handleModal = (phone)=>{
    console.log(phone.data);
    my_modal_5.showModal();

    //create pop-up modal 
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.data.name;

    //image show
    const imageShow = document.getElementById('image-Show');
    imageShow.innerHTML = `
    <img src="${phone.data.image}" alt="">
    `;
}


//loading container
const toggoleLoading = (isLoading) => {
    const loadintContainer = document.getElementById('loadint-container');
    if (isLoading) {
        loadintContainer.classList.remove('hidden');
    }
    else {
        loadintContainer.classList.add('hidden');
    }
}
//search handeler 
const searchHandeler = () => {
    toggoleLoading(true);
    const inputText = document.getElementById('input-text').value;
    //    console.log(inputText);
    loadPhone(inputText);
}

loadPhone();