export type Language = "en" | "hi" | "mr";

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  dashboard: string;
  patients: string;
  referrals: string;
  facilities: string;
  notifications: string;
  consent: string;
  sync: string;
  settings: string;
  usersAndRoles: string;
  auditLogs: string;
  logout: string;
  login: string;
  register: string;
  viewDetails: string;
  save: string;
  cancel: string;
  back: string;
  search: string;
  online: string;
  offline: string;
  verified: string;
  pending: string;
  urgent: string;
  routine: string;
  emergency: string;
  doctorWorkspace: string;
  ashaWorkspace: string;
  facilityWorkspace: string;
  patientPortal: string;
  adminPortal: string;
  findNearbyHealthcare: string;
  doctorDirectory: string;
  bookAppointment: string;
  myAppointments: string;
  voiceAssistant: string;
  aboutUs: string;
  howItWorks: string;
  accessRecordReferFollow: string;
  prototypeNotice: string;
  consultation: string;
  joinConsultation: string;
  upcoming: string;
  today: string;
  completed: string;
  cancelled: string;
  all: string;
  filter: string;
  status: string;
  actions: string;
  confirm: string;
  close: string;
  loading: string;
  patientName: string;
  mobileNumber: string;
  facilityName: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  reason: string;
  vitalSigns: string;
  medicalHistory: string;
  activeReferral: string;
  consultationPrototype: string;
  simulatedVideoPreview: string;
  webrtcIntegrationRequired: string;
  uidaiAbdmDisclaimer: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: "NIRAMAYA-SETU",
    tagline: "Rural Healthcare Care Continuity and Closed-Loop Referral Platform",
    dashboard: "Dashboard",
    patients: "Patients",
    referrals: "Referrals",
    facilities: "Facilities",
    notifications: "Notifications",
    consent: "Consent",
    sync: "Sync Center",
    settings: "System Settings",
    usersAndRoles: "Users & Roles",
    auditLogs: "Audit Logs",
    logout: "Sign Out",
    login: "Sign In",
    register: "Register Patient",
    viewDetails: "View Details",
    save: "Save Changes",
    cancel: "Cancel",
    back: "Back",
    search: "Search...",
    online: "Online",
    offline: "Offline",
    verified: "Verified",
    pending: "Pending",
    urgent: "Urgent",
    routine: "Routine",
    emergency: "Emergency",
    doctorWorkspace: "Clinical Workspace",
    ashaWorkspace: "ASHA / ANM Field Work",
    facilityWorkspace: "Facility Operations",
    patientPortal: "Patient Health Portal",
    adminPortal: "System Administration",
    findNearbyHealthcare: "Find Nearby Healthcare",
    doctorDirectory: "Doctor Directory",
    bookAppointment: "Book Appointment",
    myAppointments: "My Appointments",
    voiceAssistant: "Voice Assistant",
    aboutUs: "About NIRAMAYA-SETU",
    howItWorks: "How It Works",
    accessRecordReferFollow: "ACCESS → RECORD → REFER → FOLLOW",
    prototypeNotice: "Prototype Interface — Ready for Backend & Bhashini Integration",
    consultation: "Consultation",
    joinConsultation: "Join Consultation",
    upcoming: "Upcoming",
    today: "Today",
    completed: "Completed",
    cancelled: "Cancelled",
    all: "All",
    filter: "Filter",
    status: "Status",
    actions: "Actions",
    confirm: "Confirm",
    close: "Close",
    loading: "Loading...",
    patientName: "Patient Name",
    mobileNumber: "Mobile Number",
    facilityName: "Facility Name",
    doctorName: "Doctor Name",
    specialty: "Specialty",
    date: "Date",
    timeSlot: "Time Slot",
    reason: "Reason",
    vitalSigns: "Vital Signs",
    medicalHistory: "Medical History",
    activeReferral: "Active Referral",
    consultationPrototype: "Consultation Prototype",
    simulatedVideoPreview: "Simulated Video Preview",
    webrtcIntegrationRequired: "Production WebRTC integration required",
    uidaiAbdmDisclaimer: "Prototype verification — backend UIDAI/ABDM integration required.",
  },
  hi: {
    appName: "निरामय-सेतु",
    tagline: "ग्रामीण स्वास्थ्य निरंतरता एवं क्लोज्ड-लूप रेफरल मंच",
    dashboard: "डैशबोर्ड",
    patients: "मरीज़",
    referrals: "रेफरल",
    facilities: "स्वास्थ्य केंद्र",
    notifications: "सूचनाएं",
    consent: "सहमति",
    sync: "सिंक केंद्र",
    settings: "सिस्टम सेटिंग्स",
    usersAndRoles: "उपयोगकर्ता एवं भूमिकाएं",
    auditLogs: "ऑडिट लॉग्स",
    logout: "लॉग आउट",
    login: "लॉग इन",
    register: "मरीज़ पंजीकरण",
    viewDetails: "विवरण देखें",
    save: "सुरक्षित करें",
    cancel: "रद्द करें",
    back: "वापस",
    search: "खोजें...",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    verified: "सत्यापित",
    pending: "प्रतीक्षारत",
    urgent: "अति आवश्यक",
    routine: "सामान्य",
    emergency: "आपातकालीन",
    doctorWorkspace: "चिकित्सक कार्यक्षेत्र",
    ashaWorkspace: "आशा / एएनएम फील्ड कार्य",
    facilityWorkspace: "अस्पताल संचालन",
    patientPortal: "मरीज़ स्वास्थ्य पोर्टल",
    adminPortal: "प्रशासनिक प्रबंधन",
    findNearbyHealthcare: "निकटतम स्वास्थ्य केंद्र खोजें",
    doctorDirectory: "डॉक्टर डायरेक्टरी",
    bookAppointment: "अपॉइंटमेंट बुक करें",
    myAppointments: "मेरे अपॉइंटमेंट्स",
    voiceAssistant: "ध्वनि सहायक",
    aboutUs: "निरामय-सेतु के बारे में",
    howItWorks: "यह कैसे कार्य करता है",
    accessRecordReferFollow: "पहुंच → रिकॉर्ड → रेफर → फॉलो-अप",
    prototypeNotice: "प्रोटोटाइप इंटरफ़ेस — बैकएंड और भाषिणी एकीकरण के लिए तैयार",
    consultation: "परामर्श",
    joinConsultation: "परामर्श में शामिल हों",
    upcoming: "आगामी",
    today: "आज",
    completed: "पूर्ण",
    cancelled: "रद्द",
    all: "सभी",
    filter: "फ़िल्टर",
    status: "स्थिति",
    actions: "कार्य",
    confirm: "पुष्टि करें",
    close: "बंद करें",
    loading: "लोड हो रहा है...",
    patientName: "मरीज़ का नाम",
    mobileNumber: "मोबाइल नंबर",
    facilityName: "स्वास्थ्य केंद्र का नाम",
    doctorName: "डॉक्टर का नाम",
    specialty: "विशेषज्ञता",
    date: "दिनांक",
    timeSlot: "समय स्लॉट",
    reason: "कारण",
    vitalSigns: "वाइटल संकेत",
    medicalHistory: "चिकित्सा इतिहास",
    activeReferral: "सक्रिय रेफरल",
    consultationPrototype: "परामर्श प्रोटोटाइप",
    simulatedVideoPreview: "सिम्युलेटेड वीडियो पूर्वावलोकन",
    webrtcIntegrationRequired: "प्रोडक्शन WebRTC एकीकरण आवश्यक",
    uidaiAbdmDisclaimer: "प्रोटोटाइप सत्यापन — बैकएंड UIDAI/ABDM एकीकरण आवश्यक।",
  },
  mr: {
    appName: "निरामय-सेतू",
    tagline: "ग्रामीण आरोग्य सातत्य आणि क्लोज्ड-लूप रेफरल व्यासपीठ",
    dashboard: "डॅशबोर्ड",
    patients: "रुग्ण",
    referrals: "रेफरल्स",
    facilities: "आरोग्य केंद्रे",
    notifications: "सूचना",
    consent: "संमती",
    sync: "सिंक केंद्र",
    settings: "प्रणाली सेटिंग्ज",
    usersAndRoles: "वापरकर्ते आणि भूमिका",
    auditLogs: "ऑडिट नोंदी",
    logout: "लॉग आउट",
    login: "लॉग इन",
    register: "रुग्ण नोंदणी",
    viewDetails: "तपशील पहा",
    save: "जतन करा",
    cancel: "रद्द करा",
    back: "मागे",
    search: "शोधा...",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",
    verified: "सत्यापित",
    pending: "प्रलंबित",
    urgent: "तातडीचे",
    routine: "नियमित",
    emergency: "तातडीची मदत",
    doctorWorkspace: "वैद्यकीय कार्यक्षेत्र",
    ashaWorkspace: "आशा / एएनएम क्षेत्रीय कार्य",
    facilityWorkspace: "रुग्णालय व्यवस्थापन",
    patientPortal: "रुग्ण आरोग्य पोर्टल",
    adminPortal: "प्रशासन व्यवस्थापन",
    findNearbyHealthcare: "जवळचे आरोग्य केंद्र शोधा",
    doctorDirectory: "डॉक्टर निर्देशिका",
    bookAppointment: "अपॉइंटमेंट बुक करा",
    myAppointments: "माझे अपॉइंटमेंट्स",
    voiceAssistant: "व्हॉइस असिस्टंट",
    aboutUs: "निरामय-सेतू बद्दल माहिती",
    howItWorks: "हे कसे कार्य करते",
    accessRecordReferFollow: "प्रवेश → नोंद → रेफर → पाठपुरावा",
    prototypeNotice: "प्रोटोटाइप इंटरफेस — बॅकएंड आणि भाषिणी एकात्मतेसाठी सज्ज",
    consultation: "सल्लामसलत",
    joinConsultation: "सल्ल्यामध्ये सामील व्हा",
    upcoming: "आगामी",
    today: "आज",
    completed: "पूर्ण",
    cancelled: "रद्द",
    all: "सर्व",
    filter: "फिल्टर",
    status: "स्थिती",
    actions: "कृती",
    confirm: "पुष्टी करा",
    close: "बंद करा",
    loading: "लोड होत आहे...",
    patientName: "रुग्णाचे नाव",
    mobileNumber: "मोबाईल नंबर",
    facilityName: "आरोग्य केंद्राचे नाव",
    doctorName: "डॉक्टरांचे नाव",
    specialty: "विशेषज्ञता",
    date: "तारीख",
    timeSlot: "वेळ स्लॉट",
    reason: "कारण",
    vitalSigns: "महत्वाची लक्षणे",
    medicalHistory: "वैद्यकीय इतिहास",
    activeReferral: "सक्रिय रेफरल",
    consultationPrototype: "सल्लामसलत प्रोटोटाइप",
    simulatedVideoPreview: "सिम्युलेटेड व्हिडिओ पूर्वावलोकन",
    webrtcIntegrationRequired: "उत्पादन WebRTC एकत्रीकरण आवश्यक",
    uidaiAbdmDisclaimer: "प्रोटोटाइप पडताळणी — बॅकएंड UIDAI/ABDM एकत्रीकरण आवश्यक.",
  },
};
