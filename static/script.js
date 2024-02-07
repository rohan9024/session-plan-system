

function updateFileNames() {
            const fileInput = document.getElementById('wordFileInput1');
            const fileInputLabel = document.getElementById('fileInputLabel1');
            
            if (fileInput.files.length > 0) {
                fileInputLabel.textContent = fileInput.files[0].name;
            } else {
                fileInputLabel.textContent = 'Choose File';
            }
        }

function readWordDocuments() {
    var input = document.getElementById('wordFileInput1');
    var output = document.getElementById('documentContent1');
    if (input.files.length > 0) {
        var file = input.files[0];
        if (file) {
            var formData = new FormData();
            formData.append('file', file);
            fetch('/process_A', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                
                const mergedTable = document.createElement('table');
                
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                const extractedTables = tempDiv.querySelectorAll('table');
                
                extractedTables.forEach(table => {
                    const newTable = document.importNode(table, true);
                    mergedTable.appendChild(newTable);
                });
                
                output.innerHTML = '';
                output.appendChild(mergedTable);
            })
            .catch(error => {
                output.innerHTML = 'Error: ' + error.message;
            });
        } else {
            output.innerText = 'Failed to read the file.';
        }
    } else {
        output.innerText = 'Please select a Word document.';
    }
}






function toggleOutcomeTableVisibility() {
                        var tableContainer = document.getElementById('courseOutcomesContainer');
                        tableContainer.style.display = tableContainer.style.display === 'none' ? 'block' : 'none';
                    }



function toggleOutcomes() {
        var outcomesContainer = document.querySelector('.outcomes-container');
        var outcomesText = document.getElementById('outcomesText');
        var hasInputs = outcomesContainer.querySelector('input[type="text"]');
        outcomesText.style.display = hasInputs ? 'none' : 'block';
        outcomesContainer.classList.toggle('show');
        outcomesContainer.style.display = outcomesContainer.classList.contains('show') ? 'block' : 'none';
    }








function addOutcome() {

        var outcomesContainer = document.querySelector('.outcomes-container');
        var outcomesText = document.getElementById('outcomesText');
        var printButton = document.querySelector('.print-button');

        var currentScrollTop = window.scrollY || document.documentElement.scrollTop;


        if (!outcomesContainer.classList.contains('show')) {
            toggleOutcomes();
        }


        var newRow = document.createElement('div');
        newRow.classList.add('form-row', 'mt-2');

        var input1 = document.createElement('div');
        input1.classList.add('form-group', 'col-10');
        input1.innerHTML = '<input type="text" class="form-control course-input" placeholder="Outcome Description">';

        var input2 = document.createElement('div');
        input2.classList.add('form-group', 'col-2');
        input2.innerHTML = '<input type="text" class="form-control level-input" placeholder="Outcome Assessment">';

        newRow.appendChild(input1);
        newRow.appendChild(input2);

        outcomesContainer.appendChild(newRow);

        printButton.style.display = 'block';

        toggleOutcomes();

        outcomesContainer.lastElementChild.lastElementChild.querySelector('input').focus();

        setTimeout(function () {
            window.scrollTo(0, currentScrollTop);
        }, 0);

    }



function collectAndStoreOutcomes() {
    var allOutcomes = [];
    var evenIndexOutcomes = [];

    var outcomeInputs = document.querySelectorAll('.outcomes-container input[type="text"]');

    outcomeInputs.forEach(function (input, index) {
        allOutcomes.push(input.value);

        if (index % 2 === 0) {
            evenIndexOutcomes.push(input.value);
        }
    });

    createOutcomeTable(evenIndexOutcomes);

    console.log('All Outcomes:', allOutcomes);
    console.log('Even Index Outcomes:', evenIndexOutcomes);

    return allOutcomes;
}




    function printOutcomes() {
        collectAndStoreOutcomes();
    }


















    function collectAndStoreInputs() {
        var inputValues = {
            input1: document.getElementById('input1').value,
            input2: document.getElementById('input2').value,
            input3: document.getElementById('input3').value,
            input4: document.getElementById('input4').value,
            input5: document.getElementById('input5').value,
            input6: document.getElementById('input6').value,
            input7: document.getElementById('input7').value,
            input8: document.getElementById('input8').value,
            input9: document.getElementById('input9').value,
            input10: document.getElementById('input10').value,
        };
        console.log(inputValues);
    }

    function toggleInputs() {
        const content = document.querySelector('.collapsible-content');
        content.classList.toggle('show');
    }

    function toggleCourseOutcomes() {
        var courseOutcomesContainer = document.querySelector('.new-course-outcomes-container');
        courseOutcomesContainer.classList.toggle('show');
    }

    function toggleOutcomes() {
        var outcomesContainer = document.querySelector('.outcomes-container');
        var outcomesText = document.getElementById('outcomesText');
        var hasInputs = outcomesContainer.querySelector('input[type="text"]');
        outcomesText.style.display = hasInputs ? 'none' : 'block';
        outcomesContainer.classList.toggle('show');
        outcomesContainer.style.display = outcomesContainer.classList.contains('show') ? 'block' : 'none';
    }




    function updateExcelFileName() {
        const excelFileInput = document.getElementById('excelFileInput');
        const fileLabel = document.getElementById('fileLabel');
        
        if (excelFileInput.files.length > 0) {
            fileLabel.textContent = excelFileInput.files[0].name;
        } else {
            fileLabel.textContent = 'Choose File';
        }
    }

    function updateFileName() {
       const fileInput = document.getElementById('wordFileInput');
       const fileInputLabel = document.getElementById('fileInputLabel');
       
       if (fileInput.files.length > 0) {
           fileInputLabel.textContent = fileInput.files[0].name;
       } else {
           fileInputLabel.textContent = 'Choose File';
       }
   }


    function readWordDocument() {
        var input = document.getElementById('wordFileInput');
        var output = document.getElementById('documentContent');
        if (input.files.length > 0) {
            var file = input.files[0];
            if (file) {
                var formData = new FormData();
                formData.append('file', file);
                fetch('/process', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    output.innerHTML = data;
                    output.classList.add('file-selected');
                })
                .catch(error => {
                    output.innerHTML = 'Error: ' + error.message;
                });
            } else {
                output.innerText = 'Failed to read the file.';
            }
        } else {
            output.innerText = 'Please select a Word document.';
        }
    }

    function searchTable() {
        var searchTerm = document.getElementById('searchTerm').value.toUpperCase();
        var table = document.getElementById('resultTable');
        var rows = table.getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {  
            var cells = rows[i].getElementsByTagName('td');
            var found = false;
            for (var j = 0; j < cells.length; j++) {
                var cellText = cells[j].innerText.toUpperCase();
                if (wholeWordSearch(cellText, searchTerm) && !hasWordInParentheses(cellText, searchTerm)) {
                    found = true;
                    break;
                }
            }
            rows[i].style.display = found ? '' : 'none';
        }
    }

    function wholeWordSearch(text, term) {
        var words = text.split(/\s+/);
        return words.includes(term);
    }

    function hasWordInParentheses(text, term) {
        var regex = new RegExp("\\b" + term + "\\b\\s*\\(\\s*[A-Za-z]\\d\\s*\\)", "i");
        return regex.test(text);
    }

        var resultVisible = false;






























const ignoreDatesArray = [
    //please write dates in the 'MM-DD-YYYY' format
    '1-26-2024',
    '2-19-2024',
    '3-8-2024',
    '3-25-2024',
    '3-29-2024',
    '4-9-2024',
    '4-11-2024',
    '4-17-2024',
    '5-1-2024',
    '5-23-2024',
    '6-17-2024',
    '7-17-2024',
    '8-15-2024',
    '9-7-2024',
    '9-16-2024',
    '10-2-2024',
    '10-12-2024',
    '11-1-2024',
    '11-2-2024',
    '11-15-2024',
    '12-25-2024',
    
];


















function printDates() {
    var resultDiv = document.getElementById('result');

    if (!resultVisible) {
        resultDiv.style.display = 'block';
        resultVisible = true;
    }

    resultDiv.innerHTML = "";

    var startDateInput = document.getElementById("startDate");
    var endDateInput = document.getElementById("endDate");
    var ignoreDatesInput = document.getElementById("ignoreDates");
    var resultContainer = document.getElementById("result");

    var startDate = new Date(startDateInput.value);
    var endDate = new Date(endDateInput.value);
    var ignoreDates = parseIgnoreDates(ignoreDatesInput.value);

    ignoreDates = ignoreDates.concat(ignoreDatesArray.map(dateString => new Date(dateString)));

    // ...
    console.log("Ignore Dates:", ignoreDates);
    // ...

    if (startDate <= endDate) {
        var dates = [];
        var currentDate = startDate;

        var searchTerm = document.getElementById('searchTerm').value.toUpperCase();
        var table = document.getElementById('resultTable');
        var rows = table.getElementsByTagName('tr');
        var printedColumns = [];

        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName('td');
            for (var j = 0; j < cells.length; j++) {
                var cellText = cells[j].innerText.toUpperCase();
                if (wholeWordSearch(cellText, searchTerm) && !hasWordInParentheses(cellText, searchTerm)) {
                    printedColumns.push(cells[0].innerText);
                    break;
                }
            }
        }

        while (currentDate <= endDate) {
            var formattedDate = currentDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
            var shouldIgnoreDate = ignoreDates.some(ignoreDate => isSameDay(ignoreDate, currentDate));

            if (
                !shouldIgnoreDate &&
                printedColumns.some(column => formattedDate.toLowerCase().includes(column.toLowerCase()))
            ) {
                dates.push(formattedDate);
                if (dates.length >= 39) {
                    break;
                }
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }
        resultContainer.innerHTML = "<ul><li>" + dates.join("</li><li>") + "</li></ul>";
    } else {
        resultContainer.innerHTML = "<p>Error: 'Start' date should be before or equal to 'End' date.</p>";
    }
}

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

function parseIgnoreDates(input) {
    return input.split(',').map(dateString => {
        const [day, month, year] = dateString.trim().split('-');
        return new Date(year, month - 1, day);
    });
}











        async function updateAndDownload() {var startDateInput = document.getElementById('startDate');
          var endDateInput = document.getElementById('endDate');
          var excelFileInput = document.getElementById('excelFile');
          var resultDiv = document.getElementById('result');

          var startDate = new Date(startDateInput.value);
          var endDate = new Date(endDateInput.value);

          if (startDate > endDate) {
            resultDiv.innerHTML = '<p>End date must be equal to or after the start date.</p>';
            return;
          }

          var file = excelFileInput.files[0];

          if (!file) {
            resultDiv.innerHTML = '<p>Please upload an Excel file.</p>';
            return;
          }

          try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(file);
            const sheet = workbook.getWorksheet(1);


            var dates = getDates(startDate, endDate);
            var listItemNodes = resultDiv.querySelectorAll('li');
            var contentItems = Array.from(listItemNodes).map(item => item.textContent.trim());

            for (var index = 0; index < Math.min(dates.length, contentItems.length, 39); index++) {
              var rowIndex = index + 8;
              var cellRef = 'C' + rowIndex; 
              var cell = sheet.getCell(cellRef);
              var content = contentItems[index];
              cell.value = content;
              cell.numFmt = 'General';
            }


             
          } catch (error) {
            console.error('Error processing file:', error);
          }


    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const sheet = workbook.getWorksheet(1);






        //documentContent1
        const tableRows1 = document.getElementById('documentContent1').querySelectorAll('tr');
        const startRow1 = 8;
        const startColumn1 = 'D';

        for (let rowIndex1 = 0; rowIndex1 < tableRows1.length; rowIndex1++) {
            const row1 = tableRows1[rowIndex1];
            const cells1 = row1.querySelectorAll('td, th');
            for (let cellIndex1 = 0; cellIndex1 < cells1.length; cellIndex1++) {
                const cell1 = cells1[cellIndex1];
                const excelCell = sheet.getCell(`${String.fromCharCode(startColumn1.charCodeAt(0) + cellIndex1)}${startRow1 + rowIndex1}`);
                const cellValue = cell1.innerText.trim();
                if (cellValue !== "") {
                    excelCell.value = cellValue;
                }
            }
        }






        //courseOutcomesContainer
        const courseOutcomesContainer = document.getElementById('courseOutcomesContainer');
        const tableRows = courseOutcomesContainer.querySelectorAll('table tr:not(:first-child)'); 
        const startRow = 34;
        const startColumn = 'H';

        tableRows.forEach((row, rowIndex) => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, cellIndex) => {
                const inputField = cell.querySelector('input');
                const cellValue = inputField ? inputField.value.trim() : cell.innerText.trim();
                sheet.getCell(`${String.fromCharCode(startColumn.charCodeAt(0) + cellIndex)}${startRow + rowIndex}`).value = cellValue;
            });
        });


        //result
        const resultContent = document.getElementById('result').innerText.trim();
        const resultRows = resultContent.split('\n');
        for (let i = 0; i < resultRows.length; i++) {
            sheet.getCell(`C${8 + i}`).value = resultRows[i];
        }



        


        //course plan
        const inputFields = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6', 'input7', 'input8', 'input9', 'input10'];
        const labels = ['Semester', 'Year', 'Course Title', 'Course Code', 'Total Contact Hours', 'Duration of TEE', 'TEE Marks', 'IA Marks', 'Subject In-charge', 'Course Coordinator'];

        for (let i = 0; i < inputFields.length; i++) {
            const inputId = inputFields[i];
            const row = 9 + Math.floor(i / 2);  
            const col = i % 2 === 0 ? 'H' : 'N';  
            let valueToPrint = "";
            if (labels[i]) {
                valueToPrint = `${labels[i]}: ${document.getElementById(inputId).value}`;
            } else {
                valueToPrint = document.getElementById(inputId).value;
            }
            sheet.getCell(`${col}${row}`).value = valueToPrint;
        }




        // allOutcomes 
        const allOutcomes = collectAndStoreOutcomes() || [];

        for (let i = 0; i < allOutcomes.length; i += 2) {
            const colI = 'I';
            const colR = 'R';
            const colH = 'H';
            const row = 19 + i / 2 + 1;  

            
            sheet.getCell(`${colH}${row}`).value = i / 2 + 1;

            
            sheet.getCell(`${colI}${row}`).value = allOutcomes[i];
            sheet.getCell(`${colR}${row}`).value = allOutcomes[i + 1] || '';  
        }




        // Save the workbook and trigger download
        const updatedData = await workbook.xlsx.writeBuffer();
        const blob = new Blob([updatedData], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        var searchTerm = document.getElementById('searchTerm').value;
        a.href = url;
        a.download = searchTerm + '_session_plan.xlsx';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}




        function getDates(startDate, endDate) {
          var dates = [];
          var currentDate = startDate;

          while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }

          return dates;
        }



