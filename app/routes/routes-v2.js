module.exports = function (router) {
  const version = 'v2'

   //---------------------- Error Messages --------------------------------//
  
   //---------------------- Error Messages Qualifications -----------------//
  
  router.post('/' + version + '/search-qualifications/search-qualifications-form', function (req, res) {
	req.session.data.errorsQualificationSearch = {}
    let hasError = false
    let qualificationSearchTerm = req.session.data['qualification-search-term']

	

    if (qualificationSearchTerm === '') {
		hasError = true
		req.session.data.errorsQualificationSearch['qualification-search-term-empty'] = 'Enter a search term'
    }

    if (hasError) {
		res.redirect('/' + version + '/search-qualifications/search-qualifications')
    } else {
		req.session.data.errorsQualificationSearchResults = {}
		res.redirect('/' + version + '/search-qualifications/search-qualifications-results')
    }
  })
  
  router.post('/' + version + '/search-qualifications/search-qualifications-results-form', function (req, res) {
	req.session.data.errorsQualificationSearchResults = {}
    let hasError = false
    let qualificationSearchTermResults = req.session.data['qualification-search-term-results']

	

    if (qualificationSearchTermResults === '') {
		hasError = true
		req.session.data['qualification-search-term'] = ''
		req.session.data.errorsQualificationSearchResults['qualification-search-term-results-empty'] = 'Enter a search term'
    }

    if (hasError) {
		res.redirect('/' + version + '/search-qualifications/search-qualifications-results')
    } else {
		req.session.data['qualification-search-term'] = qualificationSearchTermResults
		res.redirect('/' + version + '/search-qualifications/search-qualifications-results')
    }
  })
  
  router.post('/' + version + '/search-qualifications/search-qualifications-results-download-form', function (req, res) {
	req.session.data.errorsQualificationDownload = {}
    let hasError = false
    let downloadFileFormat = req.session.data['format']

	

    if (downloadFileFormat === undefined) {
		hasError = true
		req.session.data.errorsQualificationDownload['qualification-download-format-empty'] = 'Select a file format'
    }

    if (hasError) {
		res.redirect('/' + version + '/search-qualifications/search-qualifications-results-download')
    } else {
		res.redirect('/' + version + '/search-qualifications/search-qualifications-results-download-link')
    }
  })
  
  router.post('/' + version + '/search-qualifications/search-qualifications-user-form', function (req, res) {
	req.session.data.errorsQualificationUser = {}
    let hasError = false
    let userType = req.session.data['user']

	

    if (userType === undefined) {
		hasError = true
		req.session.data.errorsQualificationUser['qualification-user'] = 'Select a user type'
    }

    if (hasError) {
		res.redirect('/' + version + '/search-qualifications/search-qualifications-user')
    } else {
		res.redirect('/' + version + '/search-qualifications/search-qualifications')
    }
  })
 
   //---------------------- Error Messages Organization -------------------//
 
   router.post('/' + version + '/search-organizations/search-organizations-form', function (req, res) {
	req.session.data.errorsOrganizationSearch = {}
    let hasError = false
    let organizationSearchTerm = req.session.data['organization-search-term']

	

    if (organizationSearchTerm === '') {
		hasError = true
		req.session.data.errorsOrganizationSearch['organization-search-term-empty'] = 'Enter a search term'
    }

    if (hasError) {
		res.redirect('/' + version + '/search-organizations/search-organizations')
    } else {
		req.session.data.errorsOrganizationSearchResults = {}
		res.redirect('/' + version + '/search-organizations/search-organizations-results')
    }
  })
  
  router.post('/' + version + '/search-organizations/search-organizations-results-form', function (req, res) {
	req.session.data.errorsOrganizationSearchResults = {}
    let hasError = false
    let organizationSearchTermResults = req.session.data['organization-search-term-results']

	

    if (organizationSearchTermResults === '') {
		hasError = true
		req.session.data['organization-search-term'] = ''
		req.session.data.errorsOrganizationSearchResults['organization-search-term-results-empty'] = 'Enter a search term'
    }

    if (hasError) {
		res.redirect('/' + version + '/search-organizations/search-organizations-results')
    } else {
		req.session.data['organization-search-term'] = organizationSearchTermResults
		res.redirect('/' + version + '/search-organizations/search-organizations-results')
    }
  })
  
  router.post('/' + version + '/search-organizations/search-organizations-user-form', function (req, res) {
	req.session.data.errorsOrganizationUser = {}
    let hasError = false
    let userType = req.session.data['user']

	

    if (userType === undefined) {
		hasError = true
		req.session.data.errorsOrganizationUser['organization-user'] = 'Select a user type'
    }

    if (hasError) {
		res.redirect('/' + version + '/search-organizations/search-organizations-user')
    } else {
		res.redirect('/' + version + '/search-organizations/search-organizations')
    }
  })

   //---------------------- Error Messages Compare Qualification ----------//
   
  router.post('/' + version + '/compare-qualifications/compare-search-qualifications-form', function (req, res) {
	req.session.data.errorsCompareQualificationSearch = {}
    let hasError = false
    let qualificationCompareSearchTerm = req.session.data['compare-qualification-search-term']

	

    if (qualificationCompareSearchTerm === '') {
		hasError = true
		req.session.data.errorsCompareQualificationSearch['compare-qualification-search-term-empty'] = 'Enter a search term'
    }

    if (hasError) {
		res.redirect('/' + version + '/compare-qualifications/compare-search-qualifications')
    } else {
		req.session.data.errorsQualificationSearchResults = {}
		res.redirect('/' + version + '/compare-qualifications/compare-search-qualifications-results')
    }
  })
  
  router.post('/' + version + '/compare-qualifications/compare-search-qualifications-results-form', function (req, res) {
	req.session.data.errorsCompareQualificationSearchResults = {}
    let hasError = false
    let qualificationCompareSearchTermResults = req.session.data['qualification']

	

    if (qualificationCompareSearchTermResults === undefined) {
		hasError = true
		req.session.data.errorsCompareQualificationSearchResults['compare-qualification-none'] = 'Select at least 2 qualifications to compare'
    } else {
		
    let qualificationCompareSearchTermResultsLength = qualificationCompareSearchTermResults.length
	
    if (qualificationCompareSearchTermResultsLength > 3) {
		hasError = true
		req.session.data.errorsCompareQualificationSearchResults['compare-qualification-too-many'] = 'Select up to 3 qualifications to compare'
    } else if(qualificationCompareSearchTermResultsLength === 1) {
		hasError = true
		req.session.data.errorsCompareQualificationSearchResults['compare-qualification-too-many'] = 'Select more than 1 qualification to compare'	
	}
	}


    if (hasError) {
		res.redirect('/' + version + '/compare-qualifications/compare-search-qualifications-results')
    } else {
		req.session.data.errorsCompareQualificationSearchResults = {}
		res.redirect('/' + version + '/compare-qualifications/compare-qualifications-results-table')
    }
  })
  
  router.post('/' + version + '/compare-qualifications/compare-qualifications-user-form', function (req, res) {
	req.session.data.errorsComparecompareQualificationsUser = {}
    let hasError = false
    let userType = req.session.data['user']

	

    if (userType === undefined) {
		hasError = true
		req.session.data.errorsComparecompareQualificationsUser['compare-qualification-user'] = 'Select a user type'
    }

    if (hasError) {
		res.redirect('/' + version + '/compare-qualifications/compare-qualifications-user')
    } else {
		res.redirect('/' + version + '/compare-qualifications/compare-search-qualifications')
    }
  })
  
   //---------------------- End Error Messages ----------------------------//
   
   //---------------------- Routing Start ---------------------------------//
   
  router.get('/' + version + '/start', function (req, res) {
    res.render(version + '/start', { 'version': version })
  })
   
   //---------------------- Routing Qualifications ------------------------//
  
 
  router.get('/' + version + '/search-qualifications/start', function (req, res) {
    res.render(version + '/search-qualifications/start', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-user', function (req, res) {
	req.session.data.errorsQualificationUser = {}
	req.session.data['user'] = undefined 
    res.render(version + '/search-qualifications/search-qualifications-user', { 'version': version })
  })

  router.get('/' + version + '/search-qualifications/search-qualifications', function (req, res) {
	req.session.data.errorsQualificationSearch = {}
    res.render(version + '/search-qualifications/search-qualifications', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-results', function (req, res) {
    res.render(version + '/search-qualifications/search-qualifications-results', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-results-details-1', function (req, res) {
    res.render(version + '/search-qualifications/search-qualifications-results-details-1', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-results-details-2', function (req, res) {
    res.render(version + '/search-qualifications/search-qualifications-results-details-2', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-results-details-3', function (req, res) {
    res.render(version + '/search-qualifications/search-qualifications-results-details-3', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-results-details-4', function (req, res) {
    res.render(version + '/search-qualifications/search-qualifications-results-details-4', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-results-details-5', function (req, res) {
    res.render(version + '/search-qualifications/search-qualifications-results-details-5', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-results-details-6', function (req, res) {
    res.render(version + '/search-qualifications/search-qualifications-results-details-6', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-results-download', function (req, res) {
	req.session.data.errorsQualificationDownload = {}
	req.session.data['format'] = undefined 
    res.render(version + '/search-qualifications/search-qualifications-results-download', { 'version': version })
  })
  
  router.get('/' + version + '/search-qualifications/search-qualifications-results-download-link', function (req, res) {
    res.render(version + '/search-qualifications/search-qualifications-results-download-link', { 'version': version })
  })
  
   //---------------------- Routing Organizations -------------------------//  
  
  router.get('/' + version + '/search-organizations/start', function (req, res) {
    res.render(version + '/search-organizations/start', { 'version': version })
  })
  
  router.get('/' + version + '/search-organizations/search-organizations-user', function (req, res) {
	req.session.data.errorsOrganizationUser = {}
	req.session.data['user'] = undefined 
    res.render(version + '/search-organizations/search-organizations-user', { 'version': version })
  })

  
  router.get('/' + version + '/search-organizations/search-organizations', function (req, res) {
	req.session.data.errorsOrganizationSearch = {}
    res.render(version + '/search-organizations/search-organizations', { 'version': version })
  })
  
  router.get('/' + version + '/search-organizations/search-organizations-results', function (req, res) {
    res.render(version + '/search-organizations/search-organizations-results', { 'version': version })
  })
  
  router.get('/' + version + '/search-organizations/search-organizations-results-details-1', function (req, res) {
    res.render(version + '/search-organizations/search-organizations-results-details-1', { 'version': version })
  })
  
  router.get('/' + version + '/search-organizations/search-organizations-results-details-2', function (req, res) {
    res.render(version + '/search-organizations/search-organizations-results-details-2', { 'version': version })
  })  
  
  router.get('/' + version + '/search-organizations/search-organizations-results-details-3', function (req, res) {
    res.render(version + '/search-organizations/search-organizations-results-details-3', { 'version': version })
  })  
  
  router.get('/' + version + '/search-organizations/search-organizations-results-details-4', function (req, res) {
    res.render(version + '/search-organizations/search-organizations-results-details-4', { 'version': version })
  })  
  
  router.get('/' + version + '/search-organizations/search-organizations-results-details-5', function (req, res) {
    res.render(version + '/search-organizations/search-organizations-results-details-5', { 'version': version })
  })  
  
   //---------------------- Routing Compare -------------------------------//
  
  
  router.get('/' + version + '/compare-qualifications/start', function (req, res) {
    res.render(version + '/compare-qualifications/start', { 'version': version })
  })
  
  router.get('/' + version + '/compare-qualifications/compare-qualifications-user', function (req, res) {
	req.session.data.errorsComparecompareQualificationsUser = {}
	req.session.data['user'] = undefined 
    res.render(version + '/compare-qualifications/compare-qualifications-user', { 'version': version })
  })

  
  router.get('/' + version + '/compare-qualifications/compare-search-qualifications', function (req, res) {
	req.session.data.errorsCompareQualificationSearch = {}
	req.session.data['qualification'] = undefined 
    res.render(version + '/compare-qualifications/compare-search-qualifications', { 'version': version })
  })
  
  router.get('/' + version + '/compare-qualifications/compare-search-qualifications-results', function (req, res) {
	req.session.data.errorsCompareQualificationSearchResults = {}
	req.session.data['qualification'] = undefined 
    res.render(version + '/compare-qualifications/compare-search-qualifications-results', { 'version': version })
  })
 
  
  router.get('/' + version + '/compare-qualifications/compare-qualifications-results-table', function (req, res) {
    res.render(version + '/compare-qualifications/compare-qualifications-results-table', { 'version': version })
  })
  
   router.get('/' + version + '/compare-qualifications/compare-qualifications-results-details', function (req, res) {
    res.render(version + '/compare-qualifications/compare-qualifications-results-details', { 'version': version })
  })
  
   
}