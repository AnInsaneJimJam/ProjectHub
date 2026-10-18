# IITR redesign verification — 18 October 2026

## Actual references used

- Official ECE department: https://www.iitr.ac.in/Departments/Electronics%20and%20Communication%20Engineering%20Department/Home.html
- Official site CSS: https://cmsredesign.channeli.in/library/css/variables/colors.css
- Official fonts: https://cmsredesign.channeli.in/library/css/globals/fonts.css
- Official masthead: https://cmsredesign.channeli.in/library/css/components/header.css
- Official navigation: https://cmsredesign.channeli.in/library/css/components/menu.css
- IITR logo: https://cmsredesign.channeli.in/library/assets/images/IITR_Logo.svg
- ECE logo: https://cmsredesign.channeli.in/library/assets/images/ece_header.png

The current design follows the official existing system directly. It does not use an AI-generated mockup as its reference.

## Changes and visual evidence

Replaced the green/serif identity with the actual IITR colours: bright blue `#0067b3`, formal blue `#5183b8`, heading grey `#4c4c4c`, text `#232323`, and pale blue `rgba(229,238,244,.49)`. Used the real IITR and ECE logos in the centred department masthead. Matched Nunito Sans for content and Lato for uppercase navigation. Replaced promotional headlines with descriptive academic headings. Added institutional utility links, breadcrumbs, a pale-blue footer and dark lower footer, and a keyboard skip link. Removed the generated campus drawing from the app and deployment assets.

Browser-computed CSS confirmed Nunito Sans for body/headings, Lato for navigation, and the exact blue token. All local logo images loaded. Font files are served from `public/fonts` with their OFL licences. The ECE anniversary mark is the exact asset currently used by the department site, rather than a newly invented identity.

Desktop Chrome inspection succeeded at the normal 1920-pixel viewport. Screenshot: `redesign-desktop.jpg`, saved through a local-only form and inspected using view_image. Compared the official masthead structure, logo treatment, sans-serif typography, navigation casing, accent/pale-surface colours, and rectangular list/filter components. The project directory and application controls remain purpose-built for this portal; the site does not copy the department homepage carousel or claim to be an official live service.

At 390 × 844, DOM checks confirmed a single-column directory, visible role selector/navigation, a working collapsible filter panel, and no horizontal overflow. Filtering to Signal Processing produced exactly two projects. Browser screenshot capture at the emulated viewport timed out, so mobile visual screenshot verification remains incomplete. Temporary viewport overrides were reset.

## Functional and build checks

- `npm test`: all three existing workflow tests passed.
- `npm run build`: passed after the UI changes.
- Chrome: search plus research-area filter returned the correct single RISC-V project; Clear all restored the directory.
- Chrome: project details showed qualifications and all project metadata; application form retained the statement field, PDF control, and disabled Submit until a résumé is available.
- Chrome: professor role, project-management workspace, applicant review, and in-person meeting form remained accessible with their existing controls.
- No domain model, storage format, authentication, role-switching logic, or user/browser data was changed by the redesign. The existing application tests exercise duplicate prevention, status decisions, and meeting validation.
- Previous PDF-upload automation restriction remains: actual file selection requires Chrome extension file-URL access, which was not enabled. The redesign does not claim new end-to-end upload coverage.

The desktop screenshot may include locally persisted sample data from earlier QA. A fresh browser starts with the original eight illustrative projects.

---

## Initial prototype record — historical, superseded design

### Original verification record

## References

- https://www.iitr.ac.in/Departments/Electronics%20and%20Communication%20Engineering%20Department/Home.html (opened and visually inspected in Chrome)
- https://iitr.ac.in/
- Generated concept: `student-directory-concept.png`, 1536 × 1024.
- Built-in Image Gen brief: complete academic project directory; institutional masthead, forest green and white, serif headings, sans UI, research-area filters, two-column project listings, skills, deadlines, student/professor role control. Standalone transparent architectural drawing generated separately for the masthead.

## Visual inspection

The concept was inspected with view_image. The running app was inspected directly through Chrome screenshots at its normal desktop viewport, at 1536 × 1024, and at 390 × 844. IAB was unavailable; the available Chrome connector was used. No Playwright browser installation was needed.

Compared: primary heading and navigation copy, masthead and search placement, two-column listing and filter-rail structure, serif/sans typography, green/white palette with pastel area tags, bookmark/meta icon treatment, and mobile column collapse. Fixed a floated fieldset legend that displaced the first filter; increased UI text size; removed the mobile navigation scrollbar; added an accessible dialog title and explicit role selector label.

Intentional differences from the generated concept: accurate fictional sample records replace invented concept copy; funding and qualifications match the requested workflow; search runs as the user types instead of a Search button; weekly commitment uses exclusive radio choices; a duration filter is omitted; the building is a separately generated asset; cards have more room for readable text and funding. Prototype/local-data disclosures were added intentionally. These differences mean this is not a pixel-identical implementation of the concept.

Screenshot archival initially reported errors: the CUA runtime filesystem is read-only, its local fetch failed, and Chrome blocked the local form response with ERR_BLOCKED_BY_CLIENT. Inspection of the actual workspace subsequently confirmed that the server had saved `prototype-mobile.jpg` successfully. The concept and latest saved mobile render were both inspected with view_image in the same QA pass. Desktop screenshots were inspected directly in Chrome; a desktop screenshot file was not saved. The implementation was visually checked against the concept for the comparison points above, with intentional deviations explicitly recorded rather than claiming pixel identity.

## Functional verification

- `npm test`: three checks passed covering combined filters, closed projects, required résumé, duplicate prevention, withdrawn reapplication, meeting validation, acceptance, and meeting detail clearing.
- `npm run build`: production build passed.
- Chrome: search narrows to one RISC-V project; bookmark appears under Saved projects; project details show eligibility and all requested metadata.
- Chrome: professor posts a project with skills, qualifications, duration, workload, positions, deadline, funding, and outcomes; it appears in the faculty workspace and student browse results.
- Chrome: sample applicant can be reviewed, invited to an in-person meeting, and accepted. Student view showed the exact IST meeting time, location, preparation message, and later Accepted status.
- Chrome: application form opens and Submit is disabled without a résumé. Automated file selection could not complete because the ChatGPT Chrome extension lacks Allow access to file URLs. No browser security setting was changed. Actual upload, IndexedDB persistence, résumé download, and full UI submission therefore remain unverified in-browser.

## Remaining production work

Channel i SSO feasibility and credentials, institute email fallback, verified role assignment, server authorization and ECE restriction, shared database, private file storage, email notifications, and hosting. The prototype intentionally uses browser-local demonstration roles.
