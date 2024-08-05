const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
gallery.insertAdjacentElement('afterend', modalContainer);
let users = [];

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        users = data.results;
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
};

const getUsers = async () => {
    const url = 'https://randomuser.me/api/?results=12';
    const usersData = await fetchData(url);
    return usersData;
};

const displayUsers = (users) => {
    const usersHTML = users.results
        .map((user) => {
            return `<div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${user.picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
            </div>`;
        }).join('');
    gallery.insertAdjacentHTML('beforeend', usersHTML);
};

const parseDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}

getUsers()
    .then(displayUsers)
    .catch(e => {
        gallery.innerHTML = e;
    });

gallery.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.card');
    const clickedUserName = clickedCard.querySelector('.card-name').textContent;

    const foundUser = users.find((user) => {
        let fullName = `${user.name.first} ${user.name.last}`;
        return fullName === clickedUserName;
    });

    const modalHTML =
        `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${foundUser.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${foundUser.name.first} ${foundUser.name.last}</h3>
                <p class="modal-text">${foundUser.email}</p>
                <p class="modal-text cap">${foundUser.location.city}</p>
                <hr>
                <p class="modal-text">${foundUser.phone}</p>
                <p class="modal-text">${foundUser.location.street.number} ${foundUser.location.street.name}, ${foundUser.location.city}, ${foundUser.location.state} ${foundUser.location.postcode}</p>
                <p class="modal-text">Birthday: ${parseDate(foundUser.dob.date)}</p>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;
    modalContainer.innerHTML = modalHTML;
    modalContainer.classList.add('open');

    const closeButton = modalContainer.querySelector('.modal-close-btn');

    closeButton.addEventListener('click', () => modalContainer.classList.remove('open'));

    modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
            modalContainer.classList.remove('open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalContainer.classList.remove('open')
        }
    });
});
