const form = document.getElementById('form')


/*fetch("http://localhost:3000/recipe")
    .then((res) => res.json())
    .then((data) => {
        let tableData = "";
        data.map((values) => {
            tableData = `<h1>${values.title}</h1>`;
        });
        document.getElementById("table_body").innerHTML = tableData;
});
*/

fetch("http://localhost:9000/recipe")
    .then((data) => {
        return data.json();
    }).then((objectData) => {
        let tableData = "";
        objectData.map((values) => {
            tableData+= `
            <tr>
            <td>${values.id}</td>
            <td>${values.dish}</td>
            <td>${values.ingredients}</td>
            <td>${values.instructions}</td>
            </tr> 
        `;
        });
        document.getElementById("table_body").innerHTML = tableData;
});




form.addEventListener('submit', (event)=> {
    event.preventDefault()

    const data = new FormData(event.target)

    const newRecipe = { dish:data.get('dish'), ingredients:data.get('ingredients'), instructions:data.get('instructions') }
    console.log(newRecipe);

    fetch("http://localhost:9000/recipe", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
    });
});







