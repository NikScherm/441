class ViewMaster {
    constructor(title, image, description, author, imageYear) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.author = author;
        this.imageYear = imageYear;
    }
}

const viewMasterCollection = [
    new ViewMaster(
        "title 1",
        "imgs/blue.png",
        "description",
        "author",
        2000
    ),
    new ViewMaster(
        "title 2",
        "imgs/darkBlue.png",
        "description",
        "author",
        1950
    ),
    new ViewMaster(
        "title 3",
        "imgs/green.png",
        "description",
        "author",
        1800
    ),
    new ViewMaster(
        "title 4",
        "imgs/orange.png",
        "description",
        "author",
        1900
    )
];
let previousIndex = -1;
function showRandomView() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * viewMasterCollection.length);
    } while (randomIndex === previousIndex); // Loops until index is changed

    previousIndex = randomIndex;

    let selectedView = viewMasterCollection[randomIndex];

    document.getElementById("title").innerText = selectedView.title;
    document.getElementById("image").src = selectedView.image;
    document.getElementById("image").style.display = "block";
    document.getElementById("description").innerText = selectedView.description;


//hides at start then displays when not epty
    let descriptionElem = document.getElementById("description");
    descriptionElem.classList.add("show");

    let authorElem = document.getElementById("author");
    let authorContainer = authorElem.parentElement;
    authorElem.innerText = selectedView.author;
    authorContainer.style.display = selectedView.author && selectedView.author.trim() !== "" ? "block" : "none";  // Hide if empty

    let yearElem = document.getElementById("year");
    let yearContainer = yearElem.parentElement;
    yearElem.innerText = selectedView.imageYear;
    yearContainer.style.display = selectedView.imageYear ? "block" : "none"; // Hide if empty
}
