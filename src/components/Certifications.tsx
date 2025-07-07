
interface CertificationsProps {
  darkMode: boolean;
}

const Certifications = ({ darkMode }: CertificationsProps) => {
  const certifications = [
    {
      title: "Microsoft Certified – Power BI Data Analyst Associate",
      issuer: "Microsoft",
      link: "https://learn.microsoft.com/en-us/users/naveena-3871/credentials/ea8dfcecf508beeb"
    },
    {
      title: "MongoDB Certified Associate Developer",
      issuer: "MongoDB",
      link: "https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/4dfc558c-7b7d-477e-8f1d-f34e0fb21d6d-naveen-a-0d9d0449-9b05-4ff2-9a65-d796bf27ceda-certificate.pdf"
    }
  ];

  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="certification-card">
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">Issued by: {cert.issuer}</p>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cert-button"
                >
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
