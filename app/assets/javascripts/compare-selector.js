// This script will monitor for changes in the option chosen in a select box and update
// a table with the corresponding new data

const qualsDataLocation = '/getdata/quals';
var qualsJSON;

window.GOVUKPrototypeKit.documentReady(() => {
  // Load quals data
  getJSON(qualsDataLocation);
})
  
document.getElementById("comp1").onchange = changeComp1;
document.getElementById("comp2").onchange = changeComp2;

const colNames = [
  'title',
  'qan',
  'org_full',
  'org_acro',
  'level',
  'sub_level',
  'eqf',
  'type',
  'fees',
  'credits',
  'ssa',
  'status',
  'reg_start',
  'start',
  'end',
  'end_cert',
  'glh_min',
  'glh_max',
  'glh',
  'tqt',
  'nations',
  'grading',
  'assessment_method',
  'discount',
  'size_gce',
  'size_gcse',
  'efd',
  'scale',
  'specialisms',
  'pathways',
  'del_funded',
  'spec',
  'ccea_reg',
  'intl'
];

const jsonMap = {
  'title': 'QualificationTitle',
  'org_full': 'OwnerOrganisationName',
  'org_acro': 'OwnerOrganisationAcronym',
  'level': 'QualificationLevel',
  'sub_level': 'QualificationSubLevel',
  'eqf': 'EQFLevel',
  'type': 'QualificationType',
  'fees': 'Fees',
  'credits': 'TotalCredits',
  'ssa': 'QualificationSSA',
  'status': 'QualificationStatus',
  'reg_start': 'RegulationStartDate',
  'start': 'OperationalStartDate',
  'end': 'OperationalEndDate',
  'end_cert': 'CertificationEndDate',
  'glh_min': 'MinimumGuidedLearningHours',
  'glh_max': 'MaximumGuidedLearningHours',
  'glh': 'GuidedLearningHours',
  'tqt': 'TotalQualificationTime',
  'nations': 'OfferedIn',
  'grading': 'OverallGradingType',
  'assessment_method': 'AssessmentMethods',
  'discount': 'NIDiscountCode',
  'size_gce': 'GCESizeEquivalent',
  'size_gcse': 'GCSESizeEquivalent',
  'efd': 'EntitlementFrameworkDesignation',
  'scale': 'GradingScale',
  'specialisms': 'Specialisms',
  'pathways': 'Pathways',
  'del_funded': 'ApprovedForDELFundedProgramme',
  'spec': 'LinkToSpecification',
  'ccea_reg': 'CCEARegulation',
  'intl': 'OfferedInternationally'
};

async function getJSON(url){
  //console.log('[[getJSON]]');
  const response = await fetch(url);
  const data = await response.json();
  //console.log('Look! JSON! %o', data);
  loadJSON(data);
}

function loadJSON(data){
  //console.log('[[loadJSON]]');
  qualsJSON = data;
  //console.log("JSON: %o", qualsJSON);
}

//function getJSON(url){
//  fetch(url)
//  .then(res => res.json())
//  .then(out =>
//    function(out){return out;}
//  .catch(err => { throw err });
//}

function changeComp1(){
  //console.log('[[changeComp1]]');
  // This is the new selected value
  var value = this.value;
  //console.log('Comp1 value: ' + value);

  // Disable the option in the other list
  ofqDisableList('l',value);
  // Update table
  ofqUpdateColumn({'cols': colNames, 'column': 'l', 'key': value});
}

function changeComp2(){
  //console.log('[[changeComp2]]');
  // This is the new selected value
  var value = this.value;
  //console.log('Comp2 value: ' + value);

  // Disable the option in the other list
  ofqDisableList('r',value);
  // Update table
  ofqUpdateColumn({'cols': colNames, 'column': 'r', 'key': value});

}

function ofqDisableList(column,value)
{
  //console.log('[[ofqDisableList]]');
  var selectQuery = '';
  
  if (column === 'l')
  {
    selectQuery = '#comp2 option';
  } else {
    selectQuery = '#comp1 option';
  }
  document.querySelectorAll(selectQuery).forEach(opt => {
    if (opt.value == value)
    {
      opt.disabled=true;
    } else {
      opt.disabled = false;
    }
  });
}

// Updates one side of the qualifications table
// argument accepts a dict consisting of 3 keys:
// cols: []     // An array containing the names of the column headings to update
// column: ''   // String consisting of 'l' or 'r' to indicate which column to update
// key: ''      // String containing the value of the selected option for which we use as a key to the data
function ofqUpdateColumn(opts)
{
  //console.log('[[ofqUpdateColumn]]');
  const cols = opts['cols'];
  const column = opts['column'];
  const key = opts['key'];

  var selectQuery = '';
  var oppositeQuery = '';
  var output = '';

  for (let i = 0; i < cols.length; i++)
  {
    //console.log('Property: ' + cols[i]);
    ofqUpdateCell(column,key,cols[i]);
  }
}

function ofqUpdateCell(column,key,cell)
{
  //console.log('[[ofqUpdateCell]]');
  // Gather all the cells for our side of the table and the opposite
  var selectQuery = '';
  var oppositeQuery = '';
  let jsonValue = '';

  //console.log('Column: '+column);
  //console.log('Key: '+key);
  //console.log('Cell: '+cell);
  //console.log('JSON for key: %o',qualsJSON[key]);

  if (isDefined(qualsJSON[key][jsonMap[cell]])){
    // Values for some cells require special treatment and processing
    switch(cell) {
      case 'reg_start':
      case 'start':
      case 'end':
      case 'end_cert':
        // These cells all contain dates and need the date parsing
        jsonValue = ofqDateParse(qualsJSON[key][jsonMap[cell]]);
        break;
        
      case 'grading':
      case 'assessment_method':
      case 'scale': 
      case 'nations':
        // These columns all might have | separated lists and need processing
        jsonValue = ofqRemovePipe(qualsJSON[key][jsonMap[cell]]);
        break;

      case 'ccea_reg':
      case 'intl':
        // These columns all might have true/false values that need translating
        jsonValue = ofqTrueFalse(qualsJSON[key][jsonMap[cell]]);
        break;

      case 'fees':
        // We need to add the currency symbol
        jsonValue = '£'+qualsJSON[key][jsonMap[cell]];
        break;

      default:
        // No special processing for the rest, and pull the value from the data structure
        jsonValue = qualsJSON[key][jsonMap[cell]];
    }
  } else if (cell == 'qan') {
    jsonValue = key;
  } else {
    // We don't like values saying 'undefined'
    if (isEmpty(jsonValue))
    {
      jsonValue = '';
    }
  }

  if (column === 'l')
  {
    selectQuery = '.ofq-qual-table-cell-l.ofq-qual-table-'+cell;
    oppositeQuery = '.ofq-qual-table-cell-r.ofq-qual-table-'+cell;
  } else {
    selectQuery = '.ofq-qual-table-cell-r.ofq-qual-table-'+cell;
    oppositeQuery = '.ofq-qual-table-cell-l.ofq-qual-table-'+cell;
  }

  selectCell = document.querySelector(selectQuery);
  oppositeCell = document.querySelector(oppositeQuery);

  //console.log('Selected from JSON, '+key+': %o',jsonValue);
  //console.log("Selected: %o",selectCell);
  //console.log("Opposite: %o",oppositeCell);

  if (ofqHighlightDifference(jsonValue,selectCell,oppositeCell)){
    selectCell.innerHTML = '<mark class="ofq-highlight">'+jsonValue+'</mark>';
    oppositeCell.innerHTML = '<mark class="ofq-highlight">'+oppositeCell.innerText+'</mark>';
  } else {
    selectCell.innerHTML = jsonValue;
    oppositeCell.innerHTML = oppositeCell.innerText;
  }

  if (cell == 'title')
  {
    // If the cell is 'title' then we don't want it highlighting ever
    selectCell.innerHTML = jsonValue;
    oppositeCell.innerHTML = oppositeCell.innerText;
  }
}

function ofqUpdateQan(column,value)
{
  //console.log('[[ofqUpdateQan]]');
  // Gather all the cells for our side of the table and the opposite
  var selectQuery = '';
  var oppositeQuery = '';
  var output = '';

  if (column === 'l')
  {
    selectQuery = '.ofq-qual-table-cell-l.ofq-qual-table-qan';
    oppositeQuery = '.ofq-qual-table-cell-r.ofq-qual-table-qan';
  } else {
    selectQuery = '.ofq-qual-table-cell-r.ofq-qual-table-qan';
    oppositeQuery = '.ofq-qual-table-cell-l.ofq-qual-table-qan';
  }

  selectCell = document.querySelector(selectQuery);
  oppositeCell = document.querySelector(oppositeQuery);

  //console.log("Selected: %o",selectCell);
  //console.log("Opposite: %o",oppositeCell);

  output = ofqHighlightDifference(value,oppositeCell.innerText);

  selectCell.innerHTML = output;
}


// Supporting functions

// ofqHighlightDifference checks if the text for both inputs match, if not then highlight
function ofqHighlightDifference(jsonData,thisCell,oppositeCell)
{
  //console.log('[[ofqHighlightDifference]]');
  // If jsonData is defined, compare it's value with the value in the opposite cell
  if (isDefined(jsonData))
  {
    if (jsonData == oppositeCell.innerText){
      // If jsonData value equals value on the opposite cell, return false as we don't need to highlight
      return false;
      // Update inner HTML of oppositeCell to its bare innerText value
    } else {
      // if jsonData value does not equal the value on the opposite cell, return true as we need to highlight
      return true;
    }
  } else {
    if (isDefined(oppositeCell.innerText)){
      return true;
    }
  }
  return false;
}

// 'ofqRemovePipe' replaces the pipes (vertical bars) sometimes used to separate list elements in data
// It returns a corrected list using commas.
function ofqRemovePipe(input)
{
  //console.log('[[ofqRemovePipe]]');
    elements = String(input).split('|');
    return elements.join(', ');
}

// 'ofqTrueFalse' renders instances of the text 'true' as 'Yes' and 'false' as 'No'
function ofqTrueFalse(input) {
  //console.log('[[ofqTrueFalse]]');
  if (input == 'true' || input == true) {
      //console.log(input + '== true')
      return 'Yes'
  } else if (input == 'false' || input == false) {
      //console.log(input + '== false')
      return 'No'
  } else {
      //console.log(input + '== undefined')
      return input
  }
}

// Parses a date string and returns GOV.UK date formatted string
function ofqDateParse(input) {
  //console.log('[[ofqDateParse]]');
  const monthsArr = ['','January','February','March','April','May','June','July','August','September','October','November','December']
  const dateObj = new Date(input)
  const actualYear = 1900 + dateObj.getYear()
  return dateObj.getDate() + ' ' + monthsArr[dateObj.getMonth()] + ' ' + actualYear
}

// 'isEmpty' tests a variable and returns true if it undefined, null or empty, otherwise returns null
function isEmpty(value)
{
  return (value == null || (typeof value === "string" && value.trim().length === 0));
}

// 'isDefined' tests a variable and returns true if it is defined, not null and not empty, otherwise returns null
function isDefined(value)
{
  return !isEmpty(value);
}