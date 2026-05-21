var ANALYTICS_AVENUE_SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
var PASSPORT_FILE_FOLDER_ID = 'YOUR_PASSPORT_FOLDER_ID';
var PAYMENT_PROOF_FOLDER_ID = 'YOUR_PAYMENT_PROOF_FOLDER_ID';

var ANALYTICS_AVENUE_SHEETS = {
  'pre-onboarding': 'Pre Onboarding',
  feedback: 'Mentor Feedback',
  placement: 'Placement Tracker',
  'monthly-review': 'Monthly Review',
};

var ANALYTICS_AVENUE_COLUMNS = {
  'pre-onboarding': [
    'Email Address',
    'Full Name',
    'Phone Number',
    'City',
    'Status',
    'College Name',
    'Company Name',
    'Coordinator Name',
    'Completed Other Institute Program',
    'Profile Summary',
  ],
  feedback: [
    'Email',
    'Session Date',
    'Student Name',
    'Mentor Name',
    'Technology Covered',
    'Topics Covered',
    'Joining Month',
    'Detailed Topics',
    'Session Feedback',
    'Negative Activities',
    'Queries',
    'Point Of Contact Name',
    'Amount Paid Till Date',
    'Contact Number',
    'Session Rating',
    'Internet Rating',
    'Clarity Rating',
  ],
  placement: [
    'Name',
    'Email Id',
    'Phone Number',
    'Total Amount Paid',
    'Passport File URL',
    'Payment Proof File URL',
    'Status',
    'Profile Intro',
    'Google Drive Link',
    'Overall Feedback',
    'Month Of Joining',
    'Project Titles',
    'Sector Interests',
    'Technology Completed',
    'Class Experience Rating',
    'Hacker Certificate',
    'Amcat Or Cocubes Completed',
    'Dashboard Uploaded',
    'Resume Uploaded',
  ],
  'monthly-review': [
    'Employee Name',
    'Employee ID',
    'Department',
    'Designation',
    'Reporting Manager',
    'Review Month',
    'Task Completion',
    'Productivity',
    'Communication',
    'Team Collaboration',
    'Problem Solving',
    'Attendance',
    'Work Environment',
    'Manager Support',
    'Team Support',
    'Stress Level',
    'Work-Life Balance',
    'Achievements',
    'Challenges',
    'Learnings',
    'Goals',
    'Support Needed',
    'Suggestions',
    'Anonymous Feedback',
    'Additional Comments',
  ],
};

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var result = handleAnalyticsAvenueForms(payload);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error && error.message ? error.message : String(error),
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleAnalyticsAvenueForms(request) {
  if (!request || typeof request !== 'object') {
    throw new Error('Request body is invalid.');
  }

  var formType = String(request.formType || '').trim();
  if (!formType || !ANALYTICS_AVENUE_SHEETS[formType]) {
    throw new Error('Unsupported form type.');
  }

  var sheetName = ANALYTICS_AVENUE_SHEETS[formType];
  var sheet = SpreadsheetApp.openById(ANALYTICS_AVENUE_SPREADSHEET_ID).getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Spreadsheet sheet not found: ' + sheetName);
  }

  var data = request.data || {};
  if (typeof data !== 'object' || data === null) {
    throw new Error('Form data is invalid.');
  }

  if (formType === 'placement') {
    data = processPlacementFiles(data);
  }

  var row = buildDataRow(formType, data);
  sheet.appendRow(row);

  return {
    success: true,
    message: 'Submission received.',
  };
}

function processPlacementFiles(data) {
  var processed = Object.assign({}, data);

  if (processed.passportFile && typeof processed.passportFile === 'object') {
    processed.passportFileUrl = uploadFileToDrive(processed.passportFile, PASSPORT_FILE_FOLDER_ID, 'passport');
  }

  if (processed.paymentProofFile && typeof processed.paymentProofFile === 'object') {
    processed.paymentProofFileUrl = uploadFileToDrive(processed.paymentProofFile, PAYMENT_PROOF_FOLDER_ID, 'payment-proof');
  }

  return processed;
}

function buildDataRow(formType, data) {
  var columns = ANALYTICS_AVENUE_COLUMNS[formType] || [];
  var row = columns.map(function (column) {
    var normalizedKey = normalizeColumnKey(column);
    return getFieldValue(data, column, normalizedKey);
  });
  row.push(new Date());
  return row;
}

function normalizeColumnKey(column) {
  return column
    .replace(/\s+/g, ' ')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map(function (part, index) {
      var normalized = part.toLowerCase();
      if (index === 0) {
        return normalized;
      }
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join('');
}

function getFieldValue(data, column, normalizedKey) {
  if (data[column] !== undefined && data[column] !== null) {
    return data[column];
  }
  if (data[normalizedKey] !== undefined && data[normalizedKey] !== null) {
    return data[normalizedKey];
  }
  return '';
}

function uploadFileToDrive(fileData, folderId, prefix) {
  if (!fileData || !fileData.base64 || !fileData.mimeType || !fileData.fileName) {
    return '';
  }

  var folder = DriveApp.getFolderById(folderId);
  var blob = Utilities.newBlob(Utilities.base64Decode(fileData.base64), fileData.mimeType, fileData.fileName);
  var savedFile = folder.createFile(blob);
  savedFile.setDescription('Uploaded via Analytics Avenue form handler');

  return savedFile.getUrl();
}