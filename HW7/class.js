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
        "Migrant mother",
        "imgs/Lange-MigrantMother.jpg",
        "Taken during the Great Depression, this photograph of Florence Owens Thompson, a migrant mother, shows the struggles of poverty, oppression, and survival. It became an enduring symbol of the human cost of economic injustice and poverty in America.",
        "Dorothea Lange",
        1936
    ),
    new ViewMaster(
        "I am a man",
        "imgs/IAmAMan.jpg",
        "In 1787 English potter Josiah Wedgewood created an anti-slavery medallion which bore the phrase “Am I not a man and a brother?” In March 1968, striking Black sanitation workers in Memphis inverted that phrase, declaring instead of asking: “I am a Man.” Their version became a modern rallying cry for equal treatment.",
        "Ernest Withers",
        1968
    ),
    new ViewMaster(
        "Salt march",
        "imgs/salt-march.jpg",
        "The Salt march, also known as the Salt Act, Dandi March, and the Dandi march, was an act of nonviolent civil disobedience in colonial India, led by Mahatma Gandhi. The 24-day march lasted from 12 March 1930 to 6 April 1930 as a direct action campaign of tax resistance and nonviolent protest against the British salt monopoly",
        "Unknown",
        1930
    ),
    new ViewMaster(
        "Nelson Mandela, free",
        "imgs/nelson-mandela-free.jpg",
        "This image captures the moment when Nelson Mandela was released from Robben Island prison in 1990 after 27 years of incarceration under the apartheid regime. His release symbolized the global victory over apartheid and the beginning of racial justice in South Africa.",
        "Allan Tannenbaum",
        1990
    ),
    new ViewMaster(
        "Protests in Hong Kong",
        "imgs/umbrella.jpg",
        "A large group of protesters is marching through the streets of Hong Kong, each person holding an umbrella, with a sea of yellow and other colors. The umbrellas become a collective sign of solidarity in the fight against Beijing's influence over Hong Kong's political system. This image represents the democratic aspirations of the Hong Kong people.",
        "Kin Cheung/AP",
        2014
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
