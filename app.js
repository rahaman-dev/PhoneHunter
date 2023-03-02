// load phone API
let loadPhone = (searchText) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data));
};

// display phones
let displayPhone = (phones) => {
  let getPhone = document.getElementById("container-phones");
  getPhone.textContent = "";

  // show 10 phones
  let getShowAllDAta = document.getElementById("showAllBtn");
  if (phones.length > 10) {
    phones = phones.slice(0, 10);
    getShowAllDAta.classList.remove("d-none");
  } else {
    getShowAllDAta.classList.add("d-none");
  }

  //   Not fond phone
  let noPhoneFound = document.getElementById("emptyResult");
  if (phones.length === 0) {
    noPhoneFound.classList.remove("d-none");
  } else if (phones.length !== 0) {
    noPhoneFound.classList.add("d-none");
  }
  phones.forEach((phone) => {
    let crtDvi = document.createElement("div");
    crtDvi.classList.add("col");
    crtDvi.innerHTML = `
    <div class="card mx-5 mt-2 p-1">
      <img src="${phone.image}" class="card-img-top" alt="..." />
      <div class="card-body mx-2">
        <h6 class="card-title">${phone.brand}</h6>
        <h5 class="card-title">${phone.phone_name}</h5>
        <P class="card-title"><b>${phone.slug}</b></P>
        <p class="card-text">
          This is a longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.
        </p>
        <button onclick="showDetailsFunc(${phone.slug})" id="showDetails" class="btn btn-primary">Show Details</button>
      </div>
      </div>;
      `;
    getPhone.appendChild(crtDvi);
  });
  //   loader stop
  toggleSpinier(false);
};

// search function
let getPhoneSearch = () => {
  document.getElementById("search-btn").addEventListener("click", () => {
    let getSearch = document.getElementById("search").value;
    loadPhone(getSearch);
    // loader start
    toggleSpinier(true);
  });
};

// enter filed event
document
  .getElementById("searchField")
  .addEventListener("keypress", function (e) {
    // console.log(e.key);
    if (e.key === "Enter") {
      getPhoneSearch();
    }
  });
// loader function
let toggleSpinier = (isLodging) => {
  let getLoader = document.getElementById("loader");
  if (isLodging) {
    getLoader.classList.remove("d-none");
  } else {
    getLoader.classList.add("d-none");
  }
};
// show details btn
let showDetailsFunc = () => {
  document.getElementById("showDetails").addEventListener("click", function () {
    func();
  });
};
let phoneDetails = () => {
  let url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
// showDetailsFunc();
getPhoneSearch();
