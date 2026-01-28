let expense=[];
function addData(date,description,type,amount){
    expense.push({
        date:document.getElementById("date").value,
        description:document.getElementById("description").value,
        type:document.getElementById("category").value,
        amount:Number(document.getElementById("amount").value)
    });
    renderTable();
}
function renderTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // clear old rows

    expense.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.description}</td>
            <td>${item.type}</td>
            <td>${item.amount}</td>
        `;

        tableBody.appendChild(row);
    });
}
