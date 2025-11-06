"use client"
import React from "react"

const TermsPage = () => (
  <main
    style={{ maxWidth: 700, margin: "0 auto", padding: "200px 2rem 2rem 2rem" }}
  >
    <h1>Terms and conditions</h1>
    <p>
      <strong>Last Updated:</strong> 2024-04-24
    </p>
    <p>
      By using Dexie Cloud, our business clients agree to comply with and be
      bound by the following terms and conditions:
    </p>
    <h2>1. Client Responsibilities</h2>
    <p>
      Business clients are responsible for maintaining the confidentiality of
      their account information and for all activities that occur under their
      accounts.
    </p>
    <h2>2. Provision of Services</h2>
    <p>
      Dexie Cloud agrees to provide cloud services to our business clients as
      outlined in the service agreement.
    </p>
    <h2>3. Intellectual Property</h2>
    <p>
      Dexie Cloud’s intellectual property is protected, and business clients may
      only use it within the scope of the agreed-upon services.
    </p>
    <h2>4. Service Availability</h2>
    <p>
      Dexie Cloud strives to ensure uninterrupted service, but we do not
      guarantee continuous availability and may schedule maintenance as needed.
    </p>
    <h2>5. Client Software</h2>
    <p>
      Business clients may use client software provided by Dexie Cloud,
      including CLI tools, management apps, and web clients, to access and
      interact with the services. The use of such client software is subject to
      the terms and conditions of its respective licenses.
    </p>
    <h2>6. Data Security</h2>
    <p>
      Dexie Cloud implements industry-standard security measures to protect
      client data. However, business clients are responsible for ensuring the
      security of their own data and for implementing appropriate access
      controls.
    </p>
    <h2>7. Data Ownership</h2>
    <p>
      Business clients retain ownership of the data they store and manage using
      Dexie Cloud. Dexie Cloud does not claim ownership of any client data.
    </p>
    <h2>8. Termination</h2>
    <p>
      Dexie Cloud reserves the right to terminate or suspend services for
      business clients for violation of these terms.
    </p>
    <h2>9. Limitation of Liability</h2>
    <p>
      Dexie Cloud is not liable for any direct, indirect, incidental, or
      consequential damages arising from the use or inability to use our
      services.
    </p>
    <h2>10. Governing Law</h2>
    <p>
      These terms are governed by the laws of Sweden. Any disputes will be
      resolved in the courts of Sweden.
    </p>
    <p>
      Feel free to further customize these templates based on your specific
      business model, industry regulations, and legal advice.
    </p>
    <hr style={{ margin: "2rem 0" }} />
    <footer style={{ fontSize: "0.95em", color: "#666" }}>
      <p>
        <strong>Dexie.js - A Minimalistic Wrapper for IndexedDB</strong>
      </p>
      <p>
        © 2014-{new Date().getFullYear()} Dexie.js is the creation of David
        Fahlander and managed by Awarica AB.
      </p>
    </footer>
  </main>
)

export default TermsPage
