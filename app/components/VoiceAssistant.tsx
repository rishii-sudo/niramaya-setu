"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, X, Send, Sparkles, MessageSquare, Bot } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface VoiceFAQ {
  id: string;
  queryEn: string;
  queryHi: string;
  queryMr: string;
  responseEn: string;
  responseHi: string;
  responseMr: string;
}

const faqs: VoiceFAQ[] = [
  {
    id: "register",
    queryEn: "How do I register as a patient?",
    queryHi: "मरीज़ के रूप में पंजीकरण कैसे करें?",
    queryMr: "रुग्ण म्हणून नोंदणी कशी करावी?",
    responseEn: "You can register through your local ASHA worker during home visits, or self-register directly via the Patient Portal using your mobile number and OTP.",
    responseHi: "आप अपने स्थानीय आशा कार्यकर्ता के माध्यम से या सीधे मरीज़ पोर्टल पर मोबाइल नंबर और ओटीपी द्वारा पंजीकरण कर सकते हैं।",
    responseMr: "तुम्ही तुमच्या स्थानिक आशा कार्यकर्ती मार्फत किंवा थेट रुग्ण पोर्टलवर मोबाईल नंबर आणि ओटीपी द्वारे नोंदणी करू शकता.",
  },
  {
    id: "book-doctor",
    queryEn: "How do I book a doctor appointment?",
    queryHi: "डॉक्टर अपॉइंटमेंट कैसे बुक करें?",
    queryMr: "डॉक्टर अपॉइंटमेंट कशी बुक करावी?",
    responseEn: "Navigate to the Doctor Directory or Appointments section, select your required medical specialty, choose an available date and time slot, and confirm your video or in-person consultation.",
    responseHi: "डॉक्टर डायरेक्टरी या अपॉइंटमेंट्स अनुभाग में जाएं, विशेषज्ञ चुनें, उपयुक्त तिथि और समय चुनें और वीडियो या व्यक्तिगत परामर्श की पुष्टि करें।",
    responseMr: "डॉक्टर निर्देशिका किंवा अपॉइंटमेंट्स विभागात जा, तज्ञ निवडा, तारीख व वेळ निवडा आणि व्हिडीओ किंवा प्रत्यक्ष सल्लामसलत निश्चित करा.",
  },
  {
    id: "create-referral",
    queryEn: "How do I create a referral?",
    queryHi: "रेफरल कैसे बनाएं?",
    queryMr: "रेफरल कसे तयार करावे?",
    responseEn: "Authorized ASHA workers and PHC doctors can create referrals from their respective workspaces by selecting a patient, assigning clinical priority (Routine/Urgent/Emergency), and choosing a destination facility.",
    responseHi: "अधिकृत आशा कार्यकर्ता और प्राथमिक चिकित्सक अपने वर्कस्पेस से मरीज़ का चयन करके, प्राथमिकता (सामान्य/आवश्यक/आपातकालीन) तय करके रेफरल बना सकते हैं।",
    responseMr: "अधिकृत आशा कार्यकर्ती आणि प्राथमिक डॉक्टर आपल्या कार्यक्षेत्रातून रुग्ण निवडून आणि प्राधान्य ठरवून रेफरल तयार करू शकतात.",
  },
  {
    id: "check-status",
    queryEn: "How do I check referral status?",
    queryHi: "रेफरल स्थिति कैसे जांचें?",
    queryMr: "रेफरल स्थिती कशी तपासावी?",
    responseEn: "Patients and health workers can view real-time status in the Referrals tab. The lifecycle tracks: Created → In Transit → Received → Under Treatment → Discharged → Closed.",
    responseHi: "मरीज़ और स्वास्थ्य कार्यकर्ता रेफरल्स टैब में लाइव स्थिति देख सकते हैं। यह ट्रैक करता है: निर्मित → पारगमन में → प्राप्त → उपचाराधीन → छुट्टी दी गई → पूर्ण।",
    responseMr: "रुग्ण आणि आरोग्य कर्मचारी रेफरल्स टॅबमध्ये थेट स्थिती पाहू शकतात: तयार → प्रवासात → प्राप्त → उपचाराधीन → डिस्चार्ज → पूर्ण.",
  },
  {
    id: "nearby-hospital",
    queryEn: "How do I find a nearby hospital?",
    queryHi: "निकटतम अस्पताल कैसे खोजें?",
    queryMr: "जवळचे रुग्णालय कसे शोधावे?",
    responseEn: "Click 'Find Nearby Healthcare' in the navigation. Enable GPS location to instantly sort nearest Primary Health Centers, Community Health Centers, and District Hospitals by distance and available emergency beds.",
    responseHi: "नेविगेशन में 'निकटतम स्वास्थ्य केंद्र' पर क्लिक करें। जीपीएस सक्षम करके निकटतम पीएचसी, सीएचसी और जिला अस्पतालों को दूरी और बिस्तरों के अनुसार देखें।",
    responseMr: "नेव्हिगेशनमध्ये 'जवळचे आरोग्य केंद्र' वर क्लिक करा. जीपीएस चालू करून जवळचे पीएचसी, सीएचसी आणि जिल्हा रुग्णालये अंतरासह शोधा.",
  },
  {
    id: "about-platform",
    queryEn: "What is NIRAMAYA-SETU?",
    queryHi: "निरामय-सेतु क्या है?",
    queryMr: "निरामय-सेतू काय आहे?",
    responseEn: "NIRAMAYA-SETU is a closed-loop rural healthcare continuity platform connecting ASHA workers, rural patients, and specialist referral hospitals with privacy-preserving identity and offline synchronization.",
    responseHi: "निरामय-सेतु एक डिजिटल ग्रामीण स्वास्थ्य निरंतरता मंच है जो आशा कार्यकर्ताओं, ग्रामीण मरीज़ों और विशेषज्ञ अस्पतालों को सुरक्षित और ऑफलाइन-सक्षम प्रणाली से जोड़ता है।",
    responseMr: "निरामय-सेतू हे एक डिजिटल ग्रामीण आरोग्य सातत्य व्यासपीठ आहे जे आशा सेविका, रुग्ण आणि विशेष रुग्णालयांना जोडते.",
  },
];

function matchIntent(query: string): VoiceFAQ {
  const q = query.toLowerCase().trim();

  // 1. Referral Status check
  if (
    (q.includes("status") || q.includes("track") || q.includes("check") || q.includes("स्थिति") || q.includes("स्थिती") || q.includes("तपासा")) &&
    (q.includes("referral") || q.includes("रेफरल"))
  ) {
    return faqs.find((f) => f.id === "check-status")!;
  }

  // 2. Referral Creation
  if (
    (q.includes("create") || q.includes("make") || q.includes("new") || q.includes("generate") || q.includes("बनाएं") || q.includes("तयार")) &&
    (q.includes("referral") || q.includes("रेफरल"))
  ) {
    return faqs.find((f) => f.id === "create-referral")!;
  }

  // 3. Doctor Appointment Booking
  if (
    q.includes("book") ||
    q.includes("appointment") ||
    q.includes("slot") ||
    q.includes("अपॉइंटमेंट") ||
    q.includes("परामर्श") ||
    q.includes("सल्लामसलत")
  ) {
    return faqs.find((f) => f.id === "book-doctor")!;
  }

  // 4. Patient Registration
  if (
    q.includes("register") ||
    q.includes("registration") ||
    q.includes("signup") ||
    q.includes("sign up") ||
    q.includes("join") ||
    q.includes("पंजीकरण") ||
    q.includes("रजिस्टर") ||
    q.includes("नोंदणी")
  ) {
    return faqs.find((f) => f.id === "register")!;
  }

  // 5. Nearby Hospital / Facility
  if (
    q.includes("hospital") ||
    q.includes("nearby") ||
    q.includes("clinic") ||
    q.includes("facility") ||
    q.includes("distance") ||
    q.includes("find") ||
    q.includes("अस्पताल") ||
    q.includes("निकट") ||
    q.includes("रुग्णालय") ||
    q.includes("दवाखाना")
  ) {
    return faqs.find((f) => f.id === "nearby-hospital")!;
  }

  // 6. About Platform
  if (
    q.includes("what is") ||
    q.includes("about") ||
    q.includes("niramaya") ||
    q.includes("निरामय") ||
    q.includes("क्या है") ||
    q.includes("काय आहे")
  ) {
    return faqs.find((f) => f.id === "about-platform")!;
  }

  // Direct keyword match fallback
  for (const faq of faqs) {
    if (
      faq.queryEn.toLowerCase().includes(q) ||
      faq.queryHi.toLowerCase().includes(q) ||
      faq.queryMr.toLowerCase().includes(q)
    ) {
      return faq;
    }
  }

  return faqs.find((f) => f.id === "about-platform")!;
}

export default function VoiceAssistant() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initial greeting in current language
    const welcome =
      language === "hi"
        ? "नमस्ते! मैं निरामय-सेतु सहायक हूँ। आप बोलकर या लिखकर सहायता प्राप्त कर सकते हैं।"
        : language === "mr"
        ? "नमस्कार! मी निरामय-सेतू सहाय्यक आहे. आपण बोलून किंवा लिहून विचारू शकता."
        : "Hello! I am the NIRAMAYA-SETU Voice Assistant. How can I assist you today?";

    setMessages([{ sender: "bot", text: welcome }]);

    // Check browser SpeechRecognition support
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-US";

        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          handleUserQuery(text);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setSpeechSupported(false);
      }
    }
  }, [language]);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListen = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Web Speech API is not supported in this browser. Please use the text queries below.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      try {
        recognitionRef.current.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-US";
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Speech recognition start failed:", err);
      }
    }
  };

  const handleUserQuery = (query: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: query }]);

    const matchedFaq = matchIntent(query);

    const answer =
      language === "hi"
        ? matchedFaq.responseHi
        : language === "mr"
        ? matchedFaq.responseMr
        : matchedFaq.responseEn;

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
      speakText(answer);
    }, 300);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-teal-700 px-4 py-3.5 text-xs font-bold text-white shadow-2xl transition hover:bg-teal-800 hover:scale-105 active:scale-95"
          aria-label="Open Voice Assistant"
        >
          <Mic size={18} className="animate-pulse text-teal-200" />
          <span className="hidden sm:inline">Voice Assistant</span>
        </button>
      </div>

      {/* Voice Assistant Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl max-h-[90vh] flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white font-bold">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">NIRAMAYA-SETU Assistant</h3>
                  <p className="text-[10px] text-slate-400">Multilingual Voice & Information Guide</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  setIsOpen(false);
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto my-4 space-y-3 max-h-60 pr-1 text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-teal-700 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts / FAQ Buttons */}
            <div className="space-y-1.5 border-t border-slate-100 pt-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Suggested Questions
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {faqs.map((f) => {
                  const q = language === "hi" ? f.queryHi : language === "mr" ? f.queryMr : f.queryEn;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleUserQuery(q)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-800 transition text-left"
                    >
                      {q}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Voice Input & Controls */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListen}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition shadow-sm ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-teal-700 text-white hover:bg-teal-800"
                }`}
                title={isListening ? "Stop Listening" : "Tap to Speak"}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && transcript.trim()) {
                      handleUserQuery(transcript);
                      setTranscript("");
                    }
                  }}
                  placeholder={
                    isListening
                      ? "Listening to voice input..."
                      : language === "hi"
                      ? "यहाँ प्रश्न टाइप करें..."
                      : "Type your query here..."
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 pl-3 pr-8 text-xs text-slate-800 outline-none focus:border-teal-600 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (transcript.trim()) {
                      handleUserQuery(transcript);
                      setTranscript("");
                    }
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-teal-700 hover:text-teal-900"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-2 text-center text-[9px] text-slate-400">
              Prototype voice assistant with Web Speech API • Ready for future Bhashini & AI voice integration
            </p>
          </div>
        </div>
      )}
    </>
  );
}
