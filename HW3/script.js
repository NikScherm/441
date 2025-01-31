
var storyPage= 0; //for now I will use var

function option(optionNumber){
    let textDiv = document.getElementById('text'); //gets the text div
    let buttonsDiv = document.getElementById('buttons'); //gets the story div


    if (storyPage === 0) {
        textDiv.innerHTML = "";
        //storyDiv.innerHTML = "<p id='text'> </p>";

        if (optionNumber === 'one'){
            textDiv.innerHTML = "you are now on path one. What next ?";
            buttonsDiv.innerHTML =
            `
            <button onclick="option ('one:one')" > Chose option 1</button>
            <button onclick="option ('one:two')" > Chose option 2</button>
            <button onclick="option ('one:three')" > Chose option 3</button>
            `;
        }else if(optionNumber === 'two'){
            textDiv.innerHTML = "you are now on path two. What next ?";
            buttonsDiv.innerHTML =
            `
            <button onclick="option ('two:one')" > Chose option 1</button>
            <button onclick="option ('two:two')" > Chose option 2</button>
            <button onclick="option ('two:three')" > Chose option 3</button>
            `;

        }else if(optionNumber === 'three'){
            textDiv.innerHTML = "you are now on path two. What next ?";
            buttonsDiv.innerHTML =
            `
            <button onclick="option ('three:one')" > Chose option 1</button>
            <button onclick="option ('three:two')" > Chose option 2</button>
            <button onclick="option ('three:three')" > Chose option 3</button>
            `;

        }


        storyPage++;


    }else if (storyPage === 1 ){

        textDiv.innerHTML = "";

        text.innerText = "testing";
        buttonsDiv.innerHTML ="";
        

    }



}

