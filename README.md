# ECE Research Connect

Interactive React + Vite prototype for project discovery and applications in the Electronics & Communication Engineering department at IIT Roorkee.

## Run

```sh
npm install
npm run dev
npm test
npm run build
```

Use the top-right selector to switch between Student and Professor view. No credentials are required: these are demonstration roles, not real authentication.

## Included

- Eight clearly marked fictional projects, searchable by title, topic, skill, or faculty.
- Combined research-area, weekly commitment, funding, and saved-project filters; deadline sorting.
- Project details with qualifications, required skills, duration, workload, positions, deadline, funding, and outcomes.
- Editable ECE student profile, PDF résumé upload (maximum 5 MB), application statements, duplicate prevention, and withdrawal.
- Professor project posting, editing, closing, reopening, and applicant review.
- Shortlisting, acceptance, rejection, and in-person meeting requests with IST time, location, and preparation notes.
- Student-visible status updates and meeting details.
- Browser-local persistence for project/application metadata; IndexedDB for actual uploaded PDF files. Each application stores a snapshot of its submitted profile and résumé reference.

## Prototype boundaries

All people and projects are illustrative. No applications or messages are sent to IIT Roorkee. Browser state is not shared between accounts, devices, or browsers. ECE is a UI scope, not a server-enforced access restriction. Resume file checks are client-side prototype checks, not a production security boundary.

The full application needs verified faculty accounts, server-enforced ECE membership and role permissions, database persistence, private résumé storage, file scanning, and email notifications. Investigate Channel i SSO client registration and identity claims before selecting it; institute email verification is the fallback. Hosting remains undecided.

## Design and verification

The current redesign follows the official ECE department site: its centred two-logo masthead, Nunito Sans content font, Lato navigation, blue colour tokens, utility links, and institutional footer. Logos and fonts are served locally. See [design/VERIFICATION.md](design/VERIFICATION.md) for the source references and checks, and [design/redesign-desktop.jpg](design/redesign-desktop.jpg) for the current screenshot. The earlier generated concept remains in `design/student-directory-concept.png` as historical context; it is no longer the design reference.
