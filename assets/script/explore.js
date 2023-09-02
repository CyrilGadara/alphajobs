const primaryJobCategoryList = document.querySelector("#primary-job-categories");
console.log(primaryJobCategoryList);
const secondaryJobCategoryList = document.querySelector("#secondary-job-categories");
const exploreBreadcrumb = document.querySelector(".explorerHeader");
const mainContainer = document.querySelector(".mainContainer");
const explore = document.querySelector(".explore");
const exploreVideos = document.querySelector(".exploreVideos");

async function fetchJobCategories() {
    try {
        const response = await fetch("assets/json/explore.json");
        if (!response.ok) {
            throw new Error("Failed to fetch jobCategories.");
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

async function populatePrimaryCategories() {
    const jobCategories = await fetchJobCategories();
    if (!jobCategories) {
        return;
    }

    jobCategories.forEach((category) => {
        console.log(category.primary_category);
        const li = document.createElement("li");
        // li.textContent = category.primary_category;
        li.classList.add("exploreListItem");
        li.innerHTML = `<span class="material-symbols-rounded">${category.icon}</span>${category.primary_category}`;

        const activeCategoryName = exploreBreadcrumb.querySelector("#activeCategoryName");

        li.addEventListener("click", () => {
            mainContainer.classList.add("exploreMainContainer");
            explore.classList.remove("exploreWidth");
            explore.style.borderRadius = "0";
            explore.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";
            showSecondaryJobCategories(category.subcategories);
            activeCategoryName.textContent = category.primary_category;
            document.documentElement.scrollTop = 0; // For modern browsers
            document.body.querySelector("main").scrollTop = 0; // For older browsers
        });

        primaryJobCategoryList.appendChild(li);
    });
}

function showSecondaryJobCategories(subcategories) {
    primaryJobCategoryList.style.display = "none";
    secondaryJobCategoryList.innerHTML = "";

    subcategories.forEach((subcategory) => {
        const li = document.createElement("li");
        li.textContent = subcategory;
        li.classList.add("exploreListItem");
        secondaryJobCategoryList.appendChild(li);
    });

    exploreBreadcrumb.style.display = "flex";
    secondaryJobCategoryList.style.display = "flex";
    exploreVideos.style.display = "block";

    const backToPrimaryCategories = exploreBreadcrumb.querySelector("#backToPrimaryCategories");

    console.log(backToPrimaryCategories);

    backToPrimaryCategories.addEventListener("click", () => {
        hideSubcategories();
    });
}

const toggleFilter = exploreBreadcrumb.querySelector(".toggleList");
const toggleFilterIcon = toggleFilter.querySelector(".material-symbols-rounded");
toggleFilter.addEventListener("click", () => {
    if (secondaryJobCategoryList.style.display == "flex") {
        secondaryJobCategoryList.style.display = "none";
        toggleFilterIcon.innerHTML = "filter_list";
        // toggleFilter.style.background = "#0f0f0f";
        // toggleFilter.style.color = "#fff";
    } else {
        secondaryJobCategoryList.style.display = "flex";
        toggleFilterIcon.innerHTML = "filter_list_off";
        // toggleFilter.style.background = "#fff";
        // toggleFilter.style.color = "#0f0f0f";
    }
});

function hideSubcategories() {
    secondaryJobCategoryList.style.display = "none";
    exploreBreadcrumb.style.display = "none";
    toggleFilterIcon.innerHTML = "filter_list_off";
    primaryJobCategoryList.style.display = "flex";
    exploreVideos.style.display = "none";
    mainContainer.classList.remove("exploreMainContainer");
    explore.classList.add("exploreWidth");
    explore.style.borderRadius = "10px";
    explore.style.boxShadow = "none";
}

populatePrimaryCategories();
