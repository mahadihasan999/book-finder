

const searchBook = () => {

    //function calling
    displaySpinner('block')
    displayResult('none')
    displayError1('none')
    displayError2('none')
    totalReusltFound('none')
    displayError3('block')

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';

    //Error handing check
    if (searchText === '') {
        displayError1('block')
        displaySpinner('none')
        totalReusltFound('none')
        displaySearchResult('none')
    }
    else {
        // load data
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        // json convert
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs.slice(0, 50)))
    }
}




// display search
const displaySearchResult = docs => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    //error handing
    if (docs.length === 0) {
        displayError2('block')
        displaySpinner('none')
        displayError3('none')
    }



    //using forEach to check every single data
    docs.forEach(doc => {
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
        <div class="card h-100" style="box-shadow: 0 5px 5px gray">
            <div class="card-body">
                  <img height="200px" width= "100" src="https://covers.openlibrary.org/b/id/${doc?.cover_i}-M.jpg" alt="Cover image" class="card-img-top">

                 <h6 class="card-title">Book Name: ${doc.title}</h6>

                 <h6 class="card-title">Author Name: ${doc?.author_name}</h6>
                 <p class="card-text">First Publish Year: ${doc?.first_publish_year}</p>
                 <p class="card-text">Publisher: ${doc?.publisher}</p>
            </div >
        </div >`;

        // appenchild in searchReuslt from div
        searchResult.appendChild(div);

        // find length of display reuslt
        const findLength = docs.length;
        const totalResultFound = document.getElementById('total-book-found');
        totalResultFound.innerText = findLength;

    })

    //function calling
    displaySpinner('none')
    displayResult('block')
    totalReusltFound('block')

}

// Create Arroy function
const displaySpinner = toggleSpinner => {
    document.getElementById('spinner').style.display = toggleSpinner;
}
const displayResult = showResult => {
    document.getElementById('search-result').style.display = showResult;
}
const totalReusltFound = foundResult => {
    document.getElementById('display-total').style.display = foundResult;
}
const displayError1 = foundError1 => {
    document.getElementById('error-message1').style.display = foundError1;
}
const displayError2 = foundError2 => {
    document.getElementById('error-message2').style.display = foundError2;
}
const displayError3 = foundError3 => {
    document.getElementById('total-book-found').style.display = foundError3;
}
