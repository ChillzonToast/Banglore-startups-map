var map = L.map('map').setView([12.965838, 77.578926], 15);
var Jawg_Dark = L.maplibreGL({
    style: 'https://api.jawg.io/styles/jawg-dark.json?access-token=UqyfdxME4ffAN7Cl8TnzU7twAIF5Luz197VpgiJwZRhPVVS2EDdIPyMvXeO36w9P',
    attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    edgeBufferTiles: 1
});
Jawg_Dark.addTo(map);
var popup = L.popup();

// Use companies data from template
let places = companiesData;
var markers = [];

function initializeMap() {
    var marker;
    var unselected = 1;
    places.forEach((place) => {
        marker = L.marker([place.latitude, place.longitude]).addTo(map);
        marker._icon.src = place.icon;
        marker._icon.style.borderRadius = "50%";
        marker._icon.style.border = "3px solid " + place.color;
        marker._icon.style.width = "45px";
        marker._icon.style.height = "45px";
        marker._icon.style.objectFit = "cover";
        marker.details = place;
        place.marker = marker;
        marker.bindPopup("<p class=\"m-0 popup-name\">" + place.name + "</p><p class=\"m-0 popup-company\">" + place.category + "</p>");
        marker.addEventListener("click", (m) => {
            if (unselected == 1) {
                for (var i = 1; i < document.getElementById("info").children.length; i++) {
                    document.getElementById("info").children[i].classList.remove("unselected");
                }
                for (var i = 1; i < document.getElementById("info-drawer").children.length; i++) {
                    if (document.getElementById("info-drawer").children[i].id == "drawer-filter-content") {
                        i++;
                    } else {
                        document.getElementById("info-drawer").children[i].classList.remove("unselected");
                    }
                }
                unselected = 0;
            }
            document.getElementById("logo").src = place.icon;
            document.getElementById("name").textContent = place.name;
            document.getElementById("company").textContent = place.category;
            document.getElementById("description").textContent = place.desc;
            document.getElementById("drawer-logo").src = place.icon;
            document.getElementById("drawer-name").textContent = place.name;
            document.getElementById("drawer-company").textContent = place.category;
            document.getElementById("drawer-description").textContent = place.desc;
            document.getElementsByClassName("thumbnail")[0].children[0].src = place.thumb;
            document.getElementsByClassName("thumbnail")[1].children[0].src = place.thumb;
            document.getElementsByClassName("company-detail-card-data")[0].innerHTML = place.valuation_amount + "<br>" + place.valuation_unit;
            document.getElementsByClassName("company-detail-card-data")[1].textContent = place.employees.toString().padStart(2, '0');
            document.getElementsByClassName("company-detail-card-data")[2].textContent = place.openings.toString().padStart(2, '0');
            document.getElementsByClassName("company-detail-card-data")[3].innerHTML = place.valuation_amount + "<br>" + place.valuation_unit;
            document.getElementsByClassName("company-detail-card-data")[4].textContent = place.employees.toString().padStart(2, '0');
            document.getElementsByClassName("company-detail-card-data")[5].textContent = place.openings.toString().padStart(2, '0');
            const foundersContainer = document.getElementById("founders");
            foundersContainer.innerHTML = "";
            place.founders.forEach((founder) => {
                var founderDiv = document.createElement('div');
                founderDiv.classList.add("mx-3", "mb-2", "d-flex", "flex-row", "justify-content-between");
                founderDiv.innerHTML = `
                
                <div class="d-flex flex-row ">
                    <img class="me-2 founder-logo"
                        src="${founder.pfp}" alt="">
                    <div class="d-flex flex-column justify-content-center">
                        <h1 class="founder-name">${founder.name}</h1>
                        <p class="founder-role m-0">${founder.role}</p>
                    </div>
                </div>
                <div class="d-flex flex-row gap-3">
                    <a href="${founder.x_twitter}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="4" fill="#272625"/>
<g clip-path="url(#clip0_123_489)">
<mask id="mask0_123_489" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="4" y="4" width="16" height="16">
<path d="M4 4H20V20H4V4Z" fill="white"/>
</mask>
<g mask="url(#mask0_123_489)">
<path d="M16.6 4.74969H19.0537L13.6937 10.8914L20 19.2503H15.0629L11.1931 14.1817L6.77029 19.2503H4.31429L10.0469 12.6788L4 4.75084H9.06286L12.5554 9.38284L16.6 4.74969ZM15.7371 17.7783H17.0971L8.32 6.14512H6.86171L15.7371 17.7783Z" fill="#DCDBDB"/>
</g>
</g>
<defs>
<clipPath id="clip0_123_489">
<rect width="16" height="16" fill="white" transform="translate(4 4)"/>
</clipPath>
</defs>
</svg>


                    </a>
                    <a href="${founder.linkedin}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" rx="4" fill="#272625"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0955 9.75475H12.8466V11.1251C13.2429 10.337 14.2592 9.62883 15.7859 9.62883C18.7125 9.62883 19.4073 11.1977 19.4073 14.0762V19.4073H16.4444V14.7318C16.4444 13.0925 16.0481 12.1681 15.0392 12.1681C13.6399 12.1681 13.0585 13.1644 13.0585 14.731V19.4073H10.0955V9.75475ZM5.01475 19.2814H7.97771V9.62883H5.01475V19.2814ZM8.40216 6.48142C8.40227 6.72977 8.35301 6.97567 8.25726 7.20482C8.16151 7.43397 8.02116 7.6418 7.84438 7.81623C7.66708 7.99262 7.45676 8.13233 7.22543 8.22741C6.99411 8.32248 6.74633 8.37103 6.49623 8.37031C5.99223 8.36917 5.50876 8.17052 5.14957 7.81697C4.97349 7.6419 4.83366 7.43382 4.73808 7.20465C4.6425 6.97549 4.59304 6.72972 4.59253 6.48142C4.59253 5.97994 4.79253 5.49994 5.15031 5.14586C5.5086 4.79096 5.99266 4.59207 6.49697 4.59253C7.00216 4.59253 7.4866 4.79179 7.84438 5.14586C8.20216 5.49994 8.40216 5.97994 8.40216 6.48142Z" fill="#DCDBDB"/>
</svg>


                    </a>
                </div>
            
                `;
                foundersContainer.appendChild(founderDiv);
            });
            const foundersContainer1 = document.getElementById("drawer-founders");
            foundersContainer1.innerHTML = "";
            place.founders.forEach((founder) => {
                var founderDiv = document.createElement('div');
                founderDiv.classList.add("mx-3", "mb-2", "d-flex", "flex-row", "justify-content-between");
                founderDiv.innerHTML = `
                
                <div class="d-flex flex-row ">
                    <img class="me-2 founder-logo"
                        src="${founder.pfp}" alt="">
                    <div class="d-flex flex-column justify-content-center">
                        <h1 class="founder-name">${founder.name}</h1>
                        <p class="founder-role m-0">${founder.role}</p>
                    </div>
                </div>
                <a href="${founder.linkedin}">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_6_4295)">
                            <path d="M17.2727 0H2.72727C2.00396 0 1.31026 0.287337 0.7988 0.7988C0.287337 1.31026 0 2.00396 0 2.72727L0 17.2727C0 17.996 0.287337 18.6897 0.7988 19.2012C1.31026 19.7127 2.00396 20 2.72727 20H17.2727C17.996 20 18.6897 19.7127 19.2012 19.2012C19.7127 18.6897 20 17.996 20 17.2727V2.72727C20 2.00396 19.7127 1.31026 19.2012 0.7988C18.6897 0.287337 17.996 0 17.2727 0ZM6.81818 15.8273C6.81833 15.8827 6.80754 15.9377 6.78642 15.989C6.7653 16.0402 6.73427 16.0868 6.6951 16.1261C6.65594 16.1654 6.60941 16.1965 6.55819 16.2178C6.50697 16.2391 6.45205 16.25 6.39659 16.25H4.6C4.54444 16.2502 4.48941 16.2393 4.43805 16.2181C4.3867 16.1969 4.34004 16.1658 4.30075 16.1265C4.26147 16.0872 4.23034 16.0406 4.20915 15.9892C4.18795 15.9379 4.17712 15.8828 4.17727 15.8273V8.29545C4.17727 8.18334 4.22181 8.07582 4.30109 7.99654C4.38036 7.91726 4.48789 7.87273 4.6 7.87273H6.39659C6.50851 7.87303 6.61574 7.9177 6.69477 7.99694C6.7738 8.07619 6.81818 8.18354 6.81818 8.29545V15.8273ZM5.49773 7.15909C5.1606 7.15909 4.83104 7.05912 4.55073 6.87182C4.27042 6.68453 4.05195 6.41831 3.92293 6.10685C3.79392 5.79538 3.76016 5.45265 3.82593 5.12201C3.8917 4.79136 4.05405 4.48763 4.29243 4.24925C4.53082 4.01086 4.83454 3.84852 5.16519 3.78275C5.49584 3.71698 5.83856 3.75074 6.15003 3.87975C6.46149 4.00876 6.72771 4.22724 6.91501 4.50755C7.1023 4.78786 7.20227 5.11742 7.20227 5.45455C7.20227 5.90662 7.02269 6.34018 6.70302 6.65984C6.38336 6.97951 5.9498 7.15909 5.49773 7.15909ZM16.2091 15.8568C16.2092 15.9079 16.1993 15.9585 16.1798 16.0057C16.1603 16.0529 16.1317 16.0958 16.0956 16.132C16.0595 16.1681 16.0166 16.1967 15.9694 16.2162C15.9221 16.2357 15.8715 16.2456 15.8205 16.2455H13.8886C13.8376 16.2456 13.787 16.2357 13.7397 16.2162C13.6925 16.1967 13.6496 16.1681 13.6135 16.132C13.5774 16.0958 13.5488 16.0529 13.5293 16.0057C13.5098 15.9585 13.4999 15.9079 13.5 15.8568V12.3284C13.5 11.8011 13.6545 10.0193 12.1216 10.0193C10.9341 10.0193 10.692 11.2386 10.6443 11.7864V15.8614C10.6443 15.9635 10.6042 16.0615 10.5325 16.1342C10.4608 16.2069 10.3634 16.2485 10.2614 16.25H8.39545C8.34447 16.25 8.29399 16.2399 8.2469 16.2204C8.19981 16.2008 8.15705 16.1722 8.12105 16.1361C8.08505 16.1 8.05653 16.0571 8.03712 16.01C8.01772 15.9629 8.00781 15.9123 8.00795 15.8614V8.2625C8.00781 8.21152 8.01772 8.16101 8.03712 8.11386C8.05653 8.06672 8.08505 8.02386 8.12105 7.98776C8.15705 7.95166 8.19981 7.92301 8.2469 7.90347C8.29399 7.88392 8.34447 7.87386 8.39545 7.87386H10.2614C10.3644 7.87386 10.4633 7.91481 10.5362 7.98769C10.6091 8.06058 10.65 8.15943 10.65 8.2625V8.91932C11.0909 8.25682 11.7443 7.74773 13.1386 7.74773C16.2273 7.74773 16.2068 10.6318 16.2068 12.2159L16.2091 15.8568Z" fill="#F6F6F6"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_6_4295">
                            <rect width="20" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>

                </a>
            
                `;
                foundersContainer1.appendChild(founderDiv);
            });
            map.setView([place["latitude"], place["longitude"]], map.getZoom());
            document.getElementById("ext-links").children[0].href = place.linkedin;
            document.getElementById("ext-links").children[1].href = place.website;
            document.getElementById("drawer-ext-links").children[0].href = place.linkedin;
            document.getElementById("drawer-ext-links").children[1].href = place.website;

        });
        markers.push(marker);
    });
    for (let i = 1; i < document.getElementById("details").childElementCount; i++) {
        document.getElementById("details").children[i].style.transition = "opacity 0.5s ease";
    };
    document.getElementById("view-details").addEventListener("click", () => {
        document.getElementById("info").classList.toggle("expand");
        for (let i = 1; i < document.getElementById("details").childElementCount; i++) {
            document.getElementById("details").children[i].classList.toggle("hidden");
        };
        setTimeout(() => {
            for (let i = 4; i < document.getElementById("info").childElementCount - 2; i++) {
                document.getElementById("info").children[i].classList.toggle("transparent");
            };
        }, 100);

        document.getElementById("view-details").children[1].classList.toggle("rotated");
    })
    document.getElementById("drawer-view-details").addEventListener("click", () => {
        for (var i = 1; i < document.getElementById("info-drawer").children.length; i++) {
            if (document.getElementById("info-drawer").children[i].id == "drawer-filter-content") {
                i++;
            } else {
                document.getElementById("info-drawer").children[i].classList.add("unselected");
            }
        }
        unselected = 1;
    })
    var fg = L.featureGroup(markers).addTo(map);
    // map.fitBounds(fg.getBounds());
    document.getElementById("searchInput").addEventListener("keydown", (e) => {
        if (e.code == "Enter" || e.key == "Enter") {
            search = e.target.value.toLowerCase();;
            places.forEach((place) => {
                if (place.name.toLowerCase().includes(search)) {
                    if (unselected == 1) {
                        for (var i = 1; i < document.getElementById("info").children.length; i++) {
                            document.getElementById("info").children[i].classList.remove("unselected");
                        }
                        for (var i = 1; i < document.getElementById("info-drawer").children.length; i++) {
                            document.getElementById("info-drawer").children[i].classList.remove("unselected");
                        }
                        unselected = 0;
                    }
                    place.marker.openPopup()
                    document.getElementById("logo").src = place.icon;
                    document.getElementById("name").textContent = place.name;
                    document.getElementById("company").textContent = place.category;
                    document.getElementById("description").textContent = place.desc;
                    document.getElementById("drawer-logo").src = place.icon;
                    document.getElementById("drawer-name").textContent = place.name;
                    document.getElementById("drawer-company").textContent = place.category;
                    document.getElementById("drawer-description").textContent = place.desc;
                    document.getElementsByClassName("thumbnail")[0].children[0].src = place.thumb;
                    document.getElementsByClassName("thumbnail")[1].children[0].src = place.thumb;
                    document.getElementsByClassName("company-detail-card-data")[0].innerHTML = place.valuation_amount + "<br>" + place.valuation_unit;
                    document.getElementsByClassName("company-detail-card-data")[1].textContent = place.employees.toString().padStart(2, '0');
                    document.getElementsByClassName("company-detail-card-data")[2].textContent = place.openings.toString().padStart(2, '0');
                    document.getElementsByClassName("company-detail-card-data")[3].innerHTML = place.valuation_amount + "<br>" + place.valuation_unit;
                    document.getElementsByClassName("company-detail-card-data")[4].textContent = place.employees.toString().padStart(2, '0');
                    document.getElementsByClassName("company-detail-card-data")[5].textContent = place.openings.toString().padStart(2, '0');
                    const foundersContainer = document.getElementById("founders");
                    foundersContainer.innerHTML = "";
                    place.founders.forEach((founder) => {
                        var founderDiv = document.createElement('div');
                        founderDiv.classList.add("mx-3", "mb-2", "d-flex", "flex-row", "justify-content-between");
                        founderDiv.innerHTML = `
                        
                        <div class="d-flex flex-row ">
                            <img class="me-2 founder-logo"
                                src="${founder.pfp}" alt="">
                            <div class="d-flex flex-column justify-content-center">
                                <h1 class="founder-name">${founder.name}</h1>
                                <p class="founder-role m-0">${founder.role}</p>
                            </div>
                        </div>
                        <a href="${founder.linkedin}">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_6_4295)">
                                    <path d="M17.2727 0H2.72727C2.00396 0 1.31026 0.287337 0.7988 0.7988C0.287337 1.31026 0 2.00396 0 2.72727L0 17.2727C0 17.996 0.287337 18.6897 0.7988 19.2012C1.31026 19.7127 2.00396 20 2.72727 20H17.2727C17.996 20 18.6897 19.7127 19.2012 19.2012C19.7127 18.6897 20 17.996 20 17.2727V2.72727C20 2.00396 19.7127 1.31026 19.2012 0.7988C18.6897 0.287337 17.996 0 17.2727 0ZM6.81818 15.8273C6.81833 15.8827 6.80754 15.9377 6.78642 15.989C6.7653 16.0402 6.73427 16.0868 6.6951 16.1261C6.65594 16.1654 6.60941 16.1965 6.55819 16.2178C6.50697 16.2391 6.45205 16.25 6.39659 16.25H4.6C4.54444 16.2502 4.48941 16.2393 4.43805 16.2181C4.3867 16.1969 4.34004 16.1658 4.30075 16.1265C4.26147 16.0872 4.23034 16.0406 4.20915 15.9892C4.18795 15.9379 4.17712 15.8828 4.17727 15.8273V8.29545C4.17727 8.18334 4.22181 8.07582 4.30109 7.99654C4.38036 7.91726 4.48789 7.87273 4.6 7.87273H6.39659C6.50851 7.87303 6.61574 7.9177 6.69477 7.99694C6.7738 8.07619 6.81818 8.18354 6.81818 8.29545V15.8273ZM5.49773 7.15909C5.1606 7.15909 4.83104 7.05912 4.55073 6.87182C4.27042 6.68453 4.05195 6.41831 3.92293 6.10685C3.79392 5.79538 3.76016 5.45265 3.82593 5.12201C3.8917 4.79136 4.05405 4.48763 4.29243 4.24925C4.53082 4.01086 4.83454 3.84852 5.16519 3.78275C5.49584 3.71698 5.83856 3.75074 6.15003 3.87975C6.46149 4.00876 6.72771 4.22724 6.91501 4.50755C7.1023 4.78786 7.20227 5.11742 7.20227 5.45455C7.20227 5.90662 7.02269 6.34018 6.70302 6.65984C6.38336 6.97951 5.9498 7.15909 5.49773 7.15909ZM16.2091 15.8568C16.2092 15.9079 16.1993 15.9585 16.1798 16.0057C16.1603 16.0529 16.1317 16.0958 16.0956 16.132C16.0595 16.1681 16.0166 16.1967 15.9694 16.2162C15.9221 16.2357 15.8715 16.2456 15.8205 16.2455H13.8886C13.8376 16.2456 13.787 16.2357 13.7397 16.2162C13.6925 16.1967 13.6496 16.1681 13.6135 16.132C13.5774 16.0958 13.5488 16.0529 13.5293 16.0057C13.5098 15.9585 13.4999 15.9079 13.5 15.8568V12.3284C13.5 11.8011 13.6545 10.0193 12.1216 10.0193C10.9341 10.0193 10.692 11.2386 10.6443 11.7864V15.8614C10.6443 15.9635 10.6042 16.0615 10.5325 16.1342C10.4608 16.2069 10.3634 16.2485 10.2614 16.25H8.39545C8.34447 16.25 8.29399 16.2399 8.2469 16.2204C8.19981 16.2008 8.15705 16.1722 8.12105 16.1361C8.08505 16.1 8.05653 16.0571 8.03712 16.01C8.01772 15.9629 8.00781 15.9123 8.00795 15.8614V8.2625C8.00781 8.21152 8.01772 8.16101 8.03712 8.11386C8.05653 8.06672 8.08505 8.02386 8.12105 7.98776C8.15705 7.95166 8.19981 7.92301 8.2469 7.90347C8.29399 7.88392 8.34447 7.87386 8.39545 7.87386H10.2614C10.3644 7.87386 10.4633 7.91481 10.5362 7.98769C10.6091 8.06058 10.65 8.15943 10.65 8.2625V8.91932C11.0909 8.25682 11.7443 7.74773 13.1386 7.74773C16.2273 7.74773 16.2068 10.6318 16.2068 12.2159L16.2091 15.8568Z" fill="#F6F6F6"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_6_4295">
                                    <rect width="20" height="20" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>

                        </a>
                    
                        `;
                        foundersContainer.appendChild(founderDiv);
                    });
                    const foundersContainer1 = document.getElementById("drawer-founders");
                    foundersContainer1.innerHTML = "";
                    place.founders.forEach((founder) => {
                        var founderDiv = document.createElement('div');
                        founderDiv.classList.add("mx-3", "mb-2", "d-flex", "flex-row", "justify-content-between");
                        founderDiv.innerHTML = `
                        
                        <div class="d-flex flex-row ">
                            <img class="me-2 founder-logo"
                                src="${founder.pfp}" alt="">
                            <div class="d-flex flex-column justify-content-center">
                                <h1 class="founder-name">${founder.name}</h1>
                                <p class="founder-role m-0">${founder.role}</p>
                            </div>
                        </div>
                        <a href="${founder.linkedin}">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_6_4295)">
                                    <path d="M17.2727 0H2.72727C2.00396 0 1.31026 0.287337 0.7988 0.7988C0.287337 1.31026 0 2.00396 0 2.72727L0 17.2727C0 17.996 0.287337 18.6897 0.7988 19.2012C1.31026 19.7127 2.00396 20 2.72727 20H17.2727C17.996 20 18.6897 19.7127 19.2012 19.2012C19.7127 18.6897 20 17.996 20 17.2727V2.72727C20 2.00396 19.7127 1.31026 19.2012 0.7988C18.6897 0.287337 17.996 0 17.2727 0ZM6.81818 15.8273C6.81833 15.8827 6.80754 15.9377 6.78642 15.989C6.7653 16.0402 6.73427 16.0868 6.6951 16.1261C6.65594 16.1654 6.60941 16.1965 6.55819 16.2178C6.50697 16.2391 6.45205 16.25 6.39659 16.25H4.6C4.54444 16.2502 4.48941 16.2393 4.43805 16.2181C4.3867 16.1969 4.34004 16.1658 4.30075 16.1265C4.26147 16.0872 4.23034 16.0406 4.20915 15.9892C4.18795 15.9379 4.17712 15.8828 4.17727 15.8273V8.29545C4.17727 8.18334 4.22181 8.07582 4.30109 7.99654C4.38036 7.91726 4.48789 7.87273 4.6 7.87273H6.39659C6.50851 7.87303 6.61574 7.9177 6.69477 7.99694C6.7738 8.07619 6.81818 8.18354 6.81818 8.29545V15.8273ZM5.49773 7.15909C5.1606 7.15909 4.83104 7.05912 4.55073 6.87182C4.27042 6.68453 4.05195 6.41831 3.92293 6.10685C3.79392 5.79538 3.76016 5.45265 3.82593 5.12201C3.8917 4.79136 4.05405 4.48763 4.29243 4.24925C4.53082 4.01086 4.83454 3.84852 5.16519 3.78275C5.49584 3.71698 5.83856 3.75074 6.15003 3.87975C6.46149 4.00876 6.72771 4.22724 6.91501 4.50755C7.1023 4.78786 7.20227 5.11742 7.20227 5.45455C7.20227 5.90662 7.02269 6.34018 6.70302 6.65984C6.38336 6.97951 5.9498 7.15909 5.49773 7.15909ZM16.2091 15.8568C16.2092 15.9079 16.1993 15.9585 16.1798 16.0057C16.1603 16.0529 16.1317 16.0958 16.0956 16.132C16.0595 16.1681 16.0166 16.1967 15.9694 16.2162C15.9221 16.2357 15.8715 16.2456 15.8205 16.2455H13.8886C13.8376 16.2456 13.787 16.2357 13.7397 16.2162C13.6925 16.1967 13.6496 16.1681 13.6135 16.132C13.5774 16.0958 13.5488 16.0529 13.5293 16.0057C13.5098 15.9585 13.4999 15.9079 13.5 15.8568V12.3284C13.5 11.8011 13.6545 10.0193 12.1216 10.0193C10.9341 10.0193 10.692 11.2386 10.6443 11.7864V15.8614C10.6443 15.9635 10.6042 16.0615 10.5325 16.1342C10.4608 16.2069 10.3634 16.2485 10.2614 16.25H8.39545C8.34447 16.25 8.29399 16.2399 8.2469 16.2204C8.19981 16.2008 8.15705 16.1722 8.12105 16.1361C8.08505 16.1 8.05653 16.0571 8.03712 16.01C8.01772 15.9629 8.00781 15.9123 8.00795 15.8614V8.2625C8.00781 8.21152 8.01772 8.16101 8.03712 8.11386C8.05653 8.06672 8.08505 8.02386 8.12105 7.98776C8.15705 7.95166 8.19981 7.92301 8.2469 7.90347C8.29399 7.88392 8.34447 7.87386 8.39545 7.87386H10.2614C10.3644 7.87386 10.4633 7.91481 10.5362 7.98769C10.6091 8.06058 10.65 8.15943 10.65 8.2625V8.91932C11.0909 8.25682 11.7443 7.74773 13.1386 7.74773C16.2273 7.74773 16.2068 10.6318 16.2068 12.2159L16.2091 15.8568Z" fill="#F6F6F6"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_6_4295">
                                    <rect width="20" height="20" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
        
                        </a>
                    
                        `;
                        foundersContainer1.appendChild(founderDiv);
                    });
                    map.setView([place["latitude"], place["longitude"]], map.getZoom());
                    document.getElementById("ext-links").children[0].href = place.linkedin;
                    document.getElementById("ext-links").children[1].href = place.website;
                    document.getElementById("drawer-ext-links").children[0].href = place.linkedin;
                    document.getElementById("drawer-ext-links").children[1].href = place.website;

                }
                return;
            })
        }
    })
}

initializeMap();

document.getElementsByClassName("filter-btn")[0].addEventListener("click", () => {
    for (var i = 0; i < document.getElementById("filter").children.length; i++) {
        document.getElementById("filter").children[i].classList.toggle("filter-toggle-hide");
    };
    document.getElementById("filter").classList.toggle("filter-content-active");
    document.getElementById("drawer-filter-content").classList.toggle("filter-toggle-hide");
});


document.getElementById("filter-back-btn").addEventListener("click", () => {
    for (var i = 0; i < document.getElementById("filter").children.length; i++) {
        document.getElementById("filter").children[i].classList.toggle("filter-toggle-hide");
    };
    document.getElementById("filter").classList.toggle("filter-content-active");
});

document.getElementById("drawer-filter-back-btn").addEventListener("click", () => {
    document.getElementsByClassName("filter-btn")[0].classList.toggle("filter-toggle-hide");
    document.getElementById("drawer-filter-content").classList.toggle("filter-toggle-hide");
});

var curLocIcon = L.icon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/map-14/144/Map-10-512.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize: [40, 40], // size of the icon
    shadowSize: [0, 0], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
navigator.geolocation.getCurrentPosition((e) => {
    lat = e.coords.latitude;
    long = e.coords.longitude;
    curLoc = L.marker([lat, long], { icon: curLocIcon }).addTo(map);
})
function locateUser() {
    map.setView([lat, long], map.getZoom());
}

map.setMinZoom(12);
map.setZoom(12);
map.setMaxZoom(17);
// map.setMaxBounds(map.getBounds());
// Set map bounds to cover Bangalore area
const southWest = L.latLng(12.83724, 77.47662);
const northEast = L.latLng(13.06343, 77.69652);
const bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);

document.getElementById("locate").addEventListener("click", (e) => {
    if (map.getBounds().contains([lat, long])) {
        locateUser();
    } else {
        document.getElementById("alert-popup").classList.toggle("popup-hidden");
        setTimeout(() => {
            document.getElementById("alert-popup").classList.toggle("popup-hidden");
        }, 3000);
    }
});

for (var i = 0; i < document.getElementsByClassName("filter-options").length; i++) {
    btns = document.getElementsByClassName("filter-options")[i].getElementsByClassName("btn")
    for (var j = 0; j < btns.length; j++) {
        btns[j].addEventListener("click", (event) => {
            event.currentTarget.classList.toggle("active");
        });
    }
}


function hideMarker(marker) {
    marker._icon.classList.add("marker-hide");
    marker._shadow.classList.add("marker-hide");
}

function showMarker(marker) {
    marker._icon.classList.remove("marker-hide");
    marker._shadow.classList.remove("marker-hide");
}

function clearFilters(toggle) {
    for (var i = 0; i < markers.length; i++) {
        showMarker(markers[i]);
    }
    if (toggle == undefined) {
        for (var i = 0; i < document.getElementsByClassName("filter-options").length; i++) {
            var btns = document.getElementsByClassName("filter-options")[i].getElementsByClassName("btn");
            for (var j = 0; j < btns.length; j++) {
                btns[j].classList.remove('active')
            }
        }
        document.getElementsByClassName('form-check-input')[0].checked = false;
        document.getElementsByClassName('form-check-input')[1].checked = false;
    }
}

function applyFilters(text) {
    clearFilters(0);

    if (text == "drawer") {
        var btns = document.getElementsByClassName("filter-options")[2].getElementsByClassName("btn");
    } else {
        var btns = document.getElementsByClassName("filter-options")[0].getElementsByClassName("btn");
    }
    var filterCategories = [];
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("active")) {
            filterCategories.push(btns[i].textContent);
        }
    }
    if (text == "drawer") {
        var btns = document.getElementsByClassName("filter-options")[3].getElementsByClassName("btn");
    } else {
        var btns = document.getElementsByClassName("filter-options")[1].getElementsByClassName("btn");
    }
    var filterSizes = [];
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].classList.contains("active")) {
            filterSizes.push(btns[i].textContent);
        }
    }
    if (text == "drawer") {
        var filterOpenings = document.getElementsByClassName('form-check-input')[1].checked;
    } else {
        var filterOpenings = document.getElementsByClassName('form-check-input')[0].checked;
    }
    for (var i = 0; i < markers.length; i++) {
        if (!filterCategories.includes(markers[i].details.category) && filterCategories.length > 0) {
            hideMarker(markers[i]);
            continue;
        }
        if (filterSizes.length > 0) {
            // Filter by employee size
            const employeeCount = markers[i].details.employees;
            let shouldShow = false;

            for (const size of filterSizes) {
                if (size === "50<" && employeeCount < 50) {
                    shouldShow = true;
                    break;
                }
                if (size === "50-100" && employeeCount >= 50 && employeeCount <= 100) {
                    shouldShow = true;
                    break;
                }
                if (size === "100-200" && employeeCount > 100 && employeeCount <= 200) {
                    shouldShow = true;
                    break;
                }
                if (size === "200-250" && employeeCount > 200 && employeeCount <= 250) {
                    shouldShow = true;
                    break;
                }
                if (size === "250+" && employeeCount > 250) {
                    shouldShow = true;
                    break;
                }
            }

            if (!shouldShow) {
                hideMarker(markers[i]);
            }
        }
        if (filterOpenings && markers[i].details.openings == 0) {
            hideMarker(markers[i]);
        }
    }
}


function closeWelcomePopup() {
    document.getElementById("welcome-popup").classList.add("popup-hidden");
    setTimeout(() => {
        document.getElementById("welcome-popup").remove();
    }, 3000);
}