var map = L.map('map').setView([12.965838, 77.578926], 15);
var Jawg_Dark = L.maplibreGL({
    style: 'https://api.jawg.io/styles/jawg-dark.json?access-token=UqyfdxME4ffAN7Cl8TnzU7twAIF5Luz197VpgiJwZRhPVVS2EDdIPyMvXeO36w9P',
    attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    edgeBufferTiles: 1
});
Jawg_Dark.addTo(map);
map.setMinZoom(12);
map.setZoom(12);
map.setMaxZoom(17);
const southWest = L.latLng(12.83724, 77.47662);
const northEast = L.latLng(13.06343, 77.69652);
const bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);


// Add draggable marker at center
var marker = L.marker([12.965838, 77.578926], {
    draggable: true
}).addTo(map);

// Update hidden form fields with coordinates when marker is dragged
marker.on('dragend', function (e) {
    var position = marker.getLatLng();
    document.querySelector('input[name="latitude"]').value = position.lat;
    document.querySelector('input[name="longitude"]').value = position.lng;
});

// Founders list to store founder data
let founders = [];


// Function to refresh the founders list display
function refreshFoundersList() {
    const foundersList = document.querySelector('#founders-list');
    foundersList.innerHTML = '';
    founders.forEach((founder, index) => {
        const founderHTML = `
            <div class="founder-item d-flex flex-row align-items-center w-100 justify-content-center px-3">
                <span class="bullet-point" style="color: #DCDBDB; font-size: 30px;">•</span>
                <div class="mx-3 d-flex flex-row justify-content-between w-100">
                    <div class="d-flex flex-row ">
                        <img class="me-2 founder-logo"
                            src="${founder.pfp}"
                            alt="">
                        <div class="d-flex flex-column justify-content-center">
                            <h1 class="founder-name">${founder.name}</h1>
                            <p class="founder-role m-0">${founder.role}</p>
                        </div>
                    </div>
                    <div class="d-flex flex-row align-items-center gap-2">
                        <a href="${founder.x_twitter}">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="4" fill="#272625" />
                                <g clip-path="url(#clip0_128_565)">
                                    <mask id="mask0_128_565" style="mask-type:luminance" maskUnits="userSpaceOnUse"
                                        x="4" y="4" width="16" height="16">
                                        <path d="M4 4H20V20H4V4Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_128_565)">
                                        <path
                                            d="M16.6 4.74969H19.0537L13.6937 10.8914L20 19.2503H15.0629L11.1931 14.1817L6.77029 19.2503H4.31429L10.0469 12.6788L4 4.75084H9.06286L12.5554 9.38284L16.6 4.74969ZM15.7371 17.7783H17.0971L8.32 6.14512H6.86171L15.7371 17.7783Z"
                                            fill="#DCDBDB" />
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="clip0_128_565">
                                        <rect width="16" height="16" fill="white" transform="translate(4 4)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                        <a href="${founder.linkedin}">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="4" fill="#272625" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M10.0955 9.75475H12.8466V11.1251C13.2429 10.337 14.2592 9.62883 15.7859 9.62883C18.7125 9.62883 19.4073 11.1977 19.4073 14.0762V19.4073H16.4444V14.7318C16.4444 13.0925 16.0481 12.1681 15.0392 12.1681C13.6399 12.1681 13.0585 13.1644 13.0585 14.731V19.4073H10.0955V9.75475ZM5.01475 19.2814H7.97771V9.62883H5.01475V19.2814ZM8.40216 6.48142C8.40227 6.72977 8.35301 6.97567 8.25726 7.20482C8.16151 7.43397 8.02116 7.6418 7.84438 7.81623C7.66708 7.99262 7.45676 8.13233 7.22543 8.22741C6.99411 8.32248 6.74633 8.37103 6.49623 8.37031C5.99223 8.36917 5.50876 8.17052 5.14957 7.81697C4.97349 7.6419 4.83366 7.43382 4.73808 7.20465C4.6425 6.97549 4.59304 6.72972 4.59253 6.48142C4.59253 5.97994 4.79253 5.49994 5.15031 5.14586C5.5086 4.79096 5.99266 4.59207 6.49697 4.59253C7.00216 4.59253 7.4866 4.79179 7.84438 5.14586C8.20216 5.49994 8.40216 5.97994 8.40216 6.48142Z"
                                    fill="#DCDBDB" />
                            </svg>
                        </a>
                    </div>
                </div>
                <span class="delete-founder p-2" data-index="${index}">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 2V16C15 16.5 14.5 17 14 17H9H4C3.5 17 3 16.5 3 16V2" stroke="#D77777"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 2H17" stroke="#D77777" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M7 1H11M7 6V13M11 6V13" stroke="#D77777" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </span>
            </div>
        `;
        foundersList.insertAdjacentHTML('beforeend', founderHTML);
    });

    // Add click event listeners to all delete buttons
    document.querySelectorAll('.delete-founder').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            founders.splice(index, 1);
            refreshFoundersList();
        });
    });
}

// Add founder button click handler
document.querySelector('#add-founder').addEventListener('click', () => {
    // Get values from form inputs
    const name = document.querySelector('input[name="founder-form-name"]').value;
    const role = document.querySelector('input[name="founder-form-role"]').value;
    const linkedin = document.querySelector('input[name="founder-form-linkedin"]').value;
    const xTwitter = document.querySelector('input[name="founder-form-x-twitter"]').value;
    const profilePicture = document.querySelector('input[name="founder-form-profile-picture"]').value;

    // Create new founder object
    const founder = {
        name: name,
        role: role,
        linkedin: linkedin,
        x_twitter: xTwitter,
        pfp: profilePicture
    };

    // Add to founders array
    founders.push(founder);

    // Refresh display
    refreshFoundersList();

    // Clear form inputs
    document.querySelector('input[name="founder-form-name"]').value = '';
    document.querySelector('input[name="founder-form-role"]').value = '';
    document.querySelector('input[name="founder-form-linkedin"]').value = '';
    document.querySelector('input[name="founder-form-x-twitter"]').value = '';
    document.querySelector('input[name="founder-form-profile-picture"]').value = '';
});

// Add submit button click handler
document.querySelector('#submit-btn').addEventListener('click', async () => {
    try {
        // Collect all form data
        const formData = {
            name: document.querySelector('input[name="name"]').value,
            latitude: document.querySelector('input[name="latitude"]').value,
            longitude: document.querySelector('input[name="longitude"]').value,
            icon: document.querySelector('input[name="icon"]').value,
            thumb: document.querySelector('input[name="backdrop"]').value,
            linkedin: document.querySelector('input[name="linkedin"]').value,
            website: document.querySelector('input[name="website"]').value,
            desc: document.querySelector('textarea[name="description"]').value,
            category: document.querySelector('select[name="category"]').value,
            'company-details': {
                valuation: [
                    document.querySelector('input[name="valuation-amount"]').value,
                    document.querySelector('select[name="valuation-unit"]').value
                ],
                employees: document.querySelector('input[name="employees"]').value,
                openings: document.querySelector('input[name="openings"]').value
            },
            founders: founders
        };
        console.log(formData);

        // Send POST request
        const response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Startup added successfully!');
            window.location.href = '/'; // Redirect to home page
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to handle image loading errors
function handleImageError(img, fallbackSrc) {
    img.onerror = null; // Prevent infinite loop
    img.src = fallbackSrc;
}

// Add event listeners for icon and backdrop inputs
document.querySelector('input[name="icon"]').addEventListener('input', function(e) {
    const logoImg = document.querySelector('#logo');
    const newSrc = e.target.value.trim();
    if (newSrc) {
        logoImg.onerror = () => handleImageError(logoImg, '../static/curefit.png');
        logoImg.src = newSrc;
    }
});

document.querySelector('input[name="backdrop"]').addEventListener('input', function(e) {
    const backdropImg = document.querySelector('.thumbnail img');
    const newSrc = e.target.value.trim();
    if (newSrc) {
        backdropImg.onerror = () => handleImageError(backdropImg, 'https://media.licdn.com/dms/image/v2/D5622AQGgZwllEtDpIg/feedshare-shrink_800/B56ZP5EZ3qGQAg-/0/1735050510459?e=2147483647&v=beta&t=Et48M9TTvF6P-VHXyZPNbKD-PpIj6xm7ocL1RS-iqis');
        backdropImg.src = newSrc;
    }
});

// Add event listeners for preview updates
document.querySelector('input[name="name"]').addEventListener('input', function(e) {
    const nameElement = document.querySelector('#name');
    nameElement.textContent = e.target.value.trim() || 'CureFit HQ Office';
});

document.querySelector('textarea[name="description"]').addEventListener('input', function(e) {
    const descElement = document.querySelector('#description');
    descElement.textContent = e.target.value.trim() || 'Lorem ipsum dolor sit amet consectetur. Fringilla dolor nunc volutpat amet ac porttitor mauris neque. Nec ultrices proin lobortis viverra leo odio urna.';
});

document.querySelector('select[name="category"]').addEventListener('change', function(e) {
    const categoryElement = document.querySelector('#company');
    categoryElement.textContent = e.target.value || 'Fintech';
});
