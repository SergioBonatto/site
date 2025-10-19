'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Nav } from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import styles from '../experiencia/experience.module.css';
import local from './classified.module.css';

function ClassifiedContent() {
  useEffect(() => {
    // Easter egg no console
    console.clear();
    console.log('%c⚠️ UNAUTHORIZED ACCESS DETECTED ⚠️', 'color: #ff0000; font-size: 20px; font-weight: bold; background: #000; padding: 10px;');
    console.log('%cISB Security Protocol Engaged', 'color: #ff6600; font-size: 14px; background: #000; padding: 5px;');
    console.log('%cThis access has been logged and reported to Intelligence Operations Division.', 'color: #ffcc00; font-size: 12px; background: #000; padding: 5px;');
    console.log('%cIP Address: [REDACTED]', 'color: #cccccc; font-size: 11px; background: #000; padding: 3px;');
    console.log('%cLocation: [REDACTED]', 'color: #cccccc; font-size: 11px; background: #000; padding: 3px;');
    console.log('%cTimestamp: ' + new Date().toISOString(), 'color: #cccccc; font-size: 11px; background: #000; padding: 3px;');

    // Permite seleção de texto normalmente

    // Intercepta cópia
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      const warning =
        'SECURITY ALERT: Attempted copy operation detected.\n' +
        'This document contains classified technical intelligence.\n' +
        'All copy actions are monitored and logged.\n' +
        'Unauthorized dissemination of this content constitutes a severe security breach and will trigger incident response protocols.';
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', warning);
      }
    };
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return null;
}

export default function ClassifiedPage() {
  return (
    <div className={styles.pageWrapper}>
      <ClassifiedContent />
      <Nav />

      <main
        className={local.classifiedBody}
      >
        {/* PAGE 1 */}
        <div className="document">
          <div className="watermark">TOP SECRET</div>

          <div className="header">
            <div style={{ margin: '0 auto 15px', width: '100px', height: '100px', position: 'relative' }}>
              <Image
                src="/classified.png"
                alt="ISB Seal"
                width={100}
                height={100}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>INTERNATIONAL SECURITY BUREAU</div>
            <div style={{ fontSize: '12px' }}>Intelligence Operations Division</div>
          </div>

          <div className="classification">TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>

          <div className="metadata">
            <div className="metadata-row"><strong>DOCUMENT ID:</strong> IOD-<span className="redacted">████████████</span>-BNT</div>
            <div className="metadata-row"><strong>DATE OF ASSESSMENT:</strong> <span className="redacted">██</span> March 2024</div>
            <div className="metadata-row"><strong>CONTROL NUMBER:</strong> <span className="redacted">████████████████</span></div>
            <div className="metadata-row"><strong>ORIGINATING STATION:</strong> <span className="redacted">████████████████</span></div>
            <div className="metadata-row"><strong>DISTRIBUTION:</strong> Eyes Only - <span className="redacted">█████████████████████</span></div>
          </div>

          <h1>Subject: Field Operative Assessment - BONATTO, Sergio</h1>

          <div className="warning-box">
            <strong>HANDLING NOTICE:</strong> This document contains sensitive intelligence concerning an active field operative. Unauthorized disclosure may compromise ongoing operations and result in <span className="redacted">██████████████████████</span>. Leak detection markers embedded. <span className="redacted">████████████████████████████████</span>.
          </div>

          <h2>I. Executive Summary</h2>
          <div className="content-section">
            Subject BONATTO, Sergio (Cryptonym: <span className="redacted">██████████</span>) operates as a deep-cover technical operative specializing in <span className="redacted">████████████████████████████</span> and cryptographic systems deployment. Current assignment involves <span className="redacted">████████████████████████████████████████</span> with focus on decentralized <span className="redacted">██████████</span> infrastructure penetration. Subject maintains <span className="redacted">████████████</span> operational security and demonstrates <span className="redacted">████████</span>-level technical proficiency. No compromise indicators detected as of <span className="redacted">████████████</span>.
          </div>

          <div className="classification" style={{ marginTop: '60px' }}>TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px' }}>Page 1 of 5</div>
        </div>

        {/* PAGE 2 */}
        <div className="document" style={{ marginTop: '40px' }}>
          <div className="watermark">TOP SECRET</div>
          <div className="classification">TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>

          <h2>II. Identifying Information</h2>
          <div className="content-section">
            <div className="bullet"><strong>True Name:</strong> BONATTO, Sergio <span className="redacted">████████████</span></div>
            <div className="bullet"><strong>Cover Identity:</strong> Independent Software Developer</div>
            <div className="bullet"><strong>Date of Birth:</strong> <span className="redacted">██/██/████</span></div>
            <div className="bullet"><strong>Place of Birth:</strong> <span className="redacted">████████████████</span>, Brazil</div>
            <div className="bullet"><strong>Current Location:</strong> <span className="redacted">████████████████████████</span></div>
            <div className="bullet"><strong>Operational Area:</strong> <span className="redacted">██████████████████████████████</span></div>
            <div className="bullet"><strong>Operational Status:</strong> Active / Non-Official Cover (NOC)</div>
            <div className="bullet"><strong>Recruitment Date:</strong> <span className="redacted">████████████</span></div>
            <div className="bullet"><strong>Handler:</strong> <span className="redacted">████████████████████████</span></div>
            <div className="bullet"><strong>Contact Protocol:</strong> <span className="redacted">████████████████████████████████</span></div>
          </div>

          <h2>III. Operational Background</h2>
          <div className="content-section">
            Subject was identified in <span className="redacted">████</span> during technical surveillance of <span className="redacted">████████████████████████████</span> networks. Demonstrated exceptional capabilities in <span className="redacted">████████████████</span> architecture and zero-knowledge proof systems. Following <span className="redacted">████</span> months of evaluation, subject was <span className="redacted">████████████████████</span> and successfully recruited under Operation <span className="redacted">████████████████</span>.
          </div>

          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '97%' }} />

          <div className="content-section">
            Primary mission objectives include:
            <div className="bullet">• Infiltration of <span className="redacted">████████████████████████████</span> development communities</div>
            <div className="bullet">• Technical surveillance and <span className="redacted">████████████████</span> of cryptocurrency payment systems</div>
            <div className="bullet">• Development of <span className="redacted">████████████████████████</span> for collection purposes</div>
            <div className="bullet">• <span className="redacted">████████████████████████████████████████████████</span></div>
            <div className="bullet">• <span className="redacted">████████████████████████████████████████████████</span></div>
          </div>

          <div className="classification" style={{ marginTop: '60px' }}>TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px' }}>Page 2 of 5</div>
        </div>

        {/* PAGE 3 */}
        <div className="document" style={{ marginTop: '40px' }}>
          <div className="watermark">TOP SECRET</div>
          <div className="classification">TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>

          <h2>IV. Technical Capabilities & Assets</h2>
          <div className="content-section">
            <strong>Cover Project - &quot;</strong><span className="redacted">████████████</span><strong>&quot;:</strong> Subject operates a <span className="redacted">████████████████</span> decentralized payments protocol as cover for intelligence operations. System provides <span className="redacted">████████████</span> for monitoring transaction flows across <span className="redacted">████</span> different cryptocurrency networks. Reported user base of approximately <span className="redacted">████████</span> entities, majority unaware of <span className="redacted">████████████████████</span> capabilities.
          </div>

          <span className="redacted-block" />

          <div className="content-section">
            <strong>Technical Skills (Classification: </strong><span className="redacted">████████████████</span><strong>):</strong>
            <div className="bullet">• Cryptographic protocol design and <span className="redacted">████████████████</span></div>
            <div className="bullet">• Smart contract development across <span className="redacted">████</span> blockchain platforms</div>
            <div className="bullet">• Zero-knowledge proof systems <span className="redacted">████████████████</span></div>
            <div className="bullet">• <span className="redacted">████████████████████████████████████████</span></div>
            <div className="bullet">• Covert communications infrastructure</div>
            <div className="bullet">• <span className="redacted">████████████████████████████████████████</span></div>
          </div>

          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '93%' }} />

          <div className="classification" style={{ marginTop: '60px' }}>TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px' }}>Page 3 of 5</div>
        </div>

        {/* PAGE 4 */}
        <div className="document" style={{ marginTop: '40px' }}>
          <div className="watermark">TOP SECRET</div>
          <div className="classification">TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>

          <h2>V. Current Operations</h2>
          <div className="content-section">
            <strong>Operation <span className="redacted">████████████</span> (Active):</strong> Subject has successfully embedded collection capabilities within <span className="redacted">████████████████</span> infrastructure used by <span className="redacted">████████████████████████████</span> organizations across <span className="redacted">████</span> countries. Monthly intelligence yield averages <span className="redacted">████████</span> actionable reports to <span className="redacted">████████████</span> and Financial Intelligence Unit.
          </div>

          <span className="redacted-block" />

          <div className="content-section">
            <strong>Secondary Tasking:</strong> Technical consultation on <span className="redacted">████████████████████████████████████████</span>. Subject provided critical vulnerability assessments leading to successful <span className="redacted">████████████████</span> operations in <span className="redacted">████████</span> and <span className="redacted">████████</span>.
          </div>

          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />

          <h2>VI. Security Assessment</h2>
          <div className="content-section">
            <strong>OPSEC Rating:</strong> <span className="redacted">████████████</span><br />
            <strong>Compromise Risk:</strong> <span className="redacted">████</span><br />
            <strong>Reliability Score:</strong> <span className="redacted">████</span>/100<br />
            <strong>Last Security Review:</strong> <span className="redacted">████████████</span>
            <br /><br />
            Subject maintains rigorous operational security. No indicators of hostile surveillance detected. Cover remains intact with strong <span className="redacted">████████████████</span> standing. Communications follow established protocols with <span className="redacted">████</span> breaches recorded.
          </div>

          <span className="redacted-block" />

          <div className="content-section">
            <strong>Counterintelligence Notes:</strong> Subject has been approached by <span className="redacted">████████████████████</span> intelligence services on <span className="redacted">████</span> occasions. All contacts were reported and handled appropriately. <span className="redacted">████████████████████████████████████████████████████████</span>. No evidence of recruitment attempts by hostile services.
          </div>

          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '88%' }} />

          <div className="classification" style={{ marginTop: '60px' }}>TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px' }}>Page 4 of 5</div>
        </div>

        {/* PAGE 5 */}
        <div className="document" style={{ marginTop: '40px' }}>
          <div className="watermark">TOP SECRET</div>
          <div className="classification">TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>

          <h2>VII. Recommendations</h2>
          <div className="content-section">
            <div className="bullet">1. Continue current operational tasking <span className="redacted">████████████████████</span></div>
            <div className="bullet">2. Approve budget increase for <span className="redacted">████████████████████████████</span> expansion</div>
            <div className="bullet">3. <span className="redacted">████████████████████████████████████████████████████</span></div>
            <div className="bullet">4. Maintain <span className="redacted">████████████</span> assessment schedule</div>
            <div className="bullet">5. <span className="redacted">████████████████████████████████████████████████████████████</span></div>
            <div className="bullet">6. <span className="redacted">████████████████████████████████████████████████████████████</span></div>
          </div>

          <h2>VIII. Threat Assessment</h2>
          <div className="content-section">
            Primary threat vector remains potential technical attribution through <span className="redacted">████████████████████</span> artifacts. Subject&apos;s public profile requires careful management to prevent <span className="redacted">████████████████████████</span>. Recommend continued use of <span className="redacted">████████████████████████</span> protocols and limiting direct contact to <span className="redacted">████████████████</span> situations only.
          </div>

          <span className="redacted-block" />

          <div className="warning-box" style={{ marginTop: '40px' }}>
            <strong>CRITICAL:</strong> Subject operates under Non-Official Cover. If compromised, Bureau will disavow all knowledge. Emergency exfiltration procedures: <span className="redacted">████████████████████████████████████</span>. Contact protocols: <span className="redacted">████████████████████████████</span>. Safehouse locations: <span className="redacted">████████████████████████████████████████</span>.
          </div>

          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '100%' }} />
          <span className="redacted-line" style={{ width: '95%' }} />

          <div className="footer">
            <div className="signature-line">
              <span className="redacted">████████████████████████</span><br />
              Chief, Technical Operations Division<br />
              Intelligence Operations Division
            </div>

            <div className="signature-line">
              <span className="redacted">████████████████████████</span><br />
              Deputy Director for Intelligence Operations
            </div>

            <div style={{ marginTop: '30px', fontSize: '9px' }}>
              <strong>DESTRUCTION NOTICE:</strong> When no longer needed, this document must be destroyed by <span className="redacted">████████████████</span>. Electronic copies must be permanently deleted using <span className="redacted">████████████████</span> approved methods.
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '10px' }}>
              <strong>CLASSIFIED BY:</strong> <span className="redacted">████████████████████</span><br />
              <strong>REASON:</strong> 1.4(a), 1.4(c), 1.4(d)<br />
              <strong>DECLASSIFY ON:</strong> <span className="redacted">████████████████</span> or upon death of subject
            </div>
          </div>

          <div className="classification" style={{ marginTop: '60px' }}>TOP SECRET // SPECIAL ACCESS REQUIRED // NOFORN</div>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px' }}>Page 5 of 5</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
