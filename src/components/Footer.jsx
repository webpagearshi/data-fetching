import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaChartBar,
  FaGithub,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/arshisaleh/",
    icon: FaLinkedinIn,
  },
  {
    name: "GitHub",
    url: "https://github.com/webpagearshi",
    icon: FaGithub,
  },
  {
    name: "Twitter",
    url: "https://x.com/SalehArshi",
    icon: FaTwitter,
  },
  {
    name: "Tableau",
    url: "https://public.tableau.com/app/profile/arshisaleh/vizzes",
    icon: FaChartBar,
  },
];

export default function Footer({ dataSourceName, dataSourceUrl }) {
  return (
    <footer style={{ width: "100%", padding: "0 32px" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "Nunito, sans-serif",
        }}
      >
        {/* Row 1: Data source and icon credit */}
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            margin: 0,
          }}
        >
          Data source:{" "}
          <a
            href={dataSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#6b7280" }}
          >
            {dataSourceName}
          </a>
          <span style={{ margin: "0 8px" }}>·</span>
          Heat icon:{" "}
          <a
            href="https://www.flaticon.com/free-icons/heat"
            target="_blank"
            rel="noopener noreferrer"
            title="heat icons"
            style={{ color: "#6b7280" }}
          >
            Fantasyou - Flaticon
          </a>
        </p>

        {/* Row 2: Design credit */}
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            margin: "10px 0 0 0",
          }}
        >
          Designed by{" "}
          <span style={{ fontWeight: 700, color: "#374151" }}>Arshi Saleh</span>
        </p>

        {/* Row 3: Social links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "28px",
            marginTop: "20px",
          }}
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                style={{ color: "#6b7280" }}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
