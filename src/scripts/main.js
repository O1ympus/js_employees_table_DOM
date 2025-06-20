'use strict';

const body = document.querySelector('body');
const table = document.querySelector('table');
const tBody = document.querySelector('tbody');

const rows = [...tBody.rows];

const isAscending = {
  0: -1,
  1: -1,
  2: -1,
  3: -1,
  4: -1,
};

// 111111111111

table.addEventListener('click', (e) => {
  const th = e.target.closest('th');

  if (!th) {
    return;
  }

  const indexTh = [...th.parentNode.children].indexOf(th);

  isAscending[indexTh] = -isAscending[indexTh];

  for (const key in isAscending) {
    if (+key !== indexTh) {
      isAscending[key] = 1;
    }
  }

  if (indexTh < 3) {
    rows.sort((a, b) => {
      const cell1 = a.children[indexTh].textContent;
      const cell2 = b.children[indexTh].textContent;

      return cell1.localeCompare(cell2) * isAscending[indexTh];
    });
  } else if (indexTh === 3) {
    rows.sort((a, b) => {
      const cell1 = +a.children[indexTh].textContent;
      const cell2 = +b.children[indexTh].textContent;

      return (cell1 - cell2) * isAscending[indexTh];
    });
  } else {
    rows.sort((a, b) => {
      const cell1 = +a.children[indexTh].textContent.replace(/[$,]/g, '');
      const cell2 = +b.children[indexTh].textContent.replace(/[$,]/g, '');

      return (cell1 - cell2) * isAscending[indexTh];
    });
  }

  for (const row of rows) {
    tBody.appendChild(row);
  }
});

// 2222222222222

table.addEventListener('click', (e) => {
  const tr = e.target.closest('tr');

  if (!tr) {
    return;
  }

  rows.forEach((row) => {
    if (row.classList.contains('active')) {
      row.classList.remove('active');
    }
  });

  tr.classList.add('active');
});

// 33333333333333

const form = document.createElement('form');

form.className = 'new-employee-form';

const fields = ['name', 'position', 'age', 'salary'];

fields.forEach((field) => {
  const label = document.createElement('label');

  label.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)}: `;

  const input = document.createElement('input');

  input.setAttribute('name', field);
  input.setAttribute('data-qa', field);

  label.appendChild(input);

  form.appendChild(label);
});

form.children[0].querySelector('input').setAttribute('type', 'text');
form.children[1].querySelector('input').setAttribute('type', 'text');
form.children[2].querySelector('input').setAttribute('type', 'number');
form.children[3].querySelector('input').setAttribute('type', 'number');

const officeLabel = document.createElement('label');

officeLabel.textContent = 'Office: ';

const select = document.createElement('select');
const options = [
  'Tokyo',
  'Singapore',
  'London',
  'New York',
  'Edinburgh',
  'San Francisco',
];

select.setAttribute('name', 'office');
select.setAttribute('data-qa', 'office');

options.forEach((optionName) => {
  const option = document.createElement('option');

  option.textContent = optionName;
  option.setAttribute('value', optionName);

  select.appendChild(option);
});

officeLabel.appendChild(select);

form.insertBefore(officeLabel, form.children[2]);

const button = document.createElement('button');

button.textContent = 'Save to table';
button.setAttribute('type', 'submit');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  document.querySelector('[data-qa="notification"]')?.remove();

  const nameInput = document.querySelector('[data-qa="name"]');
  const positionInput = document.querySelector('[data-qa="position"]');
  const officeInput = document.querySelector('[data-qa="office"]');
  const ageInput = document.querySelector('[data-qa="age"]');
  const salaryInput = document.querySelector('[data-qa="salary"]');

  const uName = nameInput.value.trim();
  const position = positionInput.value.trim();
  const office = officeInput.value;
  const age = +ageInput.value;
  const salary = +salaryInput.value;

  const tr = document.createElement('tr');
  const allFields = [
    uName,
    position,
    office,
    age,
    `$${salary.toLocaleString('en-US')}`,
  ];
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');

  if (!uName || uName.length < 4) {
    notification.className = 'error';

    notification.textContent = 'Name must be at least 4 characters long.';
    body.appendChild(notification);

    return;
  }

  if (!position || position.length < 2) {
    notification.className = 'error';

    notification.textContent = 'Position must be at least 2 characters.';
    body.appendChild(notification);

    return;
  }

  if (isNaN(age) || age < 18 || age > 90) {
    notification.className = 'error';

    notification.textContent = 'Age must be between 18 and 90.';
    body.appendChild(notification);

    return;
  }

  allFields.forEach((field) => {
    const td = document.createElement('td');

    td.textContent = field;
    tr.appendChild(td);
  });

  notification.className = 'success';
  notification.textContent = 'Employee successfully added!';
  body.appendChild(notification);

  tBody.appendChild(tr);

  form.reset();
});

form.appendChild(button);

body.appendChild(form);
