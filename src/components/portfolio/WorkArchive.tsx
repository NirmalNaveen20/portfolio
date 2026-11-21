'use client';

import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FilterDropdown from '@/components/FilterDropdown';
import SortDropdown from '@/components/SortDropdown';
import work from '@/data/work';
import {career} from './content/portfolio.js';

const companyOptions = [...new Set(career.map(job => job.company))]
  .sort((a, b) => a.localeCompare(b))
  .map(name => ({name, count: career.filter(job => job.company === name).length}));

export default function WorkArchive() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [draftCompanies, setDraftCompanies] = useState<string[]>([]);
  const [order, setOrder] = useState<'newest' | 'oldest'>('newest');

  // The shared career data is maintained newest first.
  const jobs = career.filter(job => !selectedCompanies.length || selectedCompanies.includes(job.company));
  if (order === 'oldest') jobs.reverse();

  function toggleCompany(company: string) {
    setDraftCompanies(companies => companies.includes(company)
      ? companies.filter(name => name !== company)
      : [...companies, company]);
  }

  function clearCompanies() {
    setDraftCompanies([]);
    setSelectedCompanies([]);
  }

  return (
    <>
      <div className="profile-index-controls relative z-10 mb-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <FilterDropdown
          items={companyOptions}
          selectedItems={draftCompanies}
          onToggle={toggleCompany}
          onApply={() => setSelectedCompanies(draftCompanies)}
          onClear={clearCompanies}
          placeholder="Filter by company"
          resultCount={jobs.length}
        />
        <SortDropdown
          sortOrder={order}
          onChange={value => {if (value === 'newest' || value === 'oldest') setOrder(value);}}
          options={[{label: 'Newest first', value: 'newest'}, {label: 'Oldest first', value: 'oldest'}]}
        />
      </div>
      <ol className="profile-index-list" aria-label="Work experience">
        {jobs.map(job => {
          const companySlug = job.company.replace(/\s+/g, '').toLowerCase();
          const caseStudy = work.find(item => item.slug.toLowerCase() === companySlug);

          return (
            <li className="profile-index-entry" key={job.company}>
              <div className="flex items-center gap-4">
                <span className="company-logo">
                  <Image src={job.logo} alt="" width={56} height={56} />
                </span>
                <div>
                  <h2>{job.role}</h2>
                  <p>{job.company} · {job.period}</p>
                </div>
              </div>
              {job.team && <p>{job.team}</p>}
              <p>{job.description}</p>
              <ul className="tags list-none p-0" aria-label={`Technologies at ${job.company}`}>
                {job.technologies.map(technology => <li key={technology}><span>{technology}</span></li>)}
              </ul>
              {caseStudy && <Link className="profile-index-link" href={`/work/${caseStudy.slug}`}>Read about my work at {job.company}</Link>}
            </li>
          );
        })}
      </ol>
    </>
  );
}
