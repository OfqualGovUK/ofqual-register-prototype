const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// 'difference' filter compares 2 values, if they don't match it returns the 
// first element of the input arraysurrounded by an HTML mark tag, otherwise the bare value.
// Requires a 2-element array as the input parameter, optional third element for additional options
// First 2 array elements are the items to compare, third element adds some processing
// If third element is set to 'date' it will parse the first element as a date and format for GOV.UK on output
// If third element is 'pipes' it will remove pipes as a list separator from the first element and replace with commas
addFilter('difference', function(content)
    {
        // Only process if there is content defined
        if (content[0])
        {
            let output = []

            //console.log('[FILTER: difference]');
            //console.log('Additional filtering: ' + content[2]);

            if (content[2] == 'date')
            {
                // Process as a date to GOV.UK standard
                output[0] = dateParse(content[0])
                output[1] = dateParse(content[1])
                
            } else if (content[2] == 'pipes') {
                // Process to remove pipes and replace with commas
                output[0] = stripPipe(content[0])
                output[1] = stripPipe(content[1])

            } else if (content[2] == 'truefalse') {
                // Process to turn 'true' and 'false' into 'yes' and 'no'
                output[0] = truefalse(content[0]);
                output[1] = truefalse(content[1]);

            } else {
                // No extra processing on the input
                output[0] = content[0]
                output[1] = content[1]
            }
            
            // Check if both elements match, if not then highlight
            if (output[0] === output[1])
            {
                return output[0]
            }
            else
            {
                return '<mark class="ofq-highlight">'+output[0]+'</mark>'
            }
        } else {
            return content[0]
        }

        function dateParse(input) {
            const monthsArr = ['','January','February','March','April','May','June','July','August','September','October','November','December']
            const dateObj = new Date(input)
            const actualYear = 1900 + dateObj.getYear()
            return dateObj.getDate() + ' ' + monthsArr[dateObj.getMonth()] + ' ' + actualYear
        }

        function stripPipe(input) {
            let elements = String(input).split('|')
            return elements.join(', ')
        }
    }, { renderAsHtml: true }
)

addFilter('truefalse',function (input)
    {
        //console.log('[FILTER: truefalse]');
        //console.log('Input: '+input);
        var output = '';

        if (input == 'true'){
            output = 'Yes';
        } else {
            output = 'No';
        }

        
        //console.log('Output: '+output);
        return output;
    }, { renderAsHtml: true }
)

addFilter('removeslash',function (input)
    {
        let elements = String(input).split('/');
        return elements.join('');
    }
)

addFilter('removepipes',function (input)
    {
        let elements = String(input).split('|');
        return elements.join(', ');
    }
)

addFilter('formatDate',function (input) {
    const monthsArr = ['','January','February','March','April','May','June','July','August','September','October','November','December']
    if (isDefined(input))
    {
        const dateObj = new Date(input)
        const actualYear = 1900 + dateObj.getYear()
        return dateObj.getDate() + ' ' + monthsArr[dateObj.getMonth()] + ' ' + actualYear
    } else {
        return null
    }
})

addFilter('stripnonalpha',function (input) {
    return input.replace(/[^0-9a-z_-]/gi, '');
})

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