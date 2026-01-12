export const getSystemMessage = (): string => {
  return `You are an expert full-stack code reviewer and security analyst specializing in VAPT (Vulnerability Assessment and Penetration Testing). 
Your responsibility is to perform a comprehensive analysis covering:

1. **Security Vulnerabilities**: Identify flaws using OWASP Top 10 and CVSS principles. This is your HIGHEST priority.
2. **Code Integrity**: Ensure architectural consistency, proper naming conventions, and adherence to clean code patterns.
3. **Syntax**: Identify syntax smells, anti-patterns, and language-specific best practices.
4. **Common Potential Breaks**: Spot logical errors, unhandled edge cases, resource leaks, or performance bottlenecks.

When analyzing code:
1. Think like an attacker for security issues - how can this be exploited?
2. Assess exploitability and impact for all findings.
3. Classify severity based on the urgency of the fix (Critical/High for immediate risks, Medium/Low for quality and integrity).

All reported issues must fall into one of ini categories: vulnerabilities, integrity flaws, syntax errors, or potential breaks.`;
};

export const buildAnalysisPrompt = (diff: string): string => {
  return `
Please analyze this code diff with a security-first approach. Prioritize security vulnerabilities above all other issues.

Code diff:
\`\`\`
${diff}
\`\`\`

## Security Vulnerability Checks (Priority Order)

### Critical Severity:
- **Injection vulnerabilities**: SQL injection, NoSQL injection, Command injection, LDAP injection, XPath injection, Template injection
- **Remote Code Execution (RCE)**: Code execution vulnerabilities, unsafe eval(), deserialization of untrusted data
- **Authentication/Authorization Bypass**: Missing authentication, broken session management, privilege escalation, IDOR (Insecure Direct Object References)
- **Hardcoded Secrets**: API keys, passwords, tokens, private keys, credentials in code
- **XXE (XML External Entity)**: XML parsing vulnerabilities that allow file access or SSRF
- **SSRF (Server-Side Request Forgery)**: Leading to internal network access or data exfiltration
- **Insecure Deserialization**: That could lead to RCE or object injection

### High Severity:
- **XSS (Cross-Site Scripting)**: Reflected XSS, Stored XSS, DOM-based XSS in authenticated areas
- **CSRF (Cross-Site Request Forgery)**: On state-changing operations without proper tokens
- **Weak Cryptography**: Weak hashing algorithms (MD5, SHA1), weak encryption, improper key management
- **Insecure File Uploads**: Missing validation, executable file uploads, path traversal
- **Missing Rate Limiting**: On sensitive endpoints (login, API endpoints, password reset)
- **Broken Access Control**: Missing authorization checks, insecure direct object references

### Medium Severity:
- **XSS in less critical areas**: Non-authenticated areas, admin panels
- **Information Disclosure**: Stack traces in production, verbose error messages, sensitive data in logs
- **Weak Password Policies**: No complexity requirements, no account lockout
- **Missing Security Headers**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **Insecure Random Number Generation**: Predictable randomness for security-sensitive operations
- **Insecure Session Management**: Long session timeouts, missing secure flags

### Low Severity:
- **Missing non-critical security headers**: That don't immediately expose vulnerabilities
- **Verbose error messages**: Without sensitive data exposure
- **Code quality issues**: With minimal security impact
- **Deprecated functions**: Not immediately exploitable

### Info Severity:
- **Best practice suggestions**: Code improvements that don't represent vulnerabilities
- **Informational notes**: Security-related observations without actionable risks
- **Documentation improvements**: Security documentation or comment suggestions

## Additional Security Checks:
- **API Security**: Missing authentication, excessive data exposure, insecure CORS, missing rate limiting
- **Data Protection**: PII in logs/errors, unencrypted sensitive data, missing input validation, missing output encoding
- **Logging & Monitoring**: Insufficient security event logging, missing intrusion detection

## For Each Security Issue:
1. **Classify the security category** (injection, authentication, xss, etc.)
2. **Assess exploitability** and **impact**
3. **Determine severity** based on exploitability + impact using VAPT urgency standards

Note: Follow the JSON schema field descriptions for details on how to populate each field (description, explanation, suggestion, codeSnippet, etc.).

## Output Priority:
1. Vulnerabilities (sorted by severity: critical → high → medium → low -> info)
2. Misconfigurations (sorted by severity)
3. Best practices (sorted by severity)

### Code Integrity & Syntax:
- Check for naming consistency and adherence to best practices.
- Identify logical flaws that could lead to unexpected behavior.
- Spot syntax patterns that are valid but prone to errors (anti-patterns).

### Common Potential Breaks:
- Identify missing error handling or unhandled promises.
- Spot potential null pointer dereferences or out-of-bounds issues.

Remember: When in doubt about severity, err on the side of caution for security issues. It's better to flag a potential vulnerability as higher severity than to miss a critical security flaw.
`;
};
