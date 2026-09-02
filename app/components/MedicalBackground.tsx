export default function MedicalBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(13,148,136,0.10),transparent_28%),radial-gradient(circle_at_88%_14%,rgba(14,165,233,0.08),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(20,184,166,0.07),transparent_35%)]" />

      {/* ================= LEFT DNA ================= */}
      <svg
        className="absolute -left-20 top-16 h-[570px] w-[290px] opacity-[0.09]"
        viewBox="0 0 290 570"
        fill="none"
      >
        <path
          d="M72 0C228 78 228 180 72 255C-16 298-16 420 72 570"
          stroke="#1599A5"
          strokeWidth="3"
        />

        <path
          d="M218 0C62 78 62 180 218 255C306 298 306 420 218 570"
          stroke="#168CB5"
          strokeWidth="3"
        />

        <line x1="75" y1="35" x2="215" y2="35" stroke="#61BDC7" strokeWidth="2" />
        <line x1="55" y1="80" x2="235" y2="80" stroke="#61BDC7" strokeWidth="2" />
        <line x1="49" y1="125" x2="241" y2="125" stroke="#61BDC7" strokeWidth="2" />
        <line x1="55" y1="170" x2="235" y2="170" stroke="#61BDC7" strokeWidth="2" />
        <line x1="75" y1="215" x2="215" y2="215" stroke="#61BDC7" strokeWidth="2" />

        <line x1="75" y1="275" x2="215" y2="275" stroke="#61BDC7" strokeWidth="2" />
        <line x1="55" y1="320" x2="235" y2="320" stroke="#61BDC7" strokeWidth="2" />
        <line x1="49" y1="365" x2="241" y2="365" stroke="#61BDC7" strokeWidth="2" />
        <line x1="55" y1="410" x2="235" y2="410" stroke="#61BDC7" strokeWidth="2" />
        <line x1="75" y1="455" x2="215" y2="455" stroke="#61BDC7" strokeWidth="2" />
        <line x1="100" y1="500" x2="190" y2="500" stroke="#61BDC7" strokeWidth="2" />
        <line x1="120" y1="540" x2="170" y2="540" stroke="#61BDC7" strokeWidth="2" />
      </svg>

      {/* ================= TOP MOLECULES ================= */}
      <svg
        className="absolute right-0 top-0 h-[300px] w-[580px] opacity-[0.08]"
        viewBox="0 0 580 300"
        fill="none"
      >
        <g stroke="#1596B3" strokeWidth="2">
          <path d="M20 80L105 45L180 90L255 40L335 75L425 30L555 85" />
          <path d="M105 45L125 125L180 90L215 170L290 140L335 75" />
          <path d="M335 75L365 155L425 30L478 145L555 85" />
        </g>

        <g
          fill="#E8F9FA"
          stroke="#1596B3"
          strokeWidth="2"
        >
          <circle cx="20" cy="80" r="9" />
          <circle cx="105" cy="45" r="10" />
          <circle cx="180" cy="90" r="10" />
          <circle cx="255" cy="40" r="9" />
          <circle cx="335" cy="75" r="10" />
          <circle cx="425" cy="30" r="10" />
          <circle cx="555" cy="85" r="9" />

          <circle cx="125" cy="125" r="8" />
          <circle cx="215" cy="170" r="8" />
          <circle cx="290" cy="140" r="8" />
          <circle cx="365" cy="155" r="8" />
          <circle cx="478" cy="145" r="8" />
        </g>
      </svg>

      {/* ================= RIGHT MOLECULAR CLUSTER ================= */}
      <svg
        className="absolute right-[16%] top-[31%] h-[230px] w-[300px] opacity-[0.05]"
        viewBox="0 0 300 230"
        fill="none"
      >
        <g stroke="#0EA5A5" strokeWidth="2">
          <path d="M30 70L95 25L170 65L245 30" />
          <path d="M95 25L105 135L170 65L210 175L245 30" />
        </g>

        <g
          fill="#EFFCFC"
          stroke="#0EA5A5"
          strokeWidth="2"
        >
          <circle cx="30" cy="70" r="9" />
          <circle cx="95" cy="25" r="10" />
          <circle cx="170" cy="65" r="10" />
          <circle cx="245" cy="30" r="9" />
          <circle cx="105" cy="135" r="8" />
          <circle cx="210" cy="175" r="8" />
        </g>
      </svg>

      {/* ================= HOSPITAL ================= */}
      <svg
        className="absolute right-[-25px] top-[20%] h-[320px] w-[450px] opacity-[0.055]"
        viewBox="0 0 450 320"
        fill="none"
      >
        <path
          d="M35 275V118L128 65L220 118V275"
          stroke="#0C8796"
          strokeWidth="5"
        />

        <path
          d="M220 275V140L315 92L410 135V275"
          stroke="#0C8796"
          strokeWidth="5"
        />

        <path
          d="M90 275V178H148V275"
          stroke="#0C8796"
          strokeWidth="5"
        />

        <path
          d="M260 275V178H310V275"
          stroke="#0C8796"
          strokeWidth="5"
        />

        <path
          d="M105 130H151"
          stroke="#0C8796"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d="M128 107V153"
          stroke="#0C8796"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d="M325 150H358"
          stroke="#0C8796"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M341.5 133V167"
          stroke="#0C8796"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M10 275H440"
          stroke="#0C8796"
          strokeWidth="5"
        />
      </svg>

      {/* ================= LAB FLASK ================= */}
      <svg
        className="absolute -right-16 bottom-8 h-[280px] w-[330px] opacity-[0.06]"
        viewBox="0 0 330 280"
        fill="none"
      >
        <path
          d="M130 18H200"
          stroke="#0B8C99"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M151 18V78L78 195C57 229 84 258 123 258H207C246 258 273 229 252 195L179 78V18"
          stroke="#0B8C99"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        <path
          d="M89 181C130 163 187 211 244 181"
          stroke="#0B8C99"
          strokeWidth="4"
        />

        <circle
          cx="127"
          cy="153"
          r="7"
          fill="#0B8C99"
        />

        <circle
          cx="187"
          cy="175"
          r="6"
          fill="#0B8C99"
        />

        <circle
          cx="155"
          cy="211"
          r="7"
          fill="#0B8C99"
        />
      </svg>

      {/* ================= BOTTOM LEFT MOLECULES ================= */}
      <svg
        className="absolute bottom-[-55px] left-[-55px] h-[330px] w-[400px] opacity-[0.055]"
        viewBox="0 0 400 330"
        fill="none"
      >
        <g stroke="#12A0AE" strokeWidth="2">
          <path d="M30 95L108 45L185 92L260 48L355 110" />
          <path d="M108 45L123 162L185 92L210 215L260 48" />
          <path d="M185 92L298 180L355 110" />
        </g>

        <g
          fill="#ECFBFC"
          stroke="#12A0AE"
          strokeWidth="2"
        >
          <circle cx="30" cy="95" r="10" />
          <circle cx="108" cy="45" r="11" />
          <circle cx="185" cy="92" r="10" />
          <circle cx="260" cy="48" r="10" />
          <circle cx="355" cy="110" r="10" />
          <circle cx="123" cy="162" r="9" />
          <circle cx="210" cy="215" r="9" />
          <circle cx="298" cy="180" r="9" />
        </g>
      </svg>

      {/* ================= MEDICAL PLUS SIGNS ================= */}
      <div className="absolute left-[9%] top-[39%] text-[90px] font-light leading-none text-teal-600 opacity-[0.045]">
        +
      </div>

      <div className="absolute right-[12%] top-[46%] text-[105px] font-light leading-none text-sky-500 opacity-[0.04]">
        +
      </div>

      <div className="absolute left-[43%] bottom-[15%] text-[75px] font-light leading-none text-teal-500 opacity-[0.04]">
        +
      </div>

      <div className="absolute right-[35%] top-[16%] text-[55px] font-light leading-none text-teal-500 opacity-[0.035]">
        +
      </div>

      {/* ================= ECG ================= */}
      <svg
        className="absolute bottom-[8%] right-[11%] h-[110px] w-[320px] opacity-[0.065]"
        viewBox="0 0 320 110"
        fill="none"
      >
        <path
          d="M5 63H60L73 62L87 57L101 83L117 18L134 63H175L187 60L200 56L214 70L229 37L242 63H315"
          stroke="#0B9FA8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ================= SOFT WAVES ================= */}
      <div className="absolute -bottom-64 left-1/2 h-[430px] w-[1250px] -translate-x-1/2 rounded-[50%] border border-teal-400/10 bg-teal-300/[0.03]" />

      <div className="absolute -bottom-80 left-1/2 h-[460px] w-[1550px] -translate-x-1/2 rounded-[50%] border border-cyan-400/[0.07]" />

      <div className="absolute -bottom-96 left-1/2 h-[480px] w-[1800px] -translate-x-1/2 rounded-[50%] border border-teal-400/[0.05]" />

      {/* Very soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-teal-50/10" />
    </div>
  );
}