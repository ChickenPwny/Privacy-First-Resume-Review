class TemplateManager {
    constructor() {
        this.templates = {
            'mit-sloan': {
                name: 'MIT Sloan',
                description: 'Academic & MBA format following MIT Sloan guidelines',
                format: {
                    font: 'Times New Roman',
                    fontSize: '10pt',
                    margins: '0.5" top/bottom, 0.65" left/right',
                    bullets: 'Circle bullets',
                    length: '1 page maximum',
                    sections: ['Contact Information', 'Education', 'Experience', 'Additional Information']
                },
                requirements: [
                    'Contact: Name, Phone, MIT email',
                    'School name exactly as specified',
                    'Times New Roman 10pt font',
                    'Circle bullets',
                    'Specific margins',
                    'No periods at end of bullets',
                    'No sub-bullets',
                    'Dates in years only (except internships)',
                    'Write out numbers zero to ten',
                    'U.S. locations: city, state',
                    'International locations: city, country'
                ],
                sample: `FIRST (NICKNAME) LAST
(XXX)XXX-XXXX | student.email@mit.edu

EDUCATION
MIT SLOAN SCHOOL OF MANAGEMENT                    Cambridge, MA
Candidate for MBA, June 2023                      2021 – Present
• Pursuing Finance Track, intended concentration in Capital Markets
• Clubs: Technology, Product Management, and Sloan Women in Management Clubs

BOSTON UNIVERSITY                                  Boston, MA
BA in Economics                                    2011 – 2016
• Graduated cum laude
• Study Abroad at Oxford University in Oxford, UK (Spring 2015)

EXPERIENCE
SKODA Bratislava, Slovakia
Largest automobile manufacturer in Slovakia, with annual sales of $5B
Senior Financial Analyst                           2019 – 2021
• Managed financial and accounting analysis for eastern European region ($400M in revenue)
• Led validation project on $8B variable annuity model, resulting in correction of model errors

Financial Analyst                                  2017 – 2019
• Analyzed quarterly financial reports for three business units
• Developed forecasting models that improved accuracy by fifteen percent

ADDITIONAL INFORMATION
• Languages: Fluent in Slovak, conversational in German
• Computer Skills: R, Stata, Python, SQL
• Certifications: CFA Level II Candidate
• Interests: Amateur gluten-free chef, John Grisham enthusiast`
            },
            'cybersecurity': {
                name: 'Cybersecurity Professional',
                description: 'InfoSec format optimized for security roles',
                format: {
                    font: 'Arial or Calibri',
                    fontSize: '11pt',
                    margins: '1" all around',
                    bullets: 'Standard bullets',
                    length: '1-2 pages',
                    sections: ['Contact', 'Summary', 'Technical Skills', 'Experience', 'Education', 'Certifications', 'Projects']
                },
                requirements: [
                    'Include personal projects and home lab work',
                    'Highlight CTF participation',
                    'List relevant certifications',
                    'Use strong action verbs',
                    'Quantify achievements',
                    'Include technical skills section',
                    'Show continuous learning',
                    'Demonstrate hands-on experience'
                ],
                sample: `JOHN SMITH
john.smith@email.com | (555) 123-4567 | linkedin.com/in/johnsmith
GitHub: github.com/johnsmith | Blog: securityblog.com

SUMMARY
Cybersecurity professional with five years of experience in incident response and threat hunting. 
Specialized in industrial control systems security and digital forensics. Passionate about 
continuous learning and contributing to the security community through CTF competitions and 
personal projects.

TECHNICAL SKILLS
• Operating Systems: Windows, Linux (CentOS, Ubuntu), macOS
• Security Tools: Splunk, Wireshark, YARA, Volatility, Autopsy
• Programming: Python, PowerShell, Bash, SQL
• Certifications: CISSP, GCIH, GCFE, OSCP

EXPERIENCE
ABC Security Corp                                   2020 – Present
Senior Incident Response Analyst
• Led investigation of advanced persistent threat affecting industrial control systems
• Developed automated threat hunting queries that reduced detection time by forty percent
• Mentored three junior analysts and created training materials for new team members

XYZ Technology Inc                                  2018 – 2020
Security Operations Center Analyst
• Monitored security events across enterprise network of ten thousand endpoints
• Responded to security incidents with average resolution time of two hours
• Implemented new SIEM rules that improved threat detection by twenty-five percent

PROJECTS
• Home Lab: Built comprehensive security lab with vulnerable machines and monitoring tools
• CTF Competitions: Participated in fifteen competitions, placed in top ten percent
• Security Blog: Maintain blog documenting security research and techniques
• Open Source: Contributed to Volatility framework and YARA rules repository

EDUCATION
University of Technology                            2014 – 2018
Bachelor of Science in Computer Science
• Concentration in Cybersecurity
• Relevant Coursework: Network Security, Digital Forensics, Cryptography

CERTIFICATIONS
• Certified Information Systems Security Professional (CISSP) - 2021
• GIAC Certified Incident Handler (GCIH) - 2020
• GIAC Certified Forensic Examiner (GCFE) - 2019
• Offensive Security Certified Professional (OSCP) - 2018`
            },
            'tech-industry': {
                name: 'Tech Industry',
                description: 'Software engineering and technology roles',
                format: {
                    font: 'Arial or Helvetica',
                    fontSize: '11pt',
                    margins: '1" all around',
                    bullets: 'Standard bullets',
                    length: '1-2 pages',
                    sections: ['Contact', 'Summary', 'Skills', 'Experience', 'Education', 'Projects']
                },
                requirements: [
                    'Include GitHub profile',
                    'List programming languages and frameworks',
                    'Show project portfolio',
                    'Quantify technical achievements',
                    'Include relevant coursework',
                    'Highlight open source contributions'
                ],
                sample: `JANE DOE
jane.doe@email.com | (555) 987-6543 | linkedin.com/in/janedoe
GitHub: github.com/janedoe | Portfolio: janedoe.dev

SUMMARY
Full-stack software engineer with four years of experience building scalable web applications. 
Expertise in React, Node.js, and cloud technologies. Passionate about clean code and 
user experience design.

SKILLS
• Languages: JavaScript, Python, Java, TypeScript, SQL
• Frontend: React, Vue.js, HTML5, CSS3, Sass
• Backend: Node.js, Express, Django, Spring Boot
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes
• Tools: Git, Jenkins, Jira, Figma

EXPERIENCE
TechCorp Solutions                                 2020 – Present
Senior Software Engineer
• Led development of microservices architecture serving one million daily users
• Implemented CI/CD pipeline reducing deployment time by sixty percent
• Mentored three junior developers and conducted code reviews

StartupXYZ                                         2019 – 2020
Full-Stack Developer
• Built responsive web application using React and Node.js
• Optimized database queries improving page load times by forty percent
• Collaborated with design team to implement user interface mockups

PROJECTS
• E-commerce Platform: Full-stack application with payment integration
• Task Management App: Real-time collaboration features using WebSockets
• Open Source: Contributed to React and Node.js communities

EDUCATION
State University                                   2015 – 2019
Bachelor of Science in Computer Science
• GPA: 3.8/4.0
• Relevant Coursework: Data Structures, Algorithms, Software Engineering`
            },
            'consulting': {
                name: 'Consulting',
                description: 'Business consulting and strategy roles',
                format: {
                    font: 'Times New Roman or Arial',
                    fontSize: '11pt',
                    margins: '1" all around',
                    bullets: 'Standard bullets',
                    length: '1 page',
                    sections: ['Contact', 'Summary', 'Experience', 'Education', 'Additional']
                },
                requirements: [
                    'Quantify business impact',
                    'Use consulting-specific action verbs',
                    'Highlight analytical skills',
                    'Include relevant coursework',
                    'Show leadership experience',
                    'Demonstrate problem-solving abilities'
                ],
                sample: `MICHAEL JOHNSON
michael.johnson@email.com | (555) 456-7890 | linkedin.com/in/michaeljohnson

SUMMARY
Management consultant with three years of experience in strategy and operations. 
Specialized in digital transformation and process optimization for Fortune 500 companies. 
Strong analytical skills and proven track record of delivering measurable results.

EXPERIENCE
McKinsey & Company                                 2021 – Present
Business Analyst
• Led digital transformation initiative for retail client, resulting in twenty percent cost reduction
• Developed market entry strategy for technology company expanding to European markets
• Conducted comprehensive operational assessment identifying $50M in cost savings opportunities

Deloitte Consulting                                2019 – 2021
Strategy Consultant
• Analyzed supply chain operations for manufacturing client, improving efficiency by fifteen percent
• Created financial models for merger and acquisition transactions totaling $2B
• Facilitated workshops with C-suite executives to define strategic priorities

EDUCATION
Harvard Business School                            2017 – 2019
Master of Business Administration
• Concentration in Strategy and Operations
• Dean's List, Beta Gamma Sigma Honor Society

University of Pennsylvania                         2013 – 2017
Bachelor of Science in Economics
• Magna Cum Laude, Phi Beta Kappa
• Relevant Coursework: Statistics, Econometrics, Financial Analysis

ADDITIONAL INFORMATION
• Languages: Fluent in Spanish, conversational in French
• Certifications: CFA Level I, Six Sigma Green Belt
• Volunteer: Pro bono consulting for local non-profit organizations`
            },
            'creative': {
                name: 'Creative',
                description: 'Design, marketing, and creative roles',
                format: {
                    font: 'Modern sans-serif',
                    fontSize: '11pt',
                    margins: '0.75" all around',
                    bullets: 'Creative bullets or dashes',
                    length: '1-2 pages',
                    sections: ['Contact', 'Portfolio', 'Experience', 'Skills', 'Education']
                },
                requirements: [
                    'Include portfolio link',
                    'Show creative process',
                    'Highlight design skills',
                    'Include relevant software',
                    'Demonstrate creativity',
                    'Show project variety'
                ],
                sample: `SARAH WILSON
sarah.wilson@email.com | (555) 321-9876 | sarahwilson.design
Portfolio: behance.net/sarahwilson | Dribbble: dribbble.com/sarahwilson

PORTFOLIO HIGHLIGHTS
• Brand Identity for Tech Startup - Increased brand recognition by thirty percent
• Mobile App Design - Featured in App Store's "Best New Apps"
• Website Redesign - Improved conversion rate by twenty-five percent

EXPERIENCE
Creative Agency Inc                                2020 – Present
Senior UX/UI Designer
• Designed user interfaces for mobile and web applications serving five hundred thousand users
• Led design system implementation across product portfolio
• Collaborated with development teams using Agile methodology

Freelance Designer                                  2018 – 2020
Brand & Web Designer
• Created brand identities for fifteen small businesses
• Designed responsive websites with average page load time under two seconds
• Managed client relationships and project timelines

SKILLS
• Design: Adobe Creative Suite, Figma, Sketch, InVision
• Prototyping: Principle, Framer, Adobe XD
• Development: HTML, CSS, JavaScript (basic)
• Research: User interviews, usability testing, competitive analysis

EDUCATION
Art Institute of Design                            2014 – 2018
Bachelor of Fine Arts in Graphic Design
• Concentration in Digital Media
• Portfolio featured in annual student exhibition`
            },
            'traditional': {
                name: 'Traditional',
                description: 'General professional format',
                format: {
                    font: 'Times New Roman or Arial',
                    fontSize: '11pt',
                    margins: '1" all around',
                    bullets: 'Standard bullets',
                    length: '1-2 pages',
                    sections: ['Contact', 'Objective/Summary', 'Experience', 'Education', 'Skills']
                },
                requirements: [
                    'Professional formatting',
                    'Clear section headers',
                    'Consistent formatting',
                    'Strong action verbs',
                    'Quantified achievements',
                    'Relevant skills'
                ],
                sample: `ROBERT BROWN
robert.brown@email.com | (555) 654-3210 | linkedin.com/in/robertbrown

PROFESSIONAL SUMMARY
Results-driven professional with five years of experience in project management and 
business operations. Proven track record of improving processes and leading cross-functional 
teams to achieve organizational goals.

EXPERIENCE
Global Solutions Inc                               2019 – Present
Project Manager
• Managed fifteen concurrent projects with combined budget of $2M
• Led cross-functional teams of eight to twelve members
• Implemented new project management software, improving team efficiency by thirty percent

Regional Business Corp                             2017 – 2019
Operations Coordinator
• Coordinated daily operations for regional office with fifty employees
• Developed standard operating procedures reducing processing time by twenty percent
• Managed vendor relationships and negotiated contracts saving company $100K annually

EDUCATION
State University                                   2013 – 2017
Bachelor of Business Administration
• Major: Business Management
• Minor: Information Systems
• GPA: 3.6/4.0

SKILLS
• Project Management: Agile, Scrum, Waterfall methodologies
• Software: Microsoft Office Suite, Salesforce, SAP
• Languages: Fluent in English, conversational in Spanish
• Certifications: PMP (Project Management Professional)`
            }
        };
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Template selection buttons (top section)
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const templateType = e.currentTarget.dataset.template;
                this.selectTemplate(templateType);
            });
        });

        // Template selection buttons (bottom section)
        document.querySelectorAll('.template-btn-bottom').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const templateType = e.currentTarget.dataset.template;
                this.selectTemplateBottom(templateType);
            });
        });

        // Template action buttons (top section)
        document.getElementById('downloadTemplate')?.addEventListener('click', () => {
            this.downloadTemplate();
        });

        document.getElementById('useTemplate')?.addEventListener('click', () => {
            this.useTemplate();
        });

        // Template action buttons (bottom section)
        document.getElementById('downloadTemplateBottom')?.addEventListener('click', () => {
            this.downloadTemplateBottom();
        });

        document.getElementById('useTemplateBottom')?.addEventListener('click', () => {
            this.useTemplateBottom();
        });
    }

    selectTemplate(templateType) {
        const template = this.templates[templateType];
        if (!template) return;

        // Update active button
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-template="${templateType}"]`).classList.add('active');

        // Show template preview
        this.showTemplatePreview(template);
    }

    showTemplatePreview(template) {
        const previewSection = document.getElementById('templatePreview');
        const previewContent = document.getElementById('previewContent');

        previewContent.innerHTML = `
            <div class="template-info">
                <h4>${template.name}</h4>
                <p>${template.description}</p>
            </div>
            <div class="template-format">
                <h5>Format Requirements:</h5>
                <ul>
                    <li><strong>Font:</strong> ${template.format.font}</li>
                    <li><strong>Size:</strong> ${template.format.fontSize}</li>
                    <li><strong>Margins:</strong> ${template.format.margins}</li>
                    <li><strong>Bullets:</strong> ${template.format.bullets}</li>
                    <li><strong>Length:</strong> ${template.format.length}</li>
                </ul>
            </div>
            <div class="template-requirements">
                <h5>Key Requirements:</h5>
                <ul>
                    ${template.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            <div class="template-sample">
                <h5>Sample Format:</h5>
                <pre>${template.sample}</pre>
            </div>
        `;

        previewSection.style.display = 'block';
        previewSection.scrollIntoView({ behavior: 'smooth' });
    }

    downloadTemplate() {
        const activeTemplate = document.querySelector('.template-btn.active');
        if (!activeTemplate) return;

        const templateType = activeTemplate.dataset.template;
        const template = this.templates[templateType];
        
        // Create a text file with the template
        const blob = new Blob([template.sample], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${template.name.toLowerCase().replace(' ', '-')}-template.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    useTemplate() {
        const activeTemplate = document.querySelector('.template-btn.active');
        if (!activeTemplate) return;

        const templateType = activeTemplate.dataset.template;
        const template = this.templates[templateType];
        
        // Create a modal or form to help user customize the template
        this.showTemplateCustomizer(template);
    }

    showTemplateCustomizer(template) {
        // Create a modal for template customization
        const modal = document.createElement('div');
        modal.className = 'template-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Customize ${template.name} Template</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Use this template as a starting point. Copy the text below and paste it into your preferred document editor (Word, Google Docs, etc.) to customize with your information.</p>
                    <textarea readonly class="template-textarea">${template.sample}</textarea>
                    <div class="modal-actions">
                        <button class="btn-primary" id="copyTemplate">Copy to Clipboard</button>
                        <button class="btn-secondary" id="downloadTemplateFile">Download as File</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners for modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('#copyTemplate').addEventListener('click', () => {
            const textarea = modal.querySelector('.template-textarea');
            textarea.select();
            document.execCommand('copy');
            alert('Template copied to clipboard!');
        });

        modal.querySelector('#downloadTemplateFile').addEventListener('click', () => {
            this.downloadTemplate();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    selectTemplateBottom(templateType) {
        const template = this.templates[templateType];
        if (!template) return;

        // Update active button
        document.querySelectorAll('.template-btn-bottom').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-template="${templateType}"].template-btn-bottom`).classList.add('active');

        // Generate formatted resume using the selected template
        this.generateFormattedResume(templateType);
    }

    generateFormattedResume(templateType) {
        // Get the AI-generated resume content
        const generatedContent = document.getElementById('generatedContentText');
        if (!generatedContent || !generatedContent.textContent.trim()) {
            // If no generated content, use original resume
            const app = window.resumeApp;
            if (!app || !app.currentResumeText) {
                alert('Please generate an improved resume first, or upload a resume to analyze.');
                return;
            }
            this.formatResumeWithTemplate(templateType, app.currentResumeText);
        } else {
            // Use the AI-generated content
            this.formatResumeWithTemplate(templateType, generatedContent.textContent);
        }
    }

    formatResumeWithTemplate(templateType, resumeContent) {
        const template = this.templates[templateType];
        if (!template) return;

        // Extract information from the resume content
        const contactInfo = this.extractContactInfo(resumeContent);
        const experience = this.parseExperience(resumeContent);
        const skills = this.extractSkills(resumeContent);
        const education = this.extractEducation(resumeContent);

        // Generate formatted resume based on template type
        let formattedResume = '';
        
        switch(templateType) {
            case 'mit-sloan':
                formattedResume = this.generateMITFormattedResume(contactInfo, experience, education, skills);
                break;
            case 'cybersecurity':
                formattedResume = this.generateCybersecurityFormattedResume(contactInfo, experience, education, skills);
                break;
            case 'tech-industry':
                formattedResume = this.generateTechFormattedResume(contactInfo, experience, education, skills);
                break;
            case 'consulting':
                formattedResume = this.generateConsultingFormattedResume(contactInfo, experience, education, skills);
                break;
            case 'creative':
                formattedResume = this.generateCreativeFormattedResume(contactInfo, experience, education, skills);
                break;
            case 'traditional':
                formattedResume = this.generateTraditionalFormattedResume(contactInfo, experience, education, skills);
                break;
            default:
                formattedResume = this.generateTraditionalFormattedResume(contactInfo, experience, education, skills);
        }

        // Show the formatted resume
        this.showFormattedResumePreview(formattedResume, template.name);
    }

    showFormattedResumePreview(formattedResume, templateName) {
        const previewContainer = document.getElementById('templatePreviewBottom');
        const previewContent = document.getElementById('previewContentBottom');
        
        if (previewContainer && previewContent) {
            previewContent.textContent = formattedResume;
            previewContainer.style.display = 'block';
            previewContainer.scrollIntoView({ behavior: 'smooth' });
            
            // Update the title to show it's a formatted version
            const title = previewContainer.querySelector('h3');
            if (title) {
                title.textContent = `📝 ${templateName} Formatted Resume`;
            }
        }
    }

    downloadTemplateBottom() {
        const activeTemplate = document.querySelector('.template-btn-bottom.active');
        if (!activeTemplate) return;

        const previewContent = document.getElementById('previewContentBottom');
        if (!previewContent || !previewContent.textContent.trim()) {
            alert('Please select a template to format your resume first.');
            return;
        }

        const templateType = activeTemplate.dataset.template;
        const template = this.templates[templateType];
        const formattedContent = previewContent.textContent;
        
        const blob = new Blob([formattedContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${template.name.toLowerCase().replace(' ', '-')}-formatted-resume.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    useTemplateBottom() {
        const activeTemplate = document.querySelector('.template-btn-bottom.active');
        if (!activeTemplate) return;

        const templateType = activeTemplate.dataset.template;
        const template = this.templates[templateType];
        
        // Create a modal or form to help user customize the template
        this.showTemplateCustomizerBottom(template);
    }

    showTemplateCustomizerBottom(template) {
        // Create a modal for template customization
        const modal = document.createElement('div');
        modal.className = 'template-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Customize ${template.name} Template</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>This template will be customized with your resume information:</p>
                    <div class="template-preview-modal">
                        <pre>${template.sample}</pre>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary" id="generateCustomTemplate">Generate Custom Template</button>
                        <button class="btn-secondary" id="downloadTemplateModal">Download Template</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners for modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('#generateCustomTemplate').addEventListener('click', () => {
            // Get current resume text from the app
            const app = window.resumeApp;
            if (app && app.currentResumeText) {
                const personalizedTemplate = this.generatePersonalizedTemplate(activeTemplate.dataset.template, app.currentResumeText);
                
                // Show the personalized template
                const previewContent = document.getElementById('previewContentBottom');
                if (previewContent) {
                    previewContent.textContent = personalizedTemplate;
                }
            }
            document.body.removeChild(modal);
        });

        modal.querySelector('#downloadTemplateModal').addEventListener('click', () => {
            this.downloadTemplateBottom();
            document.body.removeChild(modal);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    generatePersonalizedTemplate(templateId, resumeText) {
        const template = this.templates[templateId];
        if (!template) return template.sample;

        // Extract contact information from resume
        const contactInfo = this.extractContactInfo(resumeText);
        
        // Generate personalized template based on type
        switch (templateId) {
            case 'mit-sloan':
                return this.generateMITTemplate(contactInfo, resumeText);
            case 'cybersecurity':
                return this.generateCybersecurityTemplate(contactInfo, resumeText);
            case 'tech-industry':
                return this.generateTechTemplate(contactInfo, resumeText);
            default:
                return this.generateGenericTemplate(contactInfo, resumeText);
        }
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
        
        return {
            name: name,
            email: email,
            phone: phone,
            location: location
        };
    }

    extractSkills(resumeText) {
        const skills = [];
        const lines = resumeText.split('\n');
        let inSkillsSection = false;
        
        for (const line of lines) {
            const lowerLine = line.toLowerCase();
            if (lowerLine.includes('skills') || lowerLine.includes('technical skills') || lowerLine.includes('technologies')) {
                inSkillsSection = true;
                continue;
            }
            
            if (inSkillsSection && line.trim()) {
                if (lowerLine.includes('experience') || lowerLine.includes('education') || lowerLine.includes('projects')) {
                    break;
                }
                // Extract skills from the line
                const skillMatches = line.match(/[A-Za-z][A-Za-z0-9\s#+.-]+/g);
                if (skillMatches) {
                    skills.push(...skillMatches.map(s => s.trim()).filter(s => s.length > 1));
                }
            }
        }
        
        // If no skills section found, look for common tech terms throughout the resume
        if (skills.length === 0) {
            const techTerms = ['Python', 'JavaScript', 'Java', 'C++', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'React', 'Node.js', 'Git', 'Linux', 'Windows', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'Redis', 'Nginx', 'Apache'];
            for (const term of techTerms) {
                if (resumeText.toLowerCase().includes(term.toLowerCase())) {
                    skills.push(term);
                }
            }
        }
        
        return [...new Set(skills)].slice(0, 15); // Remove duplicates and limit to 15
    }

    extractEducation(resumeText) {
        const education = [];
        const lines = resumeText.split('\n');
        let inEducationSection = false;
        let currentEducation = {};
        
        for (const line of lines) {
            const lowerLine = line.toLowerCase();
            if (lowerLine.includes('education')) {
                inEducationSection = true;
                continue;
            }
            
            if (inEducationSection && line.trim()) {
                if (lowerLine.includes('experience') || lowerLine.includes('skills') || lowerLine.includes('projects')) {
                    break;
                }
                
                // Check if this looks like a school name (contains common education keywords)
                if (line.match(/(university|college|institute|school|academy)/i)) {
                    if (currentEducation.school) {
                        education.push(currentEducation);
                    }
                    currentEducation = { school: line.trim() };
                } else if (line.match(/\b(bachelor|master|phd|associate|diploma|certificate|degree)\b/i)) {
                    currentEducation.degree = line.trim();
                } else if (line.match(/\b(20\d{2})\b/)) {
                    currentEducation.date = line.trim();
                } else if (line.trim() && !line.match(/^\s*[-•]\s*/)) {
                    if (!currentEducation.details) currentEducation.details = [];
                    currentEducation.details.push(line.trim());
                }
            }
        }
        
        if (currentEducation.school) {
            education.push(currentEducation);
        }
        
        return education;
    }

    parseExperience(resumeText) {
        const lines = resumeText.split('\n');
        const experienceLines = [];
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
                // Check if this is a job title
                if (this.isJobTitle(line)) {
                    // Save previous job if exists
                    if (currentJob.title) {
                        currentJob.descriptions = jobDescriptions;
                        experienceLines.push(this.formatMITJob(currentJob));
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
            experienceLines.push(this.formatMITJob(currentJob));
        }

        return experienceLines.join('\n\n');
    }

    formatMITJob(job) {
        let formatted = `${job.company || 'COMPANY NAME'}`;
        
        if (job.location) {
            formatted += `                                          ${job.location}`;
        }
        
        formatted += `\n${job.title}`;
        
        if (job.date) {
            formatted += `                          ${job.date}`;
        }
        
        // Add job descriptions
        if (job.descriptions && job.descriptions.length > 0) {
            job.descriptions.forEach(desc => {
                formatted += `\n• ${desc}`;
            });
        }
        
        return formatted;
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
        const datePatterns = [
            /\d{4}\s*to\s*\d{4}/,
            /\d{4}\s*to\s*Present/,
            /\w+\s+\d{4}\s*to\s*\w+\s+\d{4}/,
            /\w+\s+\d{4}\s*to\s*Present/,
            /\d{4}/
        ];
        return datePatterns.some(pattern => pattern.test(line));
    }

    isLocation(line) {
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

    generateMITTemplate(contactInfo, resumeText) {
        const experience = this.parseExperience(resumeText);
        
        return `${contactInfo.name.toUpperCase()}
${contactInfo.phone} | ${contactInfo.email}

EDUCATION
FORSYTH HIGH SCHOOL                                  ${contactInfo.location}
High School Diploma                                  2007

EXPERIENCE
${experience}

ADDITIONAL INFORMATION
• Languages: Fluent in English
• Computer Skills: Python, Nmap, Nuclei, DNS reconnaissance, penetration testing
• Certifications: Bug Bounty Program participant
• Interests: Security research, mentoring, custom tool development
• GitHub: https://github.com/ChickenPwny`;
    }

    generateCybersecurityTemplate(contactInfo, resumeText) {
        return `${contactInfo.name}
${contactInfo.email} | ${contactInfo.phone} | ${contactInfo.location}

PROFESSIONAL SUMMARY
Experienced Web and Mobile Application Penetration Tester with over five years in offensive security, specializing in application-layer testing, automation, and vulnerability research. Currently employed at Polito Inc., where I've led high-impact assessments and developed a custom vulnerability scanner integrating tools like Nmap, Nuclei, and DNS reconnaissance to streamline and scale testing efforts.

TECHNICAL SKILLS
• Programming: Python, JavaScript, Shell scripting
• Security Tools: Nmap, Nuclei, Burp Suite, OWASP ZAP, Metasploit
• Platforms: Kali Linux, Windows, Linux
• Methodologies: Web application penetration testing, mobile security, vulnerability assessment
• Bug Bounty: $25,000+ in rewards through responsible disclosure

PROFESSIONAL EXPERIENCE
Senior Web Application Penetration Tester | Polito Inc | Washington, DC | 2021 – Present
• Performed web and mobile application penetration tests for over four years
• Created web vulnerability scanner to scan for web application vulnerabilities at scale
• Trained interns on how to perform penetration tests
• Developed custom automation tools integrating Nmap, Nuclei, and DNS reconnaissance

Web Application Penetration Tester | Software Security Consultants | Philadelphia, PA | 2020 – 2021
• Worked with major customer Comcast and performed web application pentest for their internal web applications
• Conducted comprehensive security assessments and provided remediation guidance

Charity Volunteer | University of West Virginia | Morgantown, WV | 2024
• Worked as a consultant for a charity, performed web app penetration tests
• Helped guide students and answered questions about how to set up a secure web application

PROJECTS & ACHIEVEMENTS
• Bug Bounty Program: Earned $25,000+ in rewards through responsible disclosure of security vulnerabilities
• Custom Vulnerability Scanner: Developed automated scanning tool integrating Nmap, Nuclei, and DNS reconnaissance
• GitHub Projects: https://github.com/ChickenPwny/Order365, https://github.com/PolitoInc/EGOAlpha

EDUCATION
Forsyth High School | High School Diploma | 2007

CERTIFICATIONS & ADDITIONAL INFORMATION
• Work Authorization: Authorized to work in the U.S.
• Languages: Fluent in English
• Interests: Security research, mentoring, custom tool development, CTF competitions`;
    }

    generateTechTemplate(contactInfo, resumeText) {
        return `${contactInfo.name}
${contactInfo.email} • ${contactInfo.phone} • ${contactInfo.location}

SUMMARY
Results-driven cybersecurity professional with 5+ years of experience in offensive security, specializing in application-layer testing, automation, and vulnerability research. Proven track record of leading high-impact assessments and developing custom vulnerability scanners. Passionate about security research with $25,000+ in bug bounty rewards demonstrating real-world security expertise.

EXPERIENCE
Polito Inc | Washington, DC
Senior Web Application Penetration Tester | January 2021 – Present
• Led web and mobile application penetration tests for over four years
• Developed custom vulnerability scanner integrating Nmap, Nuclei, and DNS reconnaissance
• Mentored and trained interns in penetration testing methodologies
• Streamlined testing processes through automation and tool development

Software Security Consultants | Philadelphia, PA
Web Application Penetration Tester | January 2020 – January 2021
• Performed security assessments for major clients including Comcast
• Conducted web application penetration tests for internal systems
• Provided detailed remediation guidance and security recommendations

University of West Virginia | Morgantown, WV
Charity Volunteer Consultant | March 2024 – July 2024
• Consulted for educational charity, performed web application penetration tests
• Guided students in secure web application development practices
• Answered technical questions and provided security education

TECHNICAL SKILLS
Programming: Python, JavaScript, Shell scripting
Security Tools: Nmap, Nuclei, Burp Suite, OWASP ZAP, Metasploit, Kali Linux
Platforms: Windows, Linux, Mobile (iOS/Android)
Methodologies: Web application security, mobile security, vulnerability assessment, penetration testing

PROJECTS
• Bug Bounty Program: $25,000+ in rewards through responsible disclosure
• Custom Vulnerability Scanner: Automated tool integrating multiple security frameworks
• GitHub Portfolio: https://github.com/ChickenPwny

EDUCATION
Forsyth High School | High School Diploma | 2007

ADDITIONAL INFORMATION
• Work Authorization: Authorized to work in the U.S.
• Languages: English (Fluent)
• Interests: Security research, mentoring, custom tool development, CTF competitions`;
    }

    generateGenericTemplate(contactInfo, resumeText) {
        return `${contactInfo.name}
${contactInfo.email} | ${contactInfo.phone} | ${contactInfo.location}

PROFESSIONAL SUMMARY
Experienced cybersecurity professional with 5+ years in offensive security, specializing in application-layer testing, automation, and vulnerability research. Currently leading high-impact assessments and developing custom security tools.

EXPERIENCE
Senior Web Application Penetration Tester
Polito Inc, Washington, DC | 2021 – Present
• Performed web and mobile application penetration tests for over four years
• Created web vulnerability scanner to scan for web application vulnerabilities at scale
• Trained interns on how to perform penetration tests

Web Application Penetration Tester
Software Security Consultants, Philadelphia, PA | 2020 – 2021
• Worked with major customer Comcast and performed web application pentest for their internal web applications

Charity Volunteer
University of West Virginia | 2024
• Worked as a consultant for a charity, performed web app penetration tests
• Helped guide students and answered questions about secure web application development

SKILLS
• Programming: Python, JavaScript
• Security Tools: Nmap, Nuclei, Burp Suite, OWASP ZAP
• Platforms: Kali Linux, Windows, Linux
• Methodologies: Penetration testing, vulnerability assessment, web application security

PROJECTS
• Bug Bounty Program: Earned $25,000+ in rewards
• Custom Vulnerability Scanner: Developed automated scanning tool
• GitHub: https://github.com/ChickenPwny

EDUCATION
Forsyth High School | High School Diploma | 2007`;
    }

    // Template-specific formatting methods for bottom section
    generateMITFormattedResume(contactInfo, experience, education, skills) {
        return `${contactInfo.name.toUpperCase()}
${contactInfo.phone} | ${contactInfo.email}

EDUCATION
${education.length > 0 ? education.map(edu => 
    `${edu.school.toUpperCase()}                    ${contactInfo.location}
${edu.degree || 'Degree'}                      ${edu.date || 'Date'}
${edu.details ? edu.details.map(detail => `• ${detail}`).join('\n') : ''}`
).join('\n\n') : 'EDUCATION\n[Your education details]'}

EXPERIENCE
${experience || '[Your experience details]'}

ADDITIONAL INFORMATION
${skills.length > 0 ? `• Technical Skills: ${skills.slice(0, 8).join(', ')}` : '• Technical Skills: [Your skills]'}
• Location: ${contactInfo.location}
• Email: ${contactInfo.email}`;
    }

    generateCybersecurityFormattedResume(contactInfo, experience, education, skills) {
        return `${contactInfo.name}
${contactInfo.email} | ${contactInfo.phone} | ${contactInfo.location}

PROFESSIONAL SUMMARY
Experienced cybersecurity professional with expertise in penetration testing, vulnerability assessment, and security analysis. Proven track record in identifying and mitigating security risks across diverse environments.

TECHNICAL SKILLS
${skills.length > 0 ? skills.slice(0, 12).map(skill => `• ${skill}`).join('\n') : '• [Your technical skills]'}

PROFESSIONAL EXPERIENCE
${experience || '[Your professional experience]'}

EDUCATION
${education.length > 0 ? education.map(edu => 
    `${edu.school} | ${edu.degree || 'Degree'} | ${edu.date || 'Date'}`
).join('\n') : '[Your education]'}

CERTIFICATIONS & TRAINING
• [Relevant certifications]

PROJECTS & ACHIEVEMENTS
• [Notable security projects or achievements]`;
    }

    generateTechFormattedResume(contactInfo, experience, education, skills) {
        return `${contactInfo.name}
${contactInfo.email} • ${contactInfo.phone} • ${contactInfo.location}

SUMMARY
Software engineer with expertise in full-stack development and modern technologies. Passionate about building scalable solutions and contributing to innovative projects.

TECHNICAL SKILLS
Programming Languages: ${skills.filter(s => ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'Go', 'Rust'].includes(s)).join(', ') || '[Languages]'}
Frameworks & Tools: ${skills.filter(s => ['React', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'Git'].includes(s)).join(', ') || '[Frameworks]'}
Databases: ${skills.filter(s => ['SQL', 'MongoDB', 'PostgreSQL', 'Redis'].includes(s)).join(', ') || '[Databases]'}

EXPERIENCE
${experience || '[Your work experience]'}

EDUCATION
${education.length > 0 ? education.map(edu => 
    `${edu.school} - ${edu.degree || 'Degree'} (${edu.date || 'Date'})`
).join('\n') : '[Your education]'}

PROJECTS
• [Notable projects and contributions]`;
    }

    generateConsultingFormattedResume(contactInfo, experience, education, skills) {
        return `${contactInfo.name}
${contactInfo.email} | ${contactInfo.phone} | ${contactInfo.location}

PROFESSIONAL PROFILE
Results-driven consultant with expertise in strategic analysis, process improvement, and client relationship management. Proven ability to deliver measurable business outcomes.

CORE COMPETENCIES
${skills.length > 0 ? skills.slice(0, 10).map(skill => `• ${skill}`).join('\n') : '• [Your core competencies]'}

PROFESSIONAL EXPERIENCE
${experience || '[Your consulting experience]'}

EDUCATION
${education.length > 0 ? education.map(edu => 
    `${edu.school} | ${edu.degree || 'Degree'} | ${edu.date || 'Date'}`
).join('\n') : '[Your education]'}

ACHIEVEMENTS
• [Key achievements and results]`;
    }

    generateCreativeFormattedResume(contactInfo, experience, education, skills) {
        return `${contactInfo.name}
${contactInfo.email} • ${contactInfo.phone} • ${contactInfo.location}

CREATIVE PROFESSIONAL
Innovative designer and creative professional with a passion for visual storytelling and brand development. Experienced in delivering compelling creative solutions across multiple mediums.

SKILLS & EXPERTISE
${skills.length > 0 ? skills.slice(0, 12).map(skill => `• ${skill}`).join('\n') : '• [Your creative skills]'}

EXPERIENCE
${experience || '[Your creative experience]'}

EDUCATION
${education.length > 0 ? education.map(edu => 
    `${edu.school} | ${edu.degree || 'Degree'} | ${edu.date || 'Date'}`
).join('\n') : '[Your education]'}

PORTFOLIO & PROJECTS
• [Notable creative projects and portfolio highlights]`;
    }

    generateTraditionalFormattedResume(contactInfo, experience, education, skills) {
        return `${contactInfo.name}
${contactInfo.email} • ${contactInfo.phone} • ${contactInfo.location}

PROFESSIONAL SUMMARY
Dedicated professional with a strong background in [your field]. Committed to delivering high-quality results and contributing to organizational success.

SKILLS
${skills.length > 0 ? skills.slice(0, 10).map(skill => `• ${skill}`).join('\n') : '• [Your key skills]'}

WORK EXPERIENCE
${experience || '[Your work experience]'}

EDUCATION
${education.length > 0 ? education.map(edu => 
    `${edu.school} | ${edu.degree || 'Degree'} | ${edu.date || 'Date'}`
).join('\n') : '[Your education]'}

ADDITIONAL INFORMATION
• Location: ${contactInfo.location}
• Available for: [Full-time/Part-time/Contract]`;
    }
}

// Initialize template manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TemplateManager();
});
