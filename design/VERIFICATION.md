# Design and verification record

## References

- https://www.iitr.ac.in/Departments/Electronics%20and%20Communication%20Engineering%20Department/Home.html (opened and visually inspected in Chrome)
- https://iitr.ac.in/
- Generated concept: `student-directory-concept.png`, 1536 × 1024.
- Built-in Image Gen brief: complete academic project directory; institutional masthead, forest green and white, serif headings, sans UI, research-area filters, two-column project listings, skills, deadlines, student/professor role control. Standalone transparent architectural drawing generated separately for the masthead.

## Visual inspection

The concept was inspected with view_image. The running app was inspected directly through Chrome screenshots at its normal desktop viewport, at 1536 × 1024, and at 390 × 844. IAB was unavailable; the available Chrome connector was used. No Playwright browser installation was needed.

Compared: primary heading and navigation copy, masthead and search placement, two-column listing and filter-rail structure, serif/sans typography, green/white palette with pastel area tags, bookmark/meta icon treatment, and mobile column collapse. Fixed a floated fieldset legend that displaced the first filter; increased UI text size; removed the mobile navigation scrollbar; added an accessible dialog title and explicit role selector label.

Intentional differences from the generated concept: accurate fictional sample records replace invented concept copy; funding and qualifications match the requested workflow; search runs as the user types instead of a Search button; weekly commitment uses exclusive radio choices; a duration filter is omitted; the building is a separately generated asset; cards have more room for readable text and funding. Prototype/local-data disclosures were added intentionally. These differences mean this is not a pixel-identical implementation of the concept.

Screenshot archival was attempted but could not complete: the CUA runtime filesystem is read-only, its local fetch failed, and Chrome blocked the local screenshot form POST with ERR_BLOCKED_BY_CLIENT. Direct Chrome screenshot inspection succeeded. Consequently, the skill's final paired local view_image comparison could not be completed; no claim of that check passing is made.

## Functional verification

- `npm test`: three checks passed covering combined filters, closed projects, required résumé, duplicate prevention, withdrawn reapplication, meeting validation, acceptance, and meeting detail clearing.
- `npm run build`: production build passed.
- Chrome: search narrows to one RISC-V project; bookmark appears under Saved projects; project details show eligibility and all requested metadata.
- Chrome: professor posts a project with skills, qualifications, duration, workload, positions, deadline, funding, and outcomes; it appears in the faculty workspace and student browse results.
- Chrome: sample applicant can be reviewed, invited to an in-person meeting, and accepted. Student view showed the exact IST meeting time, location, preparation message, and later Accepted status.
- Chrome: application form opens and Submit is disabled without a résumé. Automated file selection could not complete because the ChatGPT Chrome extension lacks Allow access to file URLs. No browser security setting was changed. Actual upload, IndexedDB persistence, résumé download, and full UI submission therefore remain unverified in-browser.

## Remaining production work

Channel i SSO feasibility and credentials, institute email fallback, verified role assignment, server authorization and ECE restriction, shared database, private file storage, email notifications, and hosting. The prototype intentionally uses browser-local demonstration roles.
