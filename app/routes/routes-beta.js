const govukPrototypeKit = require("govuk-prototype-kit");

// Load JSON data sources
const scopeData = require('../data/pearson_sor.json');

module.exports = function (router) {
  const version = 'beta'
   
   //---------------------- File Downloads Start --------------------------//

   // Download button on the search-organisations/organisation-details page triggers this
   router.get('/download/download-sor', (req, res) => {
    // Path to the file you want to download
    const filePath = 'app/data/pearson_sor.csv';
  
    // Trigger the file download
    res.download(filePath, 'pearson-scope-of-recognition.csv', (err) => {
      if (err) {
        // Handle any error that occurred during the download
        console.log('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  });

   // Download button on the search-organisations/organisation-details page triggers this
   router.get('/download/download-org-results', (req, res) => {
    // Path to the file you want to download
    const filePath = 'app/data/org-search-results.csv';
  
    // Trigger the file download
    res.download(filePath, 'org-search-results.csv', (err) => {
      if (err) {
        // Handle any error that occurred during the download
        console.log('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  });

  // Download button on the search-qualifications/search-results page triggers this
  router.get('/download/download-results', (req, res) => {
    // Path to the file you want to download
    const filePath = 'app/data/search-results-download.csv';
  
    // Trigger the file download
    res.download(filePath, 'results.csv', (err) => {
      if (err) {
        // Handle any error that occurred during the download
        console.log('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  });
  
  //---------------------- Routing Start ---------------------------------//
   
  router.all('/' + version + '/start', function (req, res) {
    res.render(version + '/start', { 'version': version })
  }) 

  router.all('/' + version + '/', function (req, res) {
    res.render(version + '/start', { 'version': version })
  }) 
    
  router.all('/' + version, function (req, res) {
    res.render(version + '/start', { 'version': version })
  })

 //---------------------- Routing Search Organisations -------------------------------//
  
  
 
 router.all('/' + version + '/search-organisations/organisation-details', function (req,res)
  {
    res.render('/' + version + '/search-organisations/organisation-details', { 'version': version, 'scopeData': scopeData })
  })

  router.all('/' + version + '/search-organisations/search', function (req,res)
  {
    res.render('/' + version + '/search-organisations/search', { 'version': version })
  })

  router.all('/' + version + '/search-organisations/search-results', function (req,res)
  {
    res.render('/' + version + '/search-organisations/search-results', { 'version': version })
  })

  router.all('/' + version + '/search-organisations/search-error', function (req,res)
  {
    res.render('/' + version + '/search-organisations/search-error', { 'version': version })
  })

  router.all('/' + version + '/search-organisations/search-error-b', function (req,res)
  {
    res.render('/' + version + '/search-organisations/search-error-b', { 'version': version })
  })

 //---------------------- Routing Search Qualifications -------------------------------//

 router.all('/' + version + '/search-qualifications/qualification-search', function (req,res)
 {
   res.render('/' + version + '/search-qualifications/qualification-search', { 'version': version })
 })

 router.all('/' + version + '/search-qualifications/qualification-search-error', function (req,res)
 {
   res.render('/' + version + '/search-qualifications/qualification-search-error', { 'version': version })
 })

 router.all('/' + version + '/search-qualifications/qualification-search-error-b', function (req,res)
 {
   res.render('/' + version + '/search-qualifications/qualification-search-error-b', { 'version': version })
 })

 router.all('/' + version + '/search-qualifications/search', function (req,res)
 {
   res.render('/' + version + '/search-qualifications/search', { 'version': version })
 })

 router.all('/' + version + '/search-qualifications/qualification-search-pearson', function (req,res)
 {
   res.render('/' + version + '/search-qualifications/qualification-search-pearson', { 'version': version })
 })

 router.all('/' + version + '/search-qualifications/qualification-details', function (req,res)
 {
   res.render('/' + version + '/search-qualifications/qualification-details', { 'version': version })
 })

 router.all('/' + version + '/search-qualifications/qualification-details-full-fieldset', function (req,res)
 {
   res.render('/' + version + '/search-qualifications/qualification-details-full-fieldset', { 'version': version })
 })

//---------------------- Application error pages -------------------------------//

router.all('/' + version + '/page-not-found-error', function (req,res)
 {
   res.render('/' + version + '/page-not-found-error', { 'version': version })
 })

 router.all('/' + version + '/application-error', function (req,res)
 {
   res.render('/' + version + '/application-error', { 'version': version })
 })

} // End module.exports