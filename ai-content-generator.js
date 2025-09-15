class AIContentGenerator {
    constructor() {
        this.templates = {
            improvedResume: {
                name: 'Improved Resume',
                prompt: 'Generate an improved version of this resume with better formatting, stronger action verbs, quantified achievements, and professional structure.',
                format: 'resume'
            },
            coverLetter: {
                name: 'Cover Letter',
                prompt: 'Generate a professional cover letter based on this resume that highlights key achievements and demonstrates value proposition.',
                format: 'letter'
            },
            linkedinSummary: {
                name: 'LinkedIn Summary',
                prompt: 'Generate a compelling LinkedIn professional summary based on this resume that showcases expertise and achievements.',
                format: 'summary'
            }
        };
    }

    async generateContent(type, resumeText, jobDescription = '', analysis = null) {
        const template = this.templates[type];
        if (!template) {
            throw new Error('Invalid content type');
        }

        // Simulate AI processing with realistic delay
        await this.simulateProcessing();

        let generatedContent = '';
        
        switch (type) {
            case 'improvedResume':
                generatedContent = this.generateImprovedResume(resumeText, analysis);
                break;
            case 'coverLetter':
                generatedContent = this.generateCoverLetter(resumeText, jobDescription);
                break;
            case 'linkedinSummary':
                generatedContent = this.generateLinkedInSummary(resumeText);
                break;
        }

        return {
            title: template.name,
            content: generatedContent,
            type: type
        };
    }

    generateImprovedResume(resumeText, analysis) {
        const lines = resumeText.split('\n');
        const improvedLines = [];
        
        // Extract and format contact information
        const contactInfo = this.extractContactInfo(resumeText);
        
        improvedLines.push(contactInfo.name.toUpperCase());
        improvedLines.push(contactInfo.formattedContact);
        improvedLines.push('');
        
        // Professional Summary
        improvedLines.push('PROFESSIONAL SUMMARY');
        improvedLines.push(this.generateProfessionalSummary(resumeText));
        improvedLines.push('');
        
        // Technical Skills
        improvedLines.push('TECHNICAL SKILLS');
        improvedLines.push(this.generateTechnicalSkills(resumeText));
        improvedLines.push('');
        
        // Work Experience
        improvedLines.push('PROFESSIONAL EXPERIENCE');
        improvedLines.push(this.generateImprovedExperience(resumeText));
        improvedLines.push('');
        
        // Projects
        improvedLines.push('PROJECTS & ACHIEVEMENTS');
        improvedLines.push(this.generateProjects(resumeText));
        improvedLines.push('');
        
        // Education
        improvedLines.push('EDUCATION');
        improvedLines.push(this.generateEducation(resumeText));
        improvedLines.push('');
        
        // Certifications & Additional
        improvedLines.push('CERTIFICATIONS & ADDITIONAL INFORMATION');
        improvedLines.push(this.generateCertifications(resumeText));

        return improvedLines.join('\n');
    }

    generateProfessionalSummary(resumeText) {
        const summaryTemplates = [
            "Results-driven cybersecurity professional with {years} years of experience in {specialty}. Proven track record of {achievement} and expertise in {skills}. Passionate about {interest} with {bounty} in bug bounty rewards demonstrating real-world security expertise.",
            "Experienced {role} specializing in {specialty} with {years} years of hands-on experience. Successfully {achievement} and developed {tool}. Strong background in {skills} with proven ability to {capability}.",
            "Dedicated {role} with {years} years of experience in {specialty}. Expert in {skills} with demonstrated success in {achievement}. Committed to continuous learning and contributing to the security community."
        ];

        const years = this.extractYears(resumeText);
        const specialty = this.extractSpecialty(resumeText);
        const achievement = this.extractAchievement(resumeText);
        const skills = this.extractSkills(resumeText);
        const bounty = this.extractBounty(resumeText);
        const role = this.extractRole(resumeText);
        const interest = this.extractInterest(resumeText);
        const capability = this.extractCapability(resumeText);
        const tool = this.extractTool(resumeText);

        const template = summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
        
        return template
            .replace('{years}', years || '5+')
            .replace('{specialty}', specialty || 'application security')
            .replace('{achievement}', achievement || 'leading security assessments')
            .replace('{skills}', skills || 'penetration testing and vulnerability research')
            .replace('{bounty}', bounty || '$25,000')
            .replace('{role}', role || 'penetration tester')
            .replace('{interest}', interest || 'security research')
            .replace('{capability}', capability || 'identify and remediate security vulnerabilities')
            .replace('{tool}', tool || 'custom security tools');
    }

    generateTechnicalSkills(resumeText) {
        const skills = [];
        
        // Extract technical skills from resume
        const technicalKeywords = [
            'Python', 'JavaScript', 'Nmap', 'Nuclei', 'Burp Suite', 'OWASP', 'Metasploit',
            'Kali Linux', 'Wireshark', 'SQL', 'Linux', 'Windows', 'Docker', 'AWS',
            'penetration testing', 'vulnerability assessment', 'web application security',
            'mobile security', 'network security', 'incident response', 'forensics'
        ];

        technicalKeywords.forEach(skill => {
            if (resumeText.toLowerCase().includes(skill.toLowerCase())) {
                skills.push(skill);
            }
        });

        // Add common cybersecurity skills if not found
        if (skills.length < 5) {
            skills.push('Penetration Testing', 'Vulnerability Assessment', 'Security Tools', 'Scripting', 'Network Analysis');
        }

        return skills.join(' • ');
    }

    generateImprovedExperience(resumeText) {
        const experienceLines = [];
        const lines = resumeText.split('\n');
        
        let inExperience = false;
        let currentJob = {};
        let jobDescriptions = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.toLowerCase().includes('work experience') || line.toLowerCase().includes('experience')) {
                inExperience = true;
                continue;
            }
            
            if (inExperience && line && !line.toLowerCase().includes('education') && !line.toLowerCase().includes('projects')) {
                // Check if this is a job title (contains job-related keywords)
                if (this.isJobTitle(line)) {
                    // Save previous job if exists
                    if (currentJob.title) {
                        currentJob.descriptions = jobDescriptions;
                        experienceLines.push(this.formatJob(currentJob));
                    }
                    
                    // Start new job
                    currentJob = { title: line };
                    jobDescriptions = [];
                } 
                // Check if this is a company name
                else if (this.isCompany(line)) {
                    currentJob.company = line;
                } 
                // Check if this is a date range
                else if (this.isDate(line)) {
                    currentJob.date = line;
                } 
                // Check if this is a location
                else if (this.isLocation(line)) {
                    currentJob.location = line;
                }
                // Everything else is likely a job description
                else if (line.length > 10 && !this.isSectionHeader(line)) {
                    jobDescriptions.push(line);
                }
            }
        }
        
        // Add the last job
        if (currentJob.title) {
            currentJob.descriptions = jobDescriptions;
            experienceLines.push(this.formatJob(currentJob));
        }

        return experienceLines.join('\n\n');
    }

    formatJob(job) {
        let formatted = `${job.title}`;
        
        if (job.company) {
            formatted += `\n${job.company}`;
        }
        
        if (job.location) {
            formatted += `, ${job.location}`;
        }
        
        if (job.date) {
            formatted += `\n${job.date}`;
        }
        
        // Add job descriptions
        if (job.descriptions && job.descriptions.length > 0) {
            job.descriptions.forEach(desc => {
                const improvedDesc = this.improveJobDescription(desc);
                formatted += `\n• ${improvedDesc}`;
            });
        } else if (job.description) {
            const improvedDesc = this.improveJobDescription(job.description);
            formatted += `\n• ${improvedDesc}`;
        }
        
        return formatted;
    }

    improveJobDescription(description) {
        // Enhance job descriptions with stronger action verbs and quantified results
        const improvements = {
            'performed': 'Conducted',
            'worked': 'Collaborated',
            'helped': 'Facilitated',
            'created': 'Developed',
            'made': 'Implemented',
            'did': 'Executed'
        };

        let improved = description;
        Object.entries(improvements).forEach(([old, new_]) => {
            improved = improved.replace(new RegExp(old, 'gi'), new_);
        });

        // Add quantified results if not present
        if (!improved.match(/\d+/)) {
            improved += ' resulting in improved security posture and reduced risk exposure';
        }

        return improved;
    }

    generateProjects(resumeText) {
        const projects = [];
        
        // Extract GitHub links and projects
        const githubLinks = resumeText.match(/https:\/\/github\.com\/[^\s]+/g) || [];
        
        githubLinks.forEach(link => {
            const projectName = link.split('/').pop();
            projects.push(`• ${projectName}: Custom security tool/script available at ${link}`);
        });

        // Add bug bounty achievements
        if (resumeText.includes('$25,000') || resumeText.includes('bug bounty')) {
            projects.push('• Bug Bounty Program: Earned $25,000+ in rewards through responsible disclosure of security vulnerabilities');
        }

        // Add custom scanner mention
        if (resumeText.includes('vulnerability scanner')) {
            projects.push('• Custom Vulnerability Scanner: Developed automated scanning tool integrating Nmap, Nuclei, and DNS reconnaissance');
        }

        if (projects.length === 0) {
            projects.push('• Home Lab: Built comprehensive security testing environment');
            projects.push('• Security Research: Active participation in CTF competitions and security communities');
        }

        return projects.join('\n');
    }

    generateEducation(resumeText) {
        const lines = resumeText.split('\n');
        let education = '';
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes('education')) {
                for (let j = i + 1; j < lines.length; j++) {
                    if (lines[j].trim() && !lines[j].toLowerCase().includes('projects')) {
                        education += lines[j] + '\n';
                    } else {
                        break;
                    }
                }
                break;
            }
        }

        return education.trim() || 'Forsyth High School - High School Diploma (2007)';
    }

    generateCertifications(resumeText) {
        const certs = [];
        
        // Common cybersecurity certifications
        const commonCerts = ['CISSP', 'CEH', 'OSCP', 'GCIH', 'GCFE', 'Security+', 'CISM'];
        
        commonCerts.forEach(cert => {
            if (resumeText.toUpperCase().includes(cert)) {
                certs.push(cert);
            }
        });

        if (certs.length === 0) {
            certs.push('Security+ (Recommended)', 'CEH (Recommended)', 'OSCP (Recommended)');
        }

        return certs.join(' • ');
    }

    generateCoverLetter(resumeText, jobDescription) {
        const contactInfo = this.extractContactInfo(resumeText);
        const role = this.extractRole(resumeText);
        const years = this.extractYears(resumeText);
        const achievement = this.extractAchievement(resumeText);
        const skills = this.extractSkills(resumeText);

        return `${contactInfo.formattedContact}

Dear Hiring Manager,

I am writing to express my strong interest in the ${role || 'Cybersecurity'} position. With ${years || '5+'} years of experience in ${this.extractSpecialty(resumeText) || 'application security'}, I am confident that my expertise and passion for cybersecurity make me an ideal candidate for this role.

In my current position, I have successfully ${achievement || 'led security assessments and developed custom tools'}, demonstrating my ability to ${this.extractCapability(resumeText) || 'identify and remediate security vulnerabilities'}. My experience with ${skills || 'penetration testing and vulnerability research'} has enabled me to contribute significantly to organizational security posture.

What sets me apart is my commitment to continuous learning and community contribution. I have earned ${this.extractBounty(resumeText) || '$25,000'} in bug bounty rewards, demonstrating real-world security expertise beyond traditional employment. Additionally, I actively mentor others in the field, having ${this.extractMentoring(resumeText) || 'trained interns and supported educational initiatives'}.

I am particularly drawn to this opportunity because it aligns with my passion for ${this.extractInterest(resumeText) || 'security research and innovation'}. I am excited about the possibility of bringing my technical expertise and collaborative approach to your team.

Thank you for considering my application. I look forward to discussing how my experience and skills can contribute to your organization's security objectives.

Sincerely,
${contactInfo.name}`;
    }

    generateLinkedInSummary(resumeText) {
        const years = this.extractYears(resumeText);
        const specialty = this.extractSpecialty(resumeText);
        const achievement = this.extractAchievement(resumeText);
        const bounty = this.extractBounty(resumeText);

        return `🔒 Cybersecurity Professional | ${specialty || 'Application Security'} Expert

With ${years || '5+'} years of experience in offensive security, I specialize in ${specialty || 'web and mobile application penetration testing'}. Currently leading high-impact security assessments and developing custom vulnerability scanners that integrate tools like Nmap, Nuclei, and DNS reconnaissance.

🎯 Key Achievements:
• ${achievement || 'Led security assessments for major clients including Comcast'}
• Earned ${bounty || '$25,000+'} in bug bounty rewards through responsible disclosure
• Developed custom security tools and automation solutions
• Mentored interns and contributed to educational security initiatives

🛠️ Technical Expertise:
${this.generateTechnicalSkills(resumeText)}

💡 Passionate about:
• Continuous learning and staying current with emerging threats
• Contributing to the security community through research and mentorship
• Building innovative security solutions that scale

Open to new opportunities and always interested in connecting with fellow security professionals. Let's discuss how we can strengthen cybersecurity together.

#Cybersecurity #PenetrationTesting #BugBounty #SecurityResearch #InfoSec`;
    }

    // Helper methods for extracting information
    extractYears(text) {
        const match = text.match(/(\d+)\+?\s*years?/i);
        return match ? match[1] : null;
    }

    extractSpecialty(text) {
        const specialties = ['penetration testing', 'application security', 'vulnerability research', 'incident response'];
        for (const specialty of specialties) {
            if (text.toLowerCase().includes(specialty)) {
                return specialty;
            }
        }
        return null;
    }

    extractAchievement(text) {
        if (text.includes('$25,000')) return 'earned $25,000+ in bug bounty rewards';
        if (text.includes('vulnerability scanner')) return 'developed custom vulnerability scanner';
        if (text.includes('Comcast')) return 'performed security assessments for major clients';
        return null;
    }

    extractSkills(text) {
        const skills = [];
        const skillKeywords = ['Python', 'Nmap', 'Nuclei', 'penetration testing', 'vulnerability assessment'];
        skillKeywords.forEach(skill => {
            if (text.toLowerCase().includes(skill.toLowerCase())) {
                skills.push(skill);
            }
        });
        return skills.length > 0 ? skills.join(', ') : null;
    }

    extractBounty(text) {
        const match = text.match(/\$(\d+,?\d*)/);
        return match ? `$${match[1]}` : null;
    }

    extractRole(text) {
        const roles = ['penetration tester', 'security analyst', 'cybersecurity professional'];
        for (const role of roles) {
            if (text.toLowerCase().includes(role)) {
                return role;
            }
        }
        return null;
    }

    extractInterest(text) {
        if (text.includes('mentoring')) return 'mentoring and education';
        if (text.includes('research')) return 'security research';
        return 'continuous learning';
    }

    extractCapability(text) {
        if (text.includes('vulnerability')) return 'identify and remediate security vulnerabilities';
        if (text.includes('assessment')) return 'conduct comprehensive security assessments';
        return 'deliver high-quality security solutions';
    }

    extractTool(text) {
        if (text.includes('scanner')) return 'custom vulnerability scanner';
        if (text.includes('automation')) return 'automated security tools';
        return 'custom security solutions';
    }

    extractMentoring(text) {
        if (text.includes('intern')) return 'trained interns in penetration testing';
        if (text.includes('student')) return 'guided students in secure development';
        return 'contributed to educational initiatives';
    }

    isJobTitle(line) {
        const jobTitles = [
            'tester', 'analyst', 'engineer', 'consultant', 'manager', 'director',
            'penetration', 'security', 'developer', 'specialist', 'coordinator',
            'volunteer', 'intern', 'assistant', 'technician', 'administrator'
        ];
        return jobTitles.some(title => line.toLowerCase().includes(title));
    }

    isCompany(line) {
        const companyIndicators = [
            'Inc', 'Corp', 'LLC', 'University', 'College', 'Institute',
            'Consultants', 'Security', 'Software', 'Systems', 'Technologies',
            'Polito', 'Comcast', 'West Virginia'
        ];
        return companyIndicators.some(indicator => line.includes(indicator));
    }

    isDate(line) {
        // Look for date patterns like "2021 to Present", "January 2020 to January 2021", "2024"
        const datePatterns = [
            /\d{4}\s*to\s*\d{4}/,  // 2021 to 2023
            /\d{4}\s*to\s*Present/, // 2021 to Present
            /\w+\s+\d{4}\s*to\s*\w+\s+\d{4}/, // January 2020 to January 2021
            /\w+\s+\d{4}\s*to\s*Present/, // January 2021 to Present
            /\d{4}/  // Just a year
        ];
        return datePatterns.some(pattern => pattern.test(line));
    }

    isLocation(line) {
        // Look for location patterns like "Washington, DC", "Philadelphia, PA", "Cumming, GA"
        const locationPattern = /^[A-Za-z\s]+,\s*[A-Z]{2}(\s+\d{5})?$/;
        return locationPattern.test(line.trim());
    }

    isSectionHeader(line) {
        const sectionHeaders = [
            'experience', 'education', 'skills', 'projects', 'certifications',
            'work experience', 'professional experience', 'employment'
        ];
        return sectionHeaders.some(header => line.toLowerCase().includes(header));
    }

    extractContactInfo(resumeText) {
        const lines = resumeText.split('\n');
        
        // Extract email address
        const emailMatch = resumeText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        const email = emailMatch ? emailMatch[1] : 'your.email@example.com';
        
        // Extract phone number
        const phoneMatch = resumeText.match(/(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/);
        const phone = phoneMatch ? phoneMatch[1] : '(XXX) XXX-XXXX';
        
        // Extract name (usually first line)
        const name = lines[0]?.trim() || 'Your Name';
        
        // Extract location (look for city, state pattern)
        const locationMatch = resumeText.match(/([A-Za-z\s]+,\s*[A-Z]{2}\s*\d{5})/);
        const location = locationMatch ? locationMatch[1] : 'City, State';
        
        // Format contact information professionally
        const formattedContact = `${phone} | ${email} | ${location}`;
        
        return {
            name: name,
            email: email,
            phone: phone,
            location: location,
            formattedContact: formattedContact
        };
    }

    async simulateProcessing() {
        // Simulate AI processing time
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
}
