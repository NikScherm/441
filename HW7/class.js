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
    } while (randomIndex === previousIndex); //loops until index is changed

    previousIndex = randomIndex;



    let selectedView = viewMasterCollection[randomIndex];
    document.getElementById("title").innerText = selectedView.title;
    document.getElementById("image").src = selectedView.image;
    document.getElementById("image").style.display = "block";
    document.getElementById("description").innerText = selectedView.description;
    document.getElementById("author").innerText = selectedView.author;
    document.getElementById("year").innerText = selectedView.imageYear;
}