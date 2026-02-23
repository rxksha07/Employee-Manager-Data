let employees = [];

// ADD EMPLOYEE
document.getElementById("empForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let salary = Number(document.getElementById("salary").value);
    let department = document.getElementById("department").value.trim();

    if(name === "" || salary === 0 || department === ""){
        alert("Fill all fields");
        return;
    }

    let emp = {
        name,
        salary,
        department
    };

    // JSON
    let jsonData = JSON.stringify(emp);
    let parsedData = JSON.parse(jsonData);

    employees.push(parsedData); // PUSH

    alert("Employee Added");
});

// SHOW EMPLOYEES (Arrow Function)
const showEmployees = () => {

    let output = "";

    // FOR LOOP
    for(let i=0; i<employees.length; i++){
        console.log("Loop index:", i);
    }

    // FOR OF LOOP
    for(let emp of employees){

        // DESTRUCTURING
        let {name, salary, department} = emp;

        // CONDITION
        let status = salary > 30000 ? "High Salary" : "Low Salary";

        output += `
        Name: ${name.toUpperCase()} |
        Salary: ${salary} |
        Dept: ${department} |
        <span class="${salary>30000?'high':'low'}">${status}</span>
        <br><br>
        `;
    }

    // MAP
    let salaries = employees.map(e => e.salary);

    // FILTER
    let highSalary = employees.filter(e => e.salary > 30000);
    console.log("High Salary Employees:", highSalary);

    // REDUCE
    let total = salaries.reduce((sum, val) => sum + val, 0);

    document.getElementById("output").innerHTML =
        output + `<br>Total Salary: ${total}`;
};

// DELETE LAST (POP)
function deleteLast(){
    employees.pop();
    showEmployees();
}

// DELETE FIRST (SHIFT)
function deleteFirst(){
    employees.shift();
    showEmployees();
}

// SHOW AVERAGE
function showAverage(){

    let total = employees.reduce((sum, e) => sum + e.salary, 0);
    let avg = employees.length ? total / employees.length : 0;

    document.getElementById("output").innerHTML =
        `Average Salary: ${avg}`;
}

// SPREAD
let copyEmployees = [...employees];

// REST
function sumSalaries(...nums){
    return nums.reduce((a,b)=>a+b);
}

// PROMISE (Fake Loading with Reject)
function fakeLoading(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("Loading Done");
        },2000);
    });
}

// AJAX
function loadAPI(){

    document.getElementById("output").innerHTML="Loading...";

    fakeLoading().then(()=>{

        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res=>res.json())
        .then(data=>{

            let text="";
            data.slice(0,3).forEach(user=>{
                text += `API Employee: ${user.name}<br>`;
            });

            document.getElementById("output").innerHTML=text;
        });

    });
}