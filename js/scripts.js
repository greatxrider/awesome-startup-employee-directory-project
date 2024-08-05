const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
gallery.insertAdjacentElement('afterend', modalContainer);
const paginationHTML =
    `<div class="pagination">
            <ul class="link-list"></ul>
        </div>`;
gallery.insertAdjacentHTML('afterend', paginationHTML);
const usersPerPage = 12;
let currentIndex = 0;
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
    const url = 'https://randomuser.me/api/?results=58';
    const usersData = await fetchData(url);
    return usersData;
};

const displayLoading = () => {
    gallery.innerHTML = '<div id="spinner"></div>';
};

const displaySearchBar = () => {
    const searchBarHTML =
        `<form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;
    searchContainer.insertAdjacentHTML('beforeend', searchBarHTML);
}

const addPagination = (list) => {
    const paginationList = document.querySelector('.link-list');
    const numberOfButtons = Math.ceil(list.length / usersPerPage);
    paginationList.innerHTML = '';

    for (let i = 1; i <= numberOfButtons; i++) {
        const buttonHtml = `
          <li>
             <button type="button">${i}</button>
          </li>
       `;
        paginationList.insertAdjacentHTML('beforeend', buttonHtml);
    };

    if (paginationList.querySelector('button')) {
        paginationList.querySelector('button').classList.add('active');
    }

    paginationList.addEventListener('click', (e) => {
        const activeButton = paginationList.querySelector('.active');
        const buttonClicked = e.target.closest('button');

        if (activeButton && buttonClicked) {
            activeButton.classList.remove("active");
        }

        if (buttonClicked) {
            buttonClicked.classList.add("active");
            displayUsers(list, buttonClicked.innerHTML);
        }
    });
};

const displayUsers = (list, page) => {
    const startIndex = (page * usersPerPage) - usersPerPage;
    const endIndex = (page * usersPerPage) - 1;
    gallery.innerHTML = '';
    console.log(list);
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i <= endIndex) {
            const userHTML = `<div class="card">
                                    <div class="card-img-container">
                                        <img class="card-img" src="${list[i].picture.large}" alt="profile picture">
                                    </div>
                                    <div class="card-info-container">
                                        <h3 id="name" class="card-name cap">${list[i].name.first} ${list[i].name.last}</h3>
                                        <p class="card-text">${list[i].email}</p>
                                        <p class="card-text cap">${list[i].location.city}, ${list[i].location.state}</p>
                                    </div>
                                </div>`;
            gallery.insertAdjacentHTML('beforeend', userHTML);
        }
    }
};

const parseDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}

const showModal = (list) => {
    const modalHTML =
        `<div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${list.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${list.name.first} ${list.name.last}</h3>
                    <p class="modal-text">${list.email}</p>
                    <p class="modal-text cap">${list.location.city}</p>
                    <hr>
                    <p class="modal-text">${list.phone}</p>
                    <p class="modal-text">${list.location.street.number} ${list.location.street.name}, ${list.location.city}, ${list.location.state} ${list.location.postcode}</p>
                    <p class="modal-text">Birthday: ${parseDate(list.dob.date)}</p>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;
    modalContainer.innerHTML = modalHTML;
    modalContainer.classList.add('open');
};

const getUserIndex = (name) => {
    console.log(users);
    modalContainer.innerHTML = '';
    const index = users.findIndex(user => {
        let fullName = `${user.name.first} ${user.name.last}`;
        return fullName === name;
    })
    return index;
}

const findUser = (name, list) => {
    const foundUser = list.find((user) => {
        let fullName = `${user.name.first} ${user.name.last}`;
        return fullName === name;
    });
    return foundUser;
}

gallery.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.card');
    if (clickedCard) {
        const clickedUserName = clickedCard.querySelector('.card-name').textContent;
        currentIndex = getUserIndex(clickedUserName);
        modalContainer.innerHTML = '';
        showModal(findUser(clickedUserName, users));
    };
});

modalContainer.addEventListener('click', (event) => {
    const target = event.target;

    if (target.id === 'modal-close-btn' || target.closest('#modal-close-btn')) {
        modalContainer.classList.remove('open')
    } else if (target.id === 'modal-prev' || target.closest('#modal-prev')) {
        if ()
    } else if (target.id === 'modal-next' || target.closest('#modal-next')) {

    } else if (target === modalContainer) {
        modalContainer.classList.remove('open');
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modalContainer.classList.remove('open');
    }
});

displayLoading();
getUsers()
    .then((users) => {
        addPagination(users.results);
        displayUsers(users.results, 1);
    })
    .then(displaySearchBar)
    .catch(e => {
        gallery.innerHTML = e;
    });
