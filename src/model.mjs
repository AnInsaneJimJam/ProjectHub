export const AREAS = ['VLSI & Microelectronics', 'Signal Processing', 'Communication Systems', 'RF & Microwave', 'Embedded Systems'];
export const FACULTY_ID = 'faculty-demo';
export const STUDENT_ID = 'student-demo';
export const STATUSES = ['Submitted', 'Shortlisted', 'Meeting requested', 'Accepted', 'Not selected', 'Withdrawn'];
export const today = () => new Date().toLocaleDateString('en-CA', {timeZone:'Asia/Kolkata'});
export const isOpen = p => p.open && p.deadline >= today();
export const dateLabel = value => new Date(value+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
export const meetingLabel = value => new Date(value).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit',timeZone:'Asia/Kolkata'})+' IST';
const rows = [
 ['Low-power RISC-V processor design',0,'Prof. A. Mehta','faculty-demo','Explore energy-efficient processor architectures and implement a RISC-V core for edge computing applications.','Verilog,Digital Design,Computer Architecture',12,8,2,'2026-11-15','Unpaid'],
 ['Deep learning for wireless sensing',2,'Prof. R. Kapoor','faculty-2','Investigate how wireless channel measurements can enable contactless activity recognition using deep learning.','Python,PyTorch,Wireless Communication',16,10,3,'2026-11-20','Paid'],
 ['Intelligent antenna arrays for 6G',3,'Prof. S. Rao','faculty-3','Design and simulate beamforming techniques for reconfigurable antenna arrays in next-generation networks.','MATLAB,Electromagnetics,Antenna Design',12,8,2,'2026-11-18','Unpaid'],
 ['Wearable ECG signal analysis',1,'Prof. A. Mehta','faculty-demo','Develop robust signal processing methods for real-time cardiac monitoring with wearable sensors.','Python,Signal Processing,Machine Learning',10,6,2,'2026-11-25','Unpaid'],
 ['TinyML for environmental monitoring',4,'Prof. N. Sen','faculty-4','Bring lightweight machine learning models to microcontrollers for low-power environmental sensing.','C/C++,Arduino,TensorFlow Lite',8,6,3,'2026-12-01','Paid'],
 ['Analog front-end for biomedical sensors',0,'Prof. A. Mehta','faculty-demo','Design a low-noise analog front-end and evaluate its performance for wearable biosignal acquisition.','Analog Circuits,SPICE,CMOS',16,10,1,'2026-11-28','Unpaid'],
 ['Speech enhancement in noisy environments',1,'Prof. P. Das','faculty-5','Build and evaluate speech enhancement algorithms for intelligible audio in challenging acoustic settings.','Python,DSP,Audio Processing',12,8,2,'2026-12-05','Paid'],
 ['Software-defined radio testbed',2,'Prof. R. Kapoor','faculty-2','Prototype an end-to-end communication link and explore modulation schemes with a software-defined radio.','GNU Radio,Python,Digital Communication',10,6,2,'2026-12-10','Unpaid']
];
export function initialState() {
 return {version:1,projects:rows.map((r,i)=>({id:'p'+(i+1),title:r[0],area:AREAS[r[1]],faculty:r[2],facultyId:r[3],description:r[4],skills:r[5].split(','),weeks:r[6],hours:r[7],positions:r[8],deadline:r[9],funding:r[10],eligibility:'ECE students with foundational coursework and an interest in hands-on research. Relevant skills listed above are expected; prior research experience is not required.',deliverables:'A working implementation or simulation, reproducible evaluation results, and a short technical report.',open:true,createdAt:'2026-10-'+String(18-i).padStart(2,'0')})),saved:[],profile:{name:'Aarav Sharma',email:'aarav@ece.iitr.ac.in',enrolment:'23116001',programme:'B.Tech',year:'3',department:'ECE',skills:'Python, Verilog, MATLAB',bio:'Interested in digital systems and applied signal processing.',resume:null},applications:[{id:'a1',projectId:'p4',studentId:STUDENT_ID,name:'Aarav Sharma',email:'aarav@ece.iitr.ac.in',programme:'B.Tech',year:'3',skills:'Python, Verilog, MATLAB',motivation:'I would like to apply signal processing coursework to a practical healthcare problem. I have implemented digital filters in Python and would love to contribute to the ECG analysis pipeline.',resume:null,status:'Shortlisted',submittedAt:'2026-10-17T10:00:00Z',updatedAt:'2026-10-18T08:00:00Z',meeting:null},{id:'a2',projectId:'p1',studentId:'sample-student-2',name:'Isha Verma',email:'isha@ece.iitr.ac.in',programme:'B.Tech',year:'3',skills:'Verilog, FPGA, C',motivation:'I built a basic pipelined processor as a course project and would like to explore power optimisation in more depth.',resume:null,status:'Submitted',submittedAt:'2026-10-17T12:00:00Z',updatedAt:'2026-10-17T12:00:00Z',meeting:null}]};
}
export function filterProjects(projects,{query='',areas=[],funding='All',hours='All',savedOnly=false,saved=[],sort='newest'}={}) {
 const q=query.trim().toLowerCase();
 return projects.filter(p=>isOpen(p)&&(!q||[p.title,p.faculty,p.description,...p.skills].join(' ').toLowerCase().includes(q))&&(!areas.length||areas.includes(p.area))&&(funding==='All'||p.funding===funding)&&(hours==='All'||p.hours<=Number(hours))&&(!savedOnly||saved.includes(p.id))).sort((a,b)=>sort==='deadline'?a.deadline.localeCompare(b.deadline):b.createdAt.localeCompare(a.createdAt));
}
export function canApply(state,p,studentId=STUDENT_ID) {return isOpen(p)&&!state.applications.some(a=>a.projectId===p.id&&a.studentId===studentId&&a.status!=='Withdrawn');}
export function addApplication(state,p,payload) {
 if(!canApply(state,p)) throw Error('This project is closed or you already have an active application.');
 if(!payload.motivation?.trim()||!state.profile.resume) throw Error('Add a PDF résumé and a short statement before applying.');
 return {...state,applications:[{id:crypto.randomUUID(),projectId:p.id,studentId:STUDENT_ID,...state.profile,...payload,status:'Submitted',submittedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),meeting:null},...state.applications]};
}
export function updateApplication(state,id,status,meeting=null) {
 if(!STATUSES.includes(status)) throw Error('Invalid application status.');
 if(status==='Meeting requested'&&(!meeting?.when||!meeting?.location?.trim()||new Date(meeting.when)<=new Date())) throw Error('Choose a future meeting time and a location.');
 return {...state,applications:state.applications.map(a=>a.id===id?{...a,status,meeting:status==='Meeting requested'?meeting:null,updatedAt:new Date().toISOString()}:a)};
}
export async function resumeStore(action,key,value) {
 const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('ece-connect-files',1);r.onupgradeneeded=()=>r.result.createObjectStore('resumes');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
 try{return await new Promise((resolve,reject)=>{const tx=db.transaction('resumes',action==='get'?'readonly':'readwrite');const s=tx.objectStore('resumes');let result;const r=action==='get'?s.get(key):s.put(value,key);r.onsuccess=()=>{result=r.result;};tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('File storage was interrupted.'));});}finally{db.close();}
}
