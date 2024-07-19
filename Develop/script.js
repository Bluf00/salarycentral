// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Function to add a new row for employee input
const addEmployeeRow = function() {
  const employeeTable = document.querySelector('#employee-table');
  const newRow = document.createElement('tr');
  newRow.classList.add('employee-row');
  newRow.innerHTML = `
    <td><input type="text" class="employee-name" placeholder="First Name"></td>
    <td><input type="text" class="employee-lastname" placeholder="Last Name"></td>
    <td><input type="number" class="employee-salary" placeholder="Salary"></td>
  `;
  employeeTable.appendChild(newRow);
}

// Collect employee data
const collectEmployees = function() {
  const employees = [];
  
  // Collect data from all rows
  const employeeRows = document.querySelectorAll('.employee-row');
  employeeRows.forEach(row => {
    const name = row.querySelector('.employee-name').value;
    const lastName = row.querySelector('.employee-lastname').value;
    const salary = parseFloat(row.querySelector('.employee-salary').value);
    
    if (name && lastName && !isNaN(salary)) {
      employees.push({ name: name, lastName: lastName, salary: salary });
    }
  });
  
  return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  if (employeesArray.length === 0) return;

  const totalSalary = employeesArray.reduce((total, employee) => total + employee.salary, 0);
  const averageSalary = totalSalary / employeesArray.length;
  
  // Assuming you have an element with the ID 'average-salary' to display the result
  const averageSalaryElement = document.querySelector('#average-salary');
  averageSalaryElement.textContent = `Average Salary: $${averageSalary.toFixed(2)}`;
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  if (employeesArray.length === 0) return;

  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];
  
  // Assuming you have an element with the ID 'random-employee' to display the result
  const randomEmployeeElement = document.querySelector('#random-employee');
  randomEmployeeElement.textContent = `Random Employee: ${randomEmployee.name} ${randomEmployee.lastName}, Salary: $${randomEmployee.salary}`;
}

// Function to handle adding employees
const handleAddEmployees = function() {
  const employees = collectEmployees();
  displayAverageSalary(employees);
  getRandomEmployee(employees);

  // Ask the user if they want to add another employee
  const addMore = confirm('Do you want to add another employee?');
  if (addMore) {
    addEmployeeRow();
  }
}

// Hook up the button
addEmployeesBtn.addEventListener('click', handleAddEmployees);
