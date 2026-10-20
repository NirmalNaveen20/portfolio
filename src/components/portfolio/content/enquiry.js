export const enquiryTypes=['Job opportunity','Project enquiry','General message'];

// Include only the fields belonging to the selected enquiry.
export function enquiryDetails(fields){
 const read=name=>String(fields.get(name)||'').trim();
 const enquiry_type=read('enquiry_type');
 const details={enquiry_type,subject:`Portfolio: ${enquiry_type}`};
 if(enquiry_type==='Job opportunity'){
  return {...details,company_name:read('company_name'),role_title:read('role_title')||'Not specified'};
 }
 if(enquiry_type==='Project enquiry'){
  return {...details,project_type:read('project_type'),number_of_pages:read('number_of_pages')||'Not specified',budget_range:read('budget_range')?`${read('budget_range')} USD`:'Not specified'};
 }
 return details;
}
