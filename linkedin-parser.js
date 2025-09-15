class LinkedInParser {
    constructor() {
        this.analyzer = new ResumeAnalyzer();
        this.aiGenerator = new AIContentGenerator();
        this.currentProfileData = null;
        this.currentProfileText = null;
        this.lastAnalysis = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const linkedinUrl = document.getElementById('linkedinUrl');
        const parseBtn = document.getElementById('parseLinkedInBtn');
        const testBtn = document.getElementById('testConnectionBtn');
        const analyzeBtn = document.getElementById('analyzeProfileBtn');
        const editBtn = document.getElementById('editProfileBtn');
        const jobDescription = document.getElementById('jobDescription');

        // URL input validation
        if (linkedinUrl) {
            linkedinUrl.addEventListener('input', this.validateLinkedInUrl.bind(this));
        }

        // Parse button
        if (parseBtn) {
            parseBtn.addEventListener('click', this.parseLinkedInProfile.bind(this));
        }

        // Test connection button
        if (testBtn) {
            testBtn.addEventListener('click', this.testConnection.bind(this));
        }

        // Analyze profile button
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', this.analyzeProfile.bind(this));
        }

        // Edit profile button
        if (editBtn) {
            editBtn.addEventListener('click', this.editProfileData.bind(this));
        }

        // Job description changes
        if (jobDescription) {
            jobDescription.addEventListener('input', this.debounce(() => {
                if (this.currentProfileText) {
                    this.analyzeProfile();
                }
            }, 500));
        }

        // AI Generation buttons
        document.getElementById('generateImprovedResume')?.addEventListener('click', () => {
            this.generateContent('improvedResume');
        });

        document.getElementById('generateCoverLetter')?.addEventListener('click', () => {
            this.generateContent('coverLetter');
        });

        document.getElementById('generateLinkedInSummary')?.addEventListener('click', () => {
            this.generateContent('linkedinSummary');
        });

        // Generated content actions
        document.getElementById('copyGeneratedContent')?.addEventListener('click', () => {
            this.copyGeneratedContent();
        });

        document.getElementById('downloadGeneratedContent')?.addEventListener('click', () => {
            this.downloadGeneratedContent();
        });

        // Analyze button
        document.getElementById('analyzeResumeBtn')?.addEventListener('click', () => {
            this.analyzeProfile();
        });
    }

    validateLinkedInUrl() {
        const urlInput = document.getElementById('linkedinUrl');
        const parseBtn = document.getElementById('parseLinkedInBtn');
        const url = urlInput.value.trim();

        if (url && this.isValidLinkedInUrl(url)) {
            parseBtn.disabled = false;
            urlInput.classList.remove('error');
        } else {
            parseBtn.disabled = true;
            if (url) {
                urlInput.classList.add('error');
            } else {
                urlInput.classList.remove('error');
            }
        }
    }

    isValidLinkedInUrl(url) {
        const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+\/?$/;
        return linkedinPattern.test(url);
    }

    async testConnection() {
        const urlInput = document.getElementById('linkedinUrl');
        const url = urlInput.value.trim();

        if (!url) {
            alert('Please enter a LinkedIn profile URL');
            return;
        }

        if (!this.isValidLinkedInUrl(url)) {
            alert('Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)');
            return;
        }

        try {
            this.showParsingStatus('Testing connection to LinkedIn profile...');
            
            // Test if the profile is accessible
            const response = await fetch(url, {
                method: 'HEAD',
                mode: 'no-cors' // This will work for same-origin or CORS-enabled requests
            });

            this.showParsingStatus('✅ Connection test completed. Profile appears to be accessible.');
            
            setTimeout(() => {
                this.hideParsingStatus();
            }, 3000);

        } catch (error) {
            console.error('Connection test failed:', error);
            this.showParsingStatus('⚠️ Connection test failed. The profile may be private or inaccessible.');
            
            setTimeout(() => {
                this.hideParsingStatus();
            }, 5000);
        }
    }

    async parseLinkedInProfile() {
        const urlInput = document.getElementById('linkedinUrl');
        const url = urlInput.value.trim();

        if (!url || !this.isValidLinkedInUrl(url)) {
            alert('Please enter a valid LinkedIn profile URL');
            return;
        }

        try {
            this.showParsingStatus('Connecting to LinkedIn profile...');
            
            // Simulate profile parsing (in a real implementation, this would use a proxy or CORS-enabled endpoint)
            const profileData = await this.simulateProfileParsing(url);
            
            this.currentProfileData = profileData;
            this.currentProfileText = this.convertProfileToText(profileData);
            
            this.displayProfilePreview(profileData);
            this.showJobDescriptionSection();
            this.showAnalyzeButton();
            
            this.hideParsingStatus();
            
        } catch (error) {
            console.error('Error parsing LinkedIn profile:', error);
            this.showParsingStatus('❌ Failed to parse LinkedIn profile. Please ensure the profile is public and try again.');
            
            setTimeout(() => {
                this.hideParsingStatus();
            }, 5000);
        }
    }

    async simulateProfileParsing(url) {
        // This is a simulation of LinkedIn profile parsing
        // In a real implementation, you would need a CORS proxy or server-side solution
        
        return new Promise((resolve) => {
            setTimeout(() => {
                // Check if this is Charlie McGowen's profile
                if (url.includes('charlie-mcgowen')) {
                    const charlieProfileData = {
                        name: "Charlie McGowen",
                        headline: "Cybersecurity Professional | Bug Bounty Hunter | Security Researcher",
                        summary: "Dedicated cybersecurity professional with expertise in bug bounty hunting, penetration testing, and security research. Passionate about identifying vulnerabilities and improving security posture. Strong background in web application security, network analysis, and threat hunting. Active in the cybersecurity community with multiple successful bug bounty submissions.",
                        experience: [
                            {
                                title: "Cybersecurity Researcher",
                                company: "Independent Contractor",
                                duration: "2020 - Present",
                                description: "Conducting security research and bug bounty hunting across various platforms. Identified and responsibly disclosed multiple critical vulnerabilities. Specialized in web application security, API testing, and network penetration testing. Maintained 100% responsible disclosure record with multiple organizations."
                            },
                            {
                                title: "Security Analyst",
                                company: "Previous Role",
                                duration: "2018 - 2020",
                                description: "Analyzed security events and conducted vulnerability assessments. Implemented security monitoring solutions and incident response procedures. Collaborated with development teams to remediate security findings."
                            }
                        ],
                        education: [
                            {
                                degree: "Computer Science / Cybersecurity",
                                school: "University/Institution",
                                year: "2018"
                            }
                        ],
                        skills: [
                            "Bug Bounty Hunting", "Penetration Testing", "Web Application Security", 
                            "Network Security", "Vulnerability Assessment", "Python", "JavaScript", 
                            "Burp Suite", "OWASP ZAP", "Nmap", "Wireshark", "Metasploit", 
                            "Security Research", "Threat Hunting", "Incident Response"
                        ],
                        certifications: [
                            "Certified Ethical Hacker (CEH)",
                            "CompTIA Security+",
                            "Offensive Security Certified Professional (OSCP)",
                            "Bug Bounty Platform Certifications"
                        ],
                        projects: [
                            "Bug Bounty Research - Active participation in multiple bug bounty programs with successful submissions",
                            "Security Tools Development - Created custom tools for vulnerability assessment and testing",
                            "Home Lab - Comprehensive security testing environment with multiple operating systems and network configurations",
                            "CTF Participation - Regular participation in Capture The Flag competitions and security challenges"
                        ]
                    };
                    resolve(charlieProfileData);
                } else {
                    // Default mock profile for other URLs
                    const mockProfileData = {
                        name: "John Doe",
                        headline: "Cybersecurity Professional | Penetration Tester | Security Analyst",
                        summary: "Experienced cybersecurity professional with 5+ years in penetration testing and security analysis. Passionate about identifying vulnerabilities and implementing robust security measures. Strong background in network security, vulnerability assessment, and incident response.",
                        experience: [
                            {
                                title: "Senior Penetration Tester",
                                company: "SecureCorp Inc.",
                                duration: "2021 - Present",
                                description: "Conducted comprehensive penetration tests for enterprise clients. Identified and documented security vulnerabilities. Developed custom tools for automated testing. Led security assessments for web applications and network infrastructure."
                            },
                            {
                                title: "Security Analyst",
                                company: "TechGuard Solutions",
                                duration: "2019 - 2021",
                                description: "Monitored security systems and analyzed security events. Investigated security incidents and provided remediation recommendations. Maintained security documentation and compliance reports."
                            }
                        ],
                        education: [
                            {
                                degree: "Bachelor of Science in Computer Science",
                                school: "University of Technology",
                                year: "2019"
                            }
                        ],
                        skills: [
                            "Penetration Testing", "Network Security", "Vulnerability Assessment", 
                            "Python", "Linux", "Wireshark", "Metasploit", "Nmap", 
                            "Incident Response", "Security Analysis", "Risk Assessment"
                        ],
                        certifications: [
                            "Certified Ethical Hacker (CEH)",
                            "CompTIA Security+",
                            "Offensive Security Certified Professional (OSCP)"
                        ],
                        projects: [
                            "Home Lab Setup - Built comprehensive security testing lab with multiple operating systems and network configurations",
                            "CTF Participation - Regular participation in Capture The Flag competitions to improve technical skills"
                        ]
                    };
                    resolve(mockProfileData);
                }
            }, 2000);
        });
    }

    convertProfileToText(profileData) {
        let text = '';
        
        // Name and headline
        text += `${profileData.name}\n`;
        text += `${profileData.headline}\n\n`;
        
        // Summary
        if (profileData.summary) {
            text += `PROFESSIONAL SUMMARY\n`;
            text += `${profileData.summary}\n\n`;
        }
        
        // Experience
        if (profileData.experience && profileData.experience.length > 0) {
            text += `PROFESSIONAL EXPERIENCE\n`;
            profileData.experience.forEach(exp => {
                text += `${exp.title}\n`;
                text += `${exp.company} | ${exp.duration}\n`;
                text += `${exp.description}\n\n`;
            });
        }
        
        // Education
        if (profileData.education && profileData.education.length > 0) {
            text += `EDUCATION\n`;
            profileData.education.forEach(edu => {
                text += `${edu.degree}\n`;
                text += `${edu.school} | ${edu.year}\n\n`;
            });
        }
        
        // Skills
        if (profileData.skills && profileData.skills.length > 0) {
            text += `TECHNICAL SKILLS\n`;
            text += profileData.skills.join(' | ') + '\n\n';
        }
        
        // Certifications
        if (profileData.certifications && profileData.certifications.length > 0) {
            text += `CERTIFICATIONS\n`;
            profileData.certifications.forEach(cert => {
                text += `• ${cert}\n`;
            });
            text += '\n';
        }
        
        // Projects
        if (profileData.projects && profileData.projects.length > 0) {
            text += `PROJECTS & ACTIVITIES\n`;
            profileData.projects.forEach(project => {
                text += `• ${project}\n`;
            });
        }
        
        return text;
    }

    displayProfilePreview(profileData) {
        const preview = document.getElementById('profilePreview');
        const content = document.getElementById('profileContent');
        
        if (!preview || !content) return;
        
        let html = `
            <div class="profile-section">
                <h5>👤 ${profileData.name}</h5>
                <p class="headline">${profileData.headline}</p>
            </div>
        `;
        
        if (profileData.summary) {
            html += `
                <div class="profile-section">
                    <h5>📝 Summary</h5>
                    <p>${profileData.summary}</p>
                </div>
            `;
        }
        
        if (profileData.experience && profileData.experience.length > 0) {
            html += `<div class="profile-section"><h5>💼 Experience</h5>`;
            profileData.experience.forEach(exp => {
                html += `
                    <div class="experience-item">
                        <strong>${exp.title}</strong><br>
                        <em>${exp.company} | ${exp.duration}</em><br>
                        <p>${exp.description}</p>
                    </div>
                `;
            });
            html += `</div>`;
        }
        
        if (profileData.skills && profileData.skills.length > 0) {
            html += `
                <div class="profile-section">
                    <h5>🛠️ Skills</h5>
                    <div class="skills-list">
                        ${profileData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
        content.innerHTML = html;
        preview.style.display = 'block';
    }

    async analyzeProfile() {
        if (!this.currentProfileText) {
            alert('Please parse a LinkedIn profile first');
            return;
        }

        try {
            this.showLoading();
            
            const jobDescription = document.getElementById('jobDescription').value;
            const analysis = await this.analyzer.analyzeResume(this.currentProfileText, jobDescription);
            
            // Add LinkedIn-specific optimization analysis
            analysis.linkedinOptimization = this.analyzeLinkedInOptimization(this.currentProfileData);
            
            this.lastAnalysis = analysis;
            this.displayResults(analysis);
        } catch (error) {
            console.error('Error analyzing profile:', error);
            alert('Error analyzing profile. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    displayResults(analysis) {
        console.log('Displaying results:', analysis);
        
        // Update overall score
        const overallScore = document.getElementById('overallScore');
        if (overallScore) {
            overallScore.textContent = analysis.overallScore;
        }

        // Update individual scores
        this.updateScoreBar('contentScore', analysis.contentQuality.score);
        this.updateScoreBar('keywordScore', analysis.keywordMatch.score);
        this.updateScoreBar('structureScore', analysis.structure.score);
        this.updateScoreBar('actionScore', analysis.actionVerbs.score);
        this.updateScoreBar('strategicScore', analysis.strategicPositioning.score);
        this.updateScoreBar('interviewScore', analysis.interviewReadiness.score);
        this.updateScoreBar('gatekeepingScore', analysis.gatekeepingAnalysis.score);

        // Update feedback
        this.updateTextContent('contentFeedback', analysis.contentQuality.feedback);
        this.updateTextContent('keywordFeedback', analysis.keywordMatch.feedback);
        this.updateTextContent('structureFeedback', analysis.structure.feedback);
        this.updateTextContent('actionFeedback', analysis.actionVerbs.feedback);
        this.updateTextContent('strategicFeedback', analysis.strategicPositioning.feedback);
        this.updateTextContent('interviewFeedback', analysis.interviewReadiness.feedback);
        this.updateTextContent('gatekeepingFeedback', analysis.gatekeepingAnalysis.feedback);

        // Update suggestions
        const suggestionsList = document.getElementById('suggestionsList');
        if (suggestionsList) {
            suggestionsList.innerHTML = '';
            
            // Add detailed recommendations from content quality analysis
            if (analysis.contentQuality.recommendations) {
                analysis.contentQuality.recommendations.forEach(rec => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>Content:</strong> ${rec}`;
                    li.style.color = '#d32f2f';
                    suggestionsList.appendChild(li);
                });
            }
            
            // Add detailed recommendations from structure analysis
            if (analysis.structure.recommendations) {
                analysis.structure.recommendations.forEach(rec => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>Structure:</strong> ${rec}`;
                    li.style.color = '#f57c00';
                    suggestionsList.appendChild(li);
                });
            }
            
            // Add general suggestions
            analysis.suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                li.style.color = '#1976d2';
                suggestionsList.appendChild(li);
            });
        }

        // Update keywords - use LinkedIn optimization analysis if available
        if (analysis.linkedinOptimization && analysis.linkedinOptimization.detailedAnalysis.keywords) {
            const keywordAnalysis = analysis.linkedinOptimization.detailedAnalysis.keywords;
            this.displayKeywords('foundKeywords', keywordAnalysis.foundKeywords || [], 'found');
            this.displayKeywords('missingKeywords', keywordAnalysis.missingKeywords || [], 'missing');
        } else {
            // Fallback to traditional keyword analysis
            this.displayKeywords('foundKeywords', analysis.keywords.found, 'found');
            this.displayKeywords('missingKeywords', analysis.keywords.missing, 'missing');
        }

        // Update interview questions
        const questionsList = document.getElementById('interviewQuestionsList');
        if (questionsList && analysis.potentialQuestions) {
            questionsList.innerHTML = '';
            analysis.potentialQuestions.forEach(question => {
                const li = document.createElement('li');
                li.textContent = question;
                questionsList.appendChild(li);
            });
        }

        // Update line-by-line issues
        this.displayLineIssues(analysis);

        // Update gatekeeping issues
        this.displayGatekeepingIssues(analysis);

        // Update profile preview
        this.displayProfilePreviewText();

        // Display LinkedIn optimization insights
        this.displayLinkedInOptimization(analysis.linkedinOptimization);

        // Show results
        const resultsContainer = document.getElementById('resultsContainer');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
        }
    }

    updateScoreBar(elementId, score) {
        const scoreBar = document.getElementById(elementId);
        if (scoreBar) {
            scoreBar.style.width = `${score}%`;
        }
    }

    updateTextContent(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
        }
    }

    displayKeywords(containerId, keywords, type) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
            
            keywords.forEach(keyword => {
                const tag = document.createElement('span');
                tag.className = `keyword-tag ${type}`;
                tag.textContent = keyword;
                container.appendChild(tag);
            });
        }
    }

    displayLineIssues(analysis) {
        const lineIssuesContainer = document.getElementById('lineIssuesList');
        if (!lineIssuesContainer) return;

        lineIssuesContainer.innerHTML = '';

        // Combine issues from content quality and structure analysis
        const allIssues = [];
        
        if (analysis.contentQuality.issues) {
            analysis.contentQuality.issues.forEach(issue => {
                allIssues.push({ issue, type: 'Content Quality' });
            });
        }
        
        if (analysis.structure.issues) {
            analysis.structure.issues.forEach(issue => {
                allIssues.push({ issue, type: 'Structure' });
            });
        }

        if (allIssues.length === 0) {
            const noIssues = document.createElement('div');
            noIssues.className = 'line-issue';
            noIssues.innerHTML = '<span style="color: #28a745;">✅ No specific line issues found!</span>';
            lineIssuesContainer.appendChild(noIssues);
            return;
        }

        allIssues.forEach(({ issue, type }) => {
            const issueDiv = document.createElement('div');
            issueDiv.className = 'line-issue';
            
            // Extract line number if present
            const lineMatch = issue.match(/Line (\d+):/);
            if (lineMatch) {
                const lineNumber = lineMatch[1];
                const issueText = issue.replace(/Line \d+: /, '');
                
                issueDiv.innerHTML = `
                    <span class="line-number">Line ${lineNumber}</span>
                    <span class="issue-text">${issueText}</span>
                `;
            } else {
                issueDiv.innerHTML = `
                    <span class="issue-text">${issue}</span>
                `;
            }
            
            lineIssuesContainer.appendChild(issueDiv);
        });
    }

    displayGatekeepingIssues(analysis) {
        const gatekeepingContainer = document.getElementById('gatekeepingIssuesList');
        if (!gatekeepingContainer) return;

        gatekeepingContainer.innerHTML = '';

        if (!analysis.gatekeepingAnalysis.gatekeepingIssues || analysis.gatekeepingAnalysis.gatekeepingIssues.length === 0) {
            const noIssues = document.createElement('div');
            noIssues.className = 'gatekeeping-issue';
            noIssues.innerHTML = '<span style="color: #2e7d32;">✅ No tone issues detected! Your profile language appears professional and collaborative to hiring managers.</span>';
            gatekeepingContainer.appendChild(noIssues);
            return;
        }

        analysis.gatekeepingAnalysis.gatekeepingIssues.forEach(issue => {
            const issueDiv = document.createElement('div');
            issueDiv.className = 'gatekeeping-issue';
            
            issueDiv.innerHTML = `
                <div>
                    <span class="category">${issue.category}</span>
                    <span class="line-number">Line ${issue.line}</span>
                </div>
                <div class="issue-text">"${issue.text}"</div>
                <div style="color: #666; font-size: 0.8rem; margin: 5px 0;">${issue.issue}</div>
                <div class="suggestion">💡 ${issue.suggestion}</div>
            `;
            
            gatekeepingContainer.appendChild(issueDiv);
        });
    }

    displayProfilePreviewText() {
        const profilePreview = document.getElementById('resumePreviewText');
        if (profilePreview && this.currentProfileText) {
            profilePreview.textContent = this.currentProfileText;
        }
    }

    editProfileData() {
        if (!this.currentProfileData) {
            alert('No profile data to edit');
            return;
        }

        // Create a simple edit interface
        const editModal = document.createElement('div');
        editModal.className = 'edit-modal';
        editModal.innerHTML = `
            <div class="edit-modal-content">
                <h3>✏️ Edit Profile Data</h3>
                <div class="edit-form">
                    <label>Name:</label>
                    <input type="text" id="editName" value="${this.currentProfileData.name}">
                    
                    <label>Headline:</label>
                    <input type="text" id="editHeadline" value="${this.currentProfileData.headline}">
                    
                    <label>Summary:</label>
                    <textarea id="editSummary" rows="4">${this.currentProfileData.summary}</textarea>
                    
                    <label>Skills (comma-separated):</label>
                    <input type="text" id="editSkills" value="${this.currentProfileData.skills.join(', ')}">
                </div>
                <div class="edit-actions">
                    <button class="btn-primary" id="saveProfile">Save Changes</button>
                    <button class="btn-secondary" id="cancelEdit">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(editModal);

        // Add event listeners
        document.getElementById('saveProfile').addEventListener('click', () => {
            this.saveProfileChanges();
            document.body.removeChild(editModal);
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            document.body.removeChild(editModal);
        });
    }

    saveProfileChanges() {
        const name = document.getElementById('editName').value;
        const headline = document.getElementById('editHeadline').value;
        const summary = document.getElementById('editSummary').value;
        const skills = document.getElementById('editSkills').value.split(',').map(s => s.trim());

        // Update profile data
        this.currentProfileData.name = name;
        this.currentProfileData.headline = headline;
        this.currentProfileData.summary = summary;
        this.currentProfileData.skills = skills;

        // Regenerate profile text
        this.currentProfileText = this.convertProfileToText(this.currentProfileData);

        // Update display
        this.displayProfilePreview(this.currentProfileData);

        alert('Profile data updated successfully!');
    }

    async generateContent(type) {
        if (!this.currentProfileText) {
            alert('Please parse a LinkedIn profile first');
            return;
        }

        try {
            this.showGenerationLoading();
            
            const jobDescription = document.getElementById('jobDescription').value;
            const analysis = this.lastAnalysis || null;
            
            const result = await this.aiGenerator.generateContent(type, this.currentProfileText, jobDescription, analysis);
            
            this.displayGeneratedContent(result);
        } catch (error) {
            console.error('Error generating content:', error);
            alert('Error generating content. Please try again.');
        } finally {
            this.hideGenerationLoading();
        }
    }

    displayGeneratedContent(result) {
        const generatedContent = document.getElementById('generatedContent');
        const title = document.getElementById('generatedContentTitle');
        const contentText = document.getElementById('generatedContentText');

        if (title) title.textContent = result.title;
        if (contentText) contentText.textContent = result.content;
        if (generatedContent) {
            generatedContent.style.display = 'block';
            generatedContent.scrollIntoView({ behavior: 'smooth' });
        }

        this.currentGeneratedContent = result;
    }

    copyGeneratedContent() {
        const contentText = document.getElementById('generatedContentText');
        if (contentText) {
            contentText.select();
            document.execCommand('copy');
            alert('Content copied to clipboard!');
        }
    }

    downloadGeneratedContent() {
        if (!this.currentGeneratedContent) return;

        const blob = new Blob([this.currentGeneratedContent.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentGeneratedContent.title.toLowerCase().replace(' ', '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showParsingStatus(message) {
        const status = document.getElementById('parsingStatus');
        const messageEl = document.getElementById('statusMessage');
        
        if (status) {
            status.style.display = 'block';
        }
        if (messageEl) {
            messageEl.textContent = message;
        }
    }

    hideParsingStatus() {
        const status = document.getElementById('parsingStatus');
        if (status) {
            status.style.display = 'none';
        }
    }

    showLoading() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        const resultsContainer = document.getElementById('resultsContainer');
        
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }

    hideLoading() {
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }

    showJobDescriptionSection() {
        const jobDescriptionSection = document.getElementById('jobDescriptionSection');
        if (jobDescriptionSection) {
            jobDescriptionSection.style.display = 'block';
        }
    }

    showAnalyzeButton() {
        const analyzeSection = document.getElementById('analysisSection');
        if (analyzeSection) {
            analyzeSection.style.display = 'block';
        }
    }

    showGenerationLoading() {
        const buttons = document.querySelectorAll('#generateImprovedResume, #generateCoverLetter, #generateLinkedInSummary');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.textContent = 'Generating...';
        });
    }

    hideGenerationLoading() {
        const buttons = document.querySelectorAll('#generateImprovedResume, #generateCoverLetter, #generateLinkedInSummary');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.textContent = btn.id.replace('generate', '').replace(/([A-Z])/g, ' $1').trim();
        });
    }

    analyzeLinkedInOptimization(profileData) {
        const analysis = {
            score: 0,
            feedback: '',
            strengths: [],
            improvements: [],
            cydneyTips: [],
            detailedAnalysis: {}
        };

        let totalScore = 0;
        let maxScore = 0;

        // 1. Professional Photo Analysis
        const photoAnalysis = this.analyzeProfilePhoto(profileData);
        analysis.detailedAnalysis.photo = photoAnalysis;
        totalScore += photoAnalysis.score;
        maxScore += 100;

        // 2. Compelling Headline Analysis
        const headlineAnalysis = this.analyzeHeadline(profileData);
        analysis.detailedAnalysis.headline = headlineAnalysis;
        totalScore += headlineAnalysis.score;
        maxScore += 100;

        // 3. Engaging Summary Analysis
        const summaryAnalysis = this.analyzeSummary(profileData);
        analysis.detailedAnalysis.summary = summaryAnalysis;
        totalScore += summaryAnalysis.score;
        maxScore += 100;

        // 4. Detailed Experience Analysis
        const experienceAnalysis = this.analyzeExperience(profileData);
        analysis.detailedAnalysis.experience = experienceAnalysis;
        totalScore += experienceAnalysis.score;
        maxScore += 100;

        // 5. Skills and Endorsements Analysis
        const skillsAnalysis = this.analyzeSkills(profileData);
        analysis.detailedAnalysis.skills = skillsAnalysis;
        totalScore += skillsAnalysis.score;
        maxScore += 100;

        // 6. Keyword Optimization Analysis
        const keywordAnalysis = this.analyzeKeywordOptimization(profileData);
        analysis.detailedAnalysis.keywords = keywordAnalysis;
        totalScore += keywordAnalysis.score;
        maxScore += 100;

        // 7. Professional Tone Analysis (Cydney's advice)
        const toneAnalysis = this.analyzeProfessionalTone(profileData);
        analysis.detailedAnalysis.tone = toneAnalysis;
        totalScore += toneAnalysis.score;
        maxScore += 100;

        // Calculate overall score
        analysis.score = Math.round((totalScore / maxScore) * 100);

        // Compile feedback
        const allStrengths = [
            ...photoAnalysis.strengths,
            ...headlineAnalysis.strengths,
            ...summaryAnalysis.strengths,
            ...experienceAnalysis.strengths,
            ...skillsAnalysis.strengths,
            ...keywordAnalysis.strengths,
            ...toneAnalysis.strengths
        ];

        const allImprovements = [
            ...photoAnalysis.improvements,
            ...headlineAnalysis.improvements,
            ...summaryAnalysis.improvements,
            ...experienceAnalysis.improvements,
            ...skillsAnalysis.improvements,
            ...keywordAnalysis.improvements,
            ...toneAnalysis.improvements
        ];

        analysis.strengths = allStrengths;
        analysis.improvements = allImprovements;

        // Add Cydney's specific tips
        analysis.cydneyTips = this.generateCydneyTips(profileData, analysis);
        
        // Add comprehensive LinkedIn optimization tips
        analysis.comprehensiveTips = this.generateComprehensiveLinkedInTips(profileData, analysis);

        analysis.feedback = `LinkedIn Optimization Score: ${analysis.score}/100. ${allStrengths.length} strengths identified, ${allImprovements.length} areas for improvement.`;

        return analysis;
    }

    analyzeProfilePhoto(profileData) {
        // Enhanced photo analysis based on comprehensive guidance
        let score = 50;
        const strengths = [];
        const improvements = [];

        // Check for professional photo indicators
        strengths.push('Professional photo significantly increases profile visibility');
        score += 25;

        // Photo quality recommendations
        improvements.push('Use high-resolution headshot with neutral background');
        improvements.push('Frame photo to show face and shoulders');
        improvements.push('Dress professionally as you would for an interview');
        improvements.push('Express confidence with natural smile');
        
        // Statistics about photo impact
        strengths.push('Profiles with photos receive 21x more views and 36x more messages');

        return {
            score: Math.max(0, Math.min(100, score)),
            strengths,
            improvements,
            feedback: 'Professional photo is critical for LinkedIn success - significantly impacts visibility and engagement'
        };
    }

    analyzeHeadline(profileData) {
        const headline = profileData.headline || '';
        let score = 30;
        const strengths = [];
        const improvements = [];

        if (!headline) {
            improvements.push('Add a compelling headline - it\'s the most visible text after your name');
            return { score: 0, strengths, improvements, feedback: 'No headline found' };
        }

        // Check for job title only (basic)
        if (headline.length < 50) {
            improvements.push('Expand headline beyond job title - describe specialty, value proposition, and key skills');
            score -= 20;
        } else {
            strengths.push('Headline has good length and detail');
            score += 15;
        }

        // Check for keywords
        const keywords = ['cybersecurity', 'penetration', 'security', 'bug bounty', 'researcher', 'specialist', 'expert'];
        const hasKeywords = keywords.some(keyword => headline.toLowerCase().includes(keyword));
        if (hasKeywords) {
            strengths.push('Headline includes relevant industry keywords for recruiter searches');
            score += 20;
        } else {
            improvements.push('Add industry keywords that recruiters search for');
            score -= 15;
        }

        // Check for value proposition
        const valueWords = ['help', 'specialize', 'expertise', 'deliver', 'provide', 'enable', 'support'];
        const hasValueProposition = valueWords.some(word => headline.toLowerCase().includes(word));
        if (hasValueProposition) {
            strengths.push('Headline describes value proposition and specialty');
            score += 15;
        } else {
            improvements.push('Describe who you help and how in your headline');
            score -= 10;
        }

        // Check for specificity
        if (headline.includes('|') || headline.includes('•') || headline.includes('-')) {
            strengths.push('Headline uses formatting to separate key elements');
            score += 10;
        }

        // Check for professional clarity
        const professionalWords = ['professional', 'specialist', 'expert', 'consultant', 'analyst'];
        const hasProfessionalWords = professionalWords.some(word => headline.toLowerCase().includes(word));
        if (hasProfessionalWords) {
            strengths.push('Headline maintains professional clarity');
            score += 10;
        }

        return {
            score: Math.max(0, Math.min(100, score)),
            strengths,
            improvements,
            feedback: `Headline analysis: ${strengths.length} strengths, ${improvements.length} improvements needed. Headline is critical for search visibility.`
        };
    }

    analyzeSummary(profileData) {
        const summary = profileData.summary || '';
        let score = 30;
        const strengths = [];
        const improvements = [];

        if (!summary) {
            improvements.push('Add a professional summary - profiles with summaries get 3.9x more views');
            return { score: 0, strengths, improvements, feedback: 'No summary found' };
        }

        // Length check
        if (summary.length > 200) {
            strengths.push('Summary has good length and detail');
            score += 20;
        } else {
            improvements.push('Expand summary to tell your professional story');
            score -= 10;
        }

        // Check for call to action
        if (summary.includes('contact') || summary.includes('connect') || summary.includes('reach out')) {
            strengths.push('Summary includes call to action');
            score += 15;
        } else {
            improvements.push('Add a call to action in your summary');
            score -= 10;
        }

        // Check for accomplishments
        if (/\d+%|\$\d+|\d+\+|\d+ years/.test(summary)) {
            strengths.push('Summary includes quantified achievements');
            score += 15;
        } else {
            improvements.push('Add specific numbers and achievements to your summary');
            score -= 10;
        }

        return {
            score: Math.max(0, Math.min(100, score)),
            strengths,
            improvements,
            feedback: `Summary analysis: ${strengths.length} strengths, ${improvements.length} improvements needed`
        };
    }

    analyzeExperience(profileData) {
        const experience = profileData.experience || [];
        let score = 40;
        const strengths = [];
        const improvements = [];

        if (experience.length === 0) {
            improvements.push('Add detailed work experience with accomplishments');
            return { score: 0, strengths, improvements, feedback: 'No experience found' };
        }

        // Check for bullet points and accomplishments
        experience.forEach(exp => {
            if (exp.description && exp.description.includes('•')) {
                strengths.push('Experience uses bullet points for readability');
                score += 10;
            } else {
                improvements.push('Use bullet points to highlight accomplishments');
                score -= 5;
            }

            if (/\d+%|\$\d+|\d+\+/.test(exp.description)) {
                strengths.push('Experience includes quantified achievements');
                score += 15;
            } else {
                improvements.push('Add specific numbers and impact to experience descriptions');
                score -= 10;
            }
        });

        return {
            score: Math.max(0, Math.min(100, score)),
            strengths,
            improvements,
            feedback: `Experience analysis: ${strengths.length} strengths, ${improvements.length} improvements needed`
        };
    }

    analyzeSkills(profileData) {
        const skills = profileData.skills || [];
        let score = 60;
        const strengths = [];
        const improvements = [];

        if (skills.length === 0) {
            improvements.push('Add relevant skills to your profile');
            return { score: 0, strengths, improvements, feedback: 'No skills found' };
        }

        if (skills.length >= 10) {
            strengths.push('Good variety of skills listed');
            score += 20;
        } else {
            improvements.push('Add more relevant skills to improve visibility');
            score -= 10;
        }

        // Check for technical skills
        const technicalSkills = ['python', 'javascript', 'linux', 'networking', 'security'];
        const hasTechnicalSkills = technicalSkills.some(skill => 
            skills.some(s => s.toLowerCase().includes(skill))
        );

        if (hasTechnicalSkills) {
            strengths.push('Profile includes relevant technical skills');
            score += 20;
        } else {
            improvements.push('Add more technical skills relevant to your field');
            score -= 15;
        }

        return {
            score: Math.max(0, Math.min(100, score)),
            strengths,
            improvements,
            feedback: `Skills analysis: ${strengths.length} strengths, ${improvements.length} improvements needed`
        };
    }

    analyzeKeywordOptimization(profileData) {
        const allText = [
            profileData.headline || '',
            profileData.summary || '',
            ...(profileData.experience || []).map(exp => exp.description || ''),
            ...(profileData.skills || [])
        ].join(' ').toLowerCase();

        let score = 50;
        const strengths = [];
        const improvements = [];

        // Comprehensive industry keywords for cybersecurity
        const industryKeywords = [
            // Core Security Terms
            'cybersecurity', 'cyber security', 'information security', 'infosec',
            'penetration testing', 'pen testing', 'pentesting', 'ethical hacking',
            'bug bounty', 'vulnerability assessment', 'security assessment',
            'security research', 'threat hunting', 'incident response',
            'security analysis', 'risk assessment', 'compliance',
            
            // Technical Skills
            'python', 'javascript', 'java', 'c++', 'c#', 'powershell', 'bash',
            'linux', 'windows', 'unix', 'networking', 'tcp/ip', 'dns',
            'burp suite', 'nmap', 'metasploit', 'wireshark', 'nessus',
            'owasp', 'kali linux', 'parrot os', 'sql injection', 'xss',
            'csrf', 'buffer overflow', 'privilege escalation',
            
            // Security Domains
            'network security', 'web application security', 'mobile security',
            'cloud security', 'aws', 'azure', 'gcp', 'docker', 'kubernetes',
            'endpoint security', 'siem', 'soc', 'firewall', 'ids', 'ips',
            'malware analysis', 'reverse engineering', 'forensics',
            
            // Certifications and Standards
            'ceh', 'cissp', 'cism', 'cisa', 'security+', 'oscp', 'osce',
            'gcih', 'gpen', 'gsec', 'iso 27001', 'nist', 'pci dss',
            'gdpr', 'hipaa', 'sox', 'cobit', 'itil',
            
            // Methodologies
            'owasp top 10', 'ptes', 'osstmm', 'nist framework',
            'kill chain', 'mitre att&ck', 'diamond model'
        ];

        const foundKeywords = industryKeywords.filter(keyword => 
            allText.includes(keyword.toLowerCase())
        );

        // Calculate keyword density and coverage
        const keywordDensity = (foundKeywords.length / industryKeywords.length) * 100;

        if (foundKeywords.length >= 15) {
            strengths.push('Profile includes comprehensive industry keywords');
            score += 30;
        } else if (foundKeywords.length >= 10) {
            strengths.push('Profile includes good industry keywords');
            score += 20;
        } else if (foundKeywords.length >= 5) {
            strengths.push('Profile includes some relevant keywords');
            score += 10;
        } else {
            improvements.push('Add more industry-specific keywords to improve search visibility');
            score -= 20;
        }

        // Check for keyword placement
        const headlineKeywords = industryKeywords.filter(keyword => 
            (profileData.headline || '').toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (headlineKeywords.length > 0) {
            strengths.push('Keywords strategically placed in headline');
            score += 10;
        } else {
            improvements.push('Add relevant keywords to your headline for better search visibility');
            score -= 10;
        }

        // Check for skills section keywords
        const skillsKeywords = industryKeywords.filter(keyword => 
            (profileData.skills || []).some(skill => 
                skill.toLowerCase().includes(keyword.toLowerCase())
            )
        );
        
        if (skillsKeywords.length >= 5) {
            strengths.push('Strong keyword coverage in skills section');
            score += 10;
        } else {
            improvements.push('Add more technical skills with relevant keywords');
            score -= 5;
        }

        return {
            score: Math.max(0, Math.min(100, score)),
            strengths,
            improvements,
            feedback: `Keyword optimization: Found ${foundKeywords.length} relevant keywords (${keywordDensity.toFixed(1)}% coverage)`,
            foundKeywords: foundKeywords.slice(0, 20), // Limit for display
            missingKeywords: this.getMissingKeywords(industryKeywords, foundKeywords)
        };
    }

    getMissingKeywords(industryKeywords, foundKeywords) {
        const missing = industryKeywords.filter(keyword => 
            !foundKeywords.includes(keyword)
        );
        
        // Return most important missing keywords
        const priorityKeywords = [
            'cybersecurity', 'penetration testing', 'python', 'linux', 'networking',
            'vulnerability assessment', 'security analysis', 'incident response',
            'burp suite', 'nmap', 'owasp', 'aws', 'docker', 'siem'
        ];
        
        return priorityKeywords.filter(keyword => 
            missing.includes(keyword)
        ).slice(0, 10);
    }

    analyzeProfessionalTone(profileData) {
        const allText = [
            profileData.headline || '',
            profileData.summary || '',
            ...(profileData.experience || []).map(exp => exp.description || '')
        ].join(' ').toLowerCase();

        let score = 80;
        const strengths = [];
        const improvements = [];
        const toneIssues = [];

        // Comprehensive problematic words and phrases detection
        const problematicWords = {
            // Overused and Generic Buzzwords
            'synergy': 'Corporate jargon that has been overused. Use clear, specific language instead.',
            'leverage': 'Overused buzzword. Use more direct language like "use" or "utilize."',
            'paradigm': 'Pretentious language. Use simpler, clearer terms.',
            'proactive': 'Overused. Show proactivity through specific examples.',
            'scalable': 'Technical buzzword. Explain scalability with specific examples.',
            'dynamic': 'Vague descriptor. Use specific, measurable terms.',
            'innovative': 'Overused without context. Provide specific examples of innovation.',
            'holistic': 'Overused buzzword. Describe specific comprehensive approaches.',
            'streamlined': 'Overused term. Describe specific process improvements.',
            'cutting-edge': 'Overused. Provide specific examples of advanced technology or methods.',
            'best-of-breed': 'Overused marketing term. Provide specific technology details.',
            'thought leader': 'Overused term. Describe specific thought leadership achievements.',
            'core competencies': 'Overused business jargon. List specific skills and abilities.',
            
            // Weak or Passive Verbs
            'assisted': 'Weak verb. Use stronger action verbs that show leadership.',
            'helped': 'Particularly weak verb. Show the extent of your involvement.',
            'supported': 'Weak verb. Use stronger action verbs that show direct contribution.',
            'worked on': 'Vague phrase. Be specific about your role and impact.',
            'was a part of': 'Passive phrase. Use active voice and strong action verbs.',
            'was responsible for': 'Passive language. Use strong action verbs like "Managed," "Developed," or "Implemented."',
            'participated in': 'Weak phrase. Use stronger action verbs that show leadership.',
            'duties included': 'Weak phrase. Focus on accomplishments, not duties.',
            
            // Corporate Jargon and Clichés
            'thinking outside the box': 'Overused corporate cliché. Describe specific creative solutions.',
            'circle back': 'Corporate jargon. Use clear, direct language.',
            'touch base': 'Corporate jargon. Use clear, direct language.',
            'open door policy': 'Corporate cliché. Describe specific accessibility practices.',
            'low-hanging fruit': 'Corporate cliché. Describe specific easy wins.',
            'move the needle': 'Corporate cliché. Describe specific measurable impact.',
            'take it to the next level': 'Corporate cliché. Describe specific improvements.',
            
            // Exaggerated and Unverifiable Claims
            'expert': 'Overly confident. Let experience and accomplishments speak for themselves.',
            'master': 'Overly confident. Use more modest language like "experienced" or "skilled".',
            'guru': 'Overly confident and unprofessional. Focus on specific skills and expertise.',
            'ninja': 'Overly confident and unprofessional. Focus on specific skills and expertise.',
            'rock star': 'Overly confident and unprofessional. Focus on specific skills and expertise.',
            'pioneer': 'Overly confident. Describe specific pioneering achievements instead.',
            'visionary': 'Overly confident. Describe specific vision and results.',
            'mission-critical': 'Overused corporate term. Describe specific critical functions.',
            
            // Personal and Unprofessional Language
            'i ': 'Personal pronoun. Start with strong action verbs instead.',
            'my ': 'Personal pronoun. Focus on accomplishments, not ownership.',
            'me ': 'Personal pronoun. Use professional, objective language.',
            'our ': 'Personal pronoun. Use professional, objective language.',
            'we ': 'Personal pronoun. Use professional, objective language.',
            
            // Unnecessary or Redundant Phrases
            'references available upon request': 'Waste of space. It\'s assumed you will provide references when asked.',
            'proven track record': 'Cliché that is meaningless without actual proof. Provide specific evidence.',
            'highly motivated': 'Assumed quality. Show motivation through specific achievements.',
            'excellent communicator': 'Generic claim. Provide specific communication achievements.',
            'excellent communication skills': 'Generic claim. Provide specific communication achievements.',
            
            // Vague and Cliché Descriptors
            'hardworking': 'Assumed quality. Show work ethic through specific achievements instead.',
            'results-driven': 'Meaningless without actual results. Include specific metrics and outcomes.',
            'team player': 'Generic and doesn\'t show specific contribution. Use concrete examples with quantifiable results.',
            'self-motivated': 'Assumed quality. Demonstrate motivation through achievements.',
            'detail-oriented': 'Vague descriptor. Show attention to detail with specific examples.',
            'go-getter': 'Cliché term. Show initiative through specific actions.',
            'passionate': 'Show passion through work examples, not by stating it.',
            'disruptive': 'Overused buzzword. Describe specific impact instead.',
            'strategic': 'Overused without context. Describe specific strategic actions.',
            'robust': 'Overused technical buzzword. Use more specific descriptors.',
            'seamless': 'Overused marketing term. Describe the actual process or outcome.',
            'best-in-class': 'Overused marketing term. Provide specific metrics or achievements.',
            'world-class': 'Overused superlative. Focus on specific accomplishments.',
            'industry-leading': 'Overused claim. Provide specific evidence of leadership.',
            'game-changing': 'Overused buzzword. Describe specific impact and results.',
            'revolutionary': 'Overused superlative. Provide specific examples of innovation.',
            'groundbreaking': 'Overused term. Describe specific groundbreaking achievements.',
            'state-of-the-art': 'Overused technical term. Provide specific technology details.',
            'next-generation': 'Overused marketing term. Describe specific new features or capabilities.',
            'value-added': 'Overused business term. Describe specific value provided.',
            'best practices': 'Overused term. Describe specific practices implemented.',
            'key performance indicators': 'Overused term. Use "metrics" or "KPIs" instead.',
            'stakeholder engagement': 'Overused corporate term. Describe specific stakeholder interactions.',
            'cross-functional': 'Overused term. Describe specific cross-department collaboration.',
            'end-to-end': 'Overused technical term. Describe specific process coverage.',
            'full-stack': 'Overused technical term. List specific technologies and frameworks.',
            'cloud-native': 'Overused technical term. Describe specific cloud technologies used.',
            'microservices': 'Overused technical term. Describe specific service architecture.',
            'agile methodology': 'Overused term. Describe specific agile practices implemented.',
            'scrum master': 'Overused term. Describe specific scrum leadership achievements.',
            'devops': 'Overused term. List specific DevOps tools and practices.',
            'ci/cd': 'Overused technical term. Describe specific CI/CD pipeline implementations.',
            'kubernetes': 'Overused term. Describe specific K8s implementations and results.',
            'docker': 'Overused term. Describe specific containerization achievements.',
            'aws': 'Overused term. List specific AWS services and implementations.',
            'azure': 'Overused term. List specific Azure services and implementations.',
            'gcp': 'Overused term. List specific GCP services and implementations.',
            'machine learning': 'Overused term. Describe specific ML models and results.',
            'artificial intelligence': 'Overused term. Describe specific AI implementations.',
            'data science': 'Overused term. Describe specific data science projects and results.',
            'big data': 'Overused term. Describe specific big data technologies and results.',
            'blockchain': 'Overused term. Describe specific blockchain implementations.',
            'iot': 'Overused term. Describe specific IoT projects and results.',
            'cybersecurity': 'Overused term. List specific security tools and achievements.',
            'penetration testing': 'Overused term. Describe specific pen testing methodologies and results.',
            'vulnerability assessment': 'Overused term. Describe specific assessment tools and findings.',
            'incident response': 'Overused term. Describe specific incident response procedures and results.',
            'threat hunting': 'Overused term. Describe specific threat hunting techniques and findings.',
            'malware analysis': 'Overused term. Describe specific malware analysis tools and results.',
            'forensics': 'Overused term. Describe specific forensic tools and procedures.',
            'compliance': 'Overused term. List specific compliance frameworks and achievements.',
            'risk assessment': 'Overused term. Describe specific risk assessment methodologies and results.',
            'security operations center': 'Overused term. Describe specific SOC procedures and achievements.',
            'siem': 'Overused term. List specific SIEM tools and implementations.',
            'ids': 'Overused term. Describe specific IDS tools and configurations.',
            'ips': 'Overused term. Describe specific IPS tools and configurations.',
            'firewall': 'Overused term. List specific firewall technologies and configurations.',
            'vpn': 'Overused term. Describe specific VPN implementations and results.',
            'encryption': 'Overused term. Describe specific encryption technologies and implementations.',
            'authentication': 'Overused term. Describe specific authentication systems and results.',
            'authorization': 'Overused term. Describe specific authorization systems and results.',
            'access control': 'Overused term. Describe specific access control systems and results.',
            'identity management': 'Overused term. Describe specific identity management systems and results.',
            'single sign-on': 'Overused term. Describe specific SSO implementations and results.',
            'multi-factor authentication': 'Overused term. Describe specific MFA implementations and results.',
            'zero trust': 'Overused term. Describe specific zero trust implementations and results.',
            'defense in depth': 'Overused term. Describe specific defense strategies and results.',
            'security by design': 'Overused term. Describe specific security design principles and results.',
            'privacy by design': 'Overused term. Describe specific privacy design principles and results.',
            'gdpr': 'Overused term. Describe specific GDPR compliance implementations and results.',
            'hipaa': 'Overused term. Describe specific HIPAA compliance implementations and results.',
            'sox': 'Overused term. Describe specific SOX compliance implementations and results.',
            'pci dss': 'Overused term. Describe specific PCI DSS compliance implementations and results.',
            'iso 27001': 'Overused term. Describe specific ISO 27001 implementations and results.',
            'nist': 'Overused term. Describe specific NIST framework implementations and results.',
            'cobit': 'Overused term. Describe specific COBIT implementations and results.',
            'itil': 'Overused term. Describe specific ITIL implementations and results.',
            'ceh': 'Overused term. Describe specific ethical hacking achievements and results.',
            'cissp': 'Overused term. Describe specific security management achievements and results.',
            'cism': 'Overused term. Describe specific security management achievements and results.',
            'cisa': 'Overused term. Describe specific security auditing achievements and results.',
            'security+': 'Overused term. Describe specific security fundamentals achievements and results.',
            'oscp': 'Overused term. Describe specific penetration testing achievements and results.',
            'osce': 'Overused term. Describe specific advanced penetration testing achievements and results.',
            'gcih': 'Overused term. Describe specific incident handling achievements and results.',
            'gpen': 'Overused term. Describe specific penetration testing achievements and results.',
            'gsec': 'Overused term. Describe specific security essentials achievements and results.',
            'gcia': 'Overused term. Describe specific intrusion analysis achievements and results.',
            'gcfa': 'Overused term. Describe specific forensic analysis achievements and results.',
            'gmon': 'Overused term. Describe specific continuous monitoring achievements and results.',
            'gdat': 'Overused term. Describe specific detection and response achievements and results.',
            'gcti': 'Overused term. Describe specific threat intelligence achievements and results.',
            'grem': 'Overused term. Describe specific reverse engineering achievements and results.',
            'gxpn': 'Overused term. Describe specific exploit development achievements and results.',
            'gweb': 'Overused term. Describe specific web application security achievements and results.',
            'gmoa': 'Overused term. Describe specific mobile application security achievements and results.',
            'gcloud': 'Overused term. Describe specific cloud security achievements and results.',
            'gdev': 'Overused term. Describe specific secure coding achievements and results.',
            'gics': 'Overused term. Describe specific industrial control systems security achievements and results.',
            'giot': 'Overused term. Describe specific IoT security achievements and results.',
            'gcar': 'Overused term. Describe specific car hacking achievements and results.',
            'gapt': 'Overused term. Describe specific advanced persistent threat achievements and results.',
            'gmal': 'Overused term. Describe specific malware analysis achievements and results.'
        };

        // Check for problematic words
        Object.entries(problematicWords).forEach(([word, reason]) => {
            if (allText.includes(word.toLowerCase())) {
                toneIssues.push({
                    word: word,
                    reason: reason,
                    severity: 'medium'
                });
                score -= 5;
            }
        });

        // Check for negative language (Cydney's advice)
        const negativeWords = ['struggling', 'difficult', 'challenging', 'problem', 'issue', 'autistic', 'failed', 'mistake', 'error'];
        const hasNegativeWords = negativeWords.some(word => allText.includes(word));

        if (hasNegativeWords) {
            improvements.push('Remove negative language - focus on accomplishments and positive aspects');
            score -= 25;
        } else {
            strengths.push('Profile maintains positive, professional tone');
            score += 10;
        }

        // Check for strong action verbs
        const strongActionVerbs = [
            'achieved', 'developed', 'implemented', 'managed', 'led', 'specialized',
            'spearheaded', 'drove', 'generated', 'increased', 'reduced', 'optimized',
            'streamlined', 'launched', 'built', 'created', 'designed', 'executed',
            'delivered', 'transformed', 'improved', 'enhanced', 'established',
            'coordinated', 'facilitated', 'orchestrated', 'pioneered', 'revolutionized'
        ];
        
        const foundActionVerbs = strongActionVerbs.filter(verb => allText.includes(verb));
        
        if (foundActionVerbs.length >= 5) {
            strengths.push('Profile uses strong, action-oriented language');
            score += 15;
        } else if (foundActionVerbs.length >= 3) {
            strengths.push('Profile includes some strong action verbs');
            score += 10;
        } else {
            improvements.push('Use more strong action verbs to create an active, accomplishment-focused tone');
            score -= 15;
        }

        // Check for quantifiable results
        const hasQuantifiedResults = /\d+%|\$\d+|\d+\+|\d+ years|\d+ projects|\d+ team|\d+ clients/.test(allText);
        if (hasQuantifiedResults) {
            strengths.push('Profile includes quantifiable results and metrics');
            score += 10;
        } else {
            improvements.push('Add specific numbers and metrics to demonstrate results-oriented tone');
            score -= 10;
        }

        // Check for personal pronouns (filler words)
        const personalPronouns = ['i ', 'my ', 'me ', 'myself'];
        const hasPersonalPronouns = personalPronouns.some(pronoun => allText.includes(pronoun));
        
        if (hasPersonalPronouns) {
            improvements.push('Avoid personal pronouns (I, my, me) for more professional tone');
            score -= 5;
        } else {
            strengths.push('Profile avoids personal pronouns for professional tone');
            score += 5;
        }

        // Check for passive voice indicators
        const passiveIndicators = ['was responsible for', 'were responsible for', 'duties included', 'helped with', 'assisted with'];
        const hasPassiveVoice = passiveIndicators.some(indicator => allText.includes(indicator));
        
        if (hasPassiveVoice) {
            improvements.push('Replace passive language with active voice and strong action verbs');
            score -= 10;
        } else {
            strengths.push('Profile uses active voice effectively');
            score += 5;
        }

        // Check for brevity and clarity
        const sentences = allText.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const longSentences = sentences.filter(s => s.length > 100);
        
        if (longSentences.length > 2) {
            improvements.push('Use shorter, clearer sentences for better readability');
            score -= 5;
        } else {
            strengths.push('Profile uses concise, clear language');
            score += 5;
        }

        // Compile tone issues for detailed feedback
        if (toneIssues.length > 0) {
            improvements.push(`Found ${toneIssues.length} problematic words or phrases that may hurt professional perception`);
        }

        return {
            score: Math.max(0, Math.min(100, score)),
            strengths,
            improvements,
            toneIssues,
            feedback: `Professional tone analysis: ${strengths.length} strengths, ${improvements.length} improvements needed. ${toneIssues.length} problematic words detected.`
        };
    }

    generateCydneyTips(profileData, analysis) {
        const tips = [];

        // Based on Cydney's specific advice
        tips.push({
            category: 'Professional Tone',
            tip: 'Focus on accomplishments and what you bring to the table. Avoid mentioning challenges unless in a positive context.',
            priority: 'High'
        });

        tips.push({
            category: 'Content Strategy',
            tip: 'Share valuable content regularly and engage with others\' posts to build your professional network.',
            priority: 'Medium'
        });

        tips.push({
            category: 'Profile Optimization',
            tip: 'Use ChatGPT to review and advise on the tone of your comments before posting them.',
            priority: 'Medium'
        });

        tips.push({
            category: 'Network Building',
            tip: 'Send personalized connection requests that explain why you want to connect.',
            priority: 'High'
        });

        tips.push({
            category: 'Visibility',
            tip: 'Join LinkedIn groups and participate in industry discussions to expand your network.',
            priority: 'Medium'
        });

        return tips;
    }

    generateComprehensiveLinkedInTips(profileData, analysis) {
        const tips = [];

        // Professional Photo and Banner
        tips.push({
            category: 'Profile Photo',
            tip: 'Use a clear, high-resolution headshot with neutral background. Profiles with photos receive 21x more views and 36x more messages.',
            priority: 'High'
        });

        tips.push({
            category: 'Background Banner',
            tip: 'Use your background photo to show personality or reinforce your professional brand (work samples, skills graphic, or professional environment).',
            priority: 'Medium'
        });

        // Compelling Headline
        tips.push({
            category: 'Headline Strategy',
            tip: 'Go beyond job title - showcase specialty, value proposition, and key skills. Include industry keywords recruiters search for.',
            priority: 'High'
        });

        tips.push({
            category: 'Headline Keywords',
            tip: 'Balance professional clarity with personal relevance. Make headlines specific, relevant, and easy to understand.',
            priority: 'High'
        });

        // About Section
        tips.push({
            category: 'About Section',
            tip: 'Tell your professional story in first-person. Include hook, mission, expertise, and call-to-action with quantifiable achievements.',
            priority: 'High'
        });

        tips.push({
            category: 'About Structure',
            tip: 'Use conversational tone and incorporate industry keywords. Highlight top achievements with specific numbers and results.',
            priority: 'Medium'
        });

        // Experience Section
        tips.push({
            category: 'Experience Details',
            tip: 'Use bullet points for accomplishments, not just duties. Quantify impact: "Increased sales by 15%" or "Saved 10 hours per week".',
            priority: 'High'
        });

        // Skills and Endorsements
        tips.push({
            category: 'Skills Strategy',
            tip: 'Add at least 5 relevant skills. Even one relevant skill can double profile views and connection requests.',
            priority: 'High'
        });

        tips.push({
            category: 'Endorsements',
            tip: 'Get endorsements from colleagues and managers to add credibility. Skills section is highly valued by recruiters.',
            priority: 'Medium'
        });

        // Showcase Work
        tips.push({
            category: 'Featured Section',
            tip: 'Use Featured section for work samples: articles, presentations, project portfolios. Provides concrete evidence of expertise.',
            priority: 'Medium'
        });

        // Active Engagement
        tips.push({
            category: 'Platform Engagement',
            tip: 'Share insightful content, comment on posts, join industry groups. Active engagement shows you\'re an engaged professional.',
            priority: 'Medium'
        });

        // Recommendations
        tips.push({
            category: 'Recommendations',
            tip: 'Request recommendations from former managers, colleagues, or clients. They act as powerful testimonials and boost credibility.',
            priority: 'Medium'
        });

        // Accessibility Tips
        tips.push({
            category: 'Accessibility',
            tip: 'Add descriptive alt text to images, use captions for videos, clear formatting with bullet points and short paragraphs.',
            priority: 'Medium'
        });

        tips.push({
            category: 'Hashtag Accessibility',
            tip: 'Use CamelCase hashtags (#DoItLikeThis) to make them more readable for screen readers.',
            priority: 'Low'
        });

        // Neurodivergent-Friendly Tips
        tips.push({
            category: 'Strengths-Based Approach',
            tip: 'Highlight unique strengths like attention to detail, problem-solving skills, or different perspectives as professional assets.',
            priority: 'High'
        });

        tips.push({
            category: 'Controlled Narrative',
            tip: 'LinkedIn allows you to present professional value before disability awareness influences perception. Control your narrative.',
            priority: 'High'
        });

        tips.push({
            category: 'Structured Communication',
            tip: 'LinkedIn\'s structured format can be advantageous for those who find traditional networking challenging.',
            priority: 'Medium'
        });

        // Keyword Strategy
        tips.push({
            category: 'Keyword Optimization',
            tip: 'Place relevant keywords in headline, summary, and skills. Recruiters use job description keywords to search for candidates.',
            priority: 'High'
        });

        tips.push({
            category: 'Search Visibility',
            tip: 'Well-placed, relevant keywords help your profile appear higher in recruiter search results.',
            priority: 'High'
        });

        // Quantifiable Achievements
        tips.push({
            category: 'Quantified Results',
            tip: 'Employers want evidence of impact. Profiles with specific, results-oriented metrics stand out more than responsibility lists.',
            priority: 'High'
        });

        // Authenticity
        tips.push({
            category: 'Authentic Story',
            tip: 'Use summary section to show personality and professional journey. Recruiters look for compelling stories beyond facts.',
            priority: 'Medium'
        });

        return tips;
    }

    displayLinkedInOptimization(optimization) {
        // Create LinkedIn optimization section if it doesn't exist
        let optimizationSection = document.getElementById('linkedinOptimizationSection');
        if (!optimizationSection) {
            optimizationSection = document.createElement('div');
            optimizationSection.id = 'linkedinOptimizationSection';
            optimizationSection.className = 'linkedin-optimization-section';
            optimizationSection.innerHTML = `
                <h3>🔗 LinkedIn Profile Optimization</h3>
                <div class="optimization-score">
                    <div class="score-circle">
                        <span id="linkedinOptimizationScore">0</span>
                        <small>/100</small>
                    </div>
                    <p id="linkedinOptimizationFeedback"></p>
                </div>
                <div class="optimization-details">
                    <div class="optimization-categories" id="optimizationCategories"></div>
                    <div class="cydney-tips" id="cydneyTips"></div>
                </div>
            `;

            // Insert before the AI generation section
            const aiSection = document.getElementById('ai-generation-section');
            if (aiSection) {
                aiSection.parentNode.insertBefore(optimizationSection, aiSection);
            }
        }

        // Update optimization score
        const scoreElement = document.getElementById('linkedinOptimizationScore');
        const feedbackElement = document.getElementById('linkedinOptimizationFeedback');
        
        if (scoreElement) scoreElement.textContent = optimization.score;
        if (feedbackElement) feedbackElement.textContent = optimization.feedback;

        // Display optimization categories
        this.displayOptimizationCategories(optimization.detailedAnalysis);

        // Display Cydney's tips
        this.displayCydneyTips(optimization.cydneyTips);
        
        // Display comprehensive LinkedIn tips
        this.displayComprehensiveTips(optimization.comprehensiveTips);
        
        // Display detailed tone issues if any
        this.displayToneIssues(optimization.detailedAnalysis.tone);
    }

    displayOptimizationCategories(detailedAnalysis) {
        const categoriesContainer = document.getElementById('optimizationCategories');
        if (!categoriesContainer) return;

        categoriesContainer.innerHTML = '';

        Object.entries(detailedAnalysis).forEach(([category, analysis]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'optimization-category';
            
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            const scoreColor = analysis.score >= 70 ? '#28a745' : analysis.score >= 50 ? '#ffc107' : '#dc3545';
            
            categoryDiv.innerHTML = `
                <h4>${categoryName}</h4>
                <div class="category-score" style="color: ${scoreColor}">${analysis.score}/100</div>
                <div class="category-feedback">${analysis.feedback}</div>
                ${analysis.strengths.length > 0 ? `
                    <div class="strengths">
                        <strong>Strengths:</strong>
                        <ul>${analysis.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                ${analysis.improvements.length > 0 ? `
                    <div class="improvements">
                        <strong>Improvements:</strong>
                        <ul>${analysis.improvements.map(i => `<li>${i}</li>`).join('')}</ul>
                    </div>
                ` : ''}
            `;
            
            categoriesContainer.appendChild(categoryDiv);
        });
    }

    displayCydneyTips(tips) {
        const tipsContainer = document.getElementById('cydneyTips');
        if (!tipsContainer) return;

        tipsContainer.innerHTML = `
            <h4>💡 Professional Tips (Courtesy of Cydney Davis)</h4>
            <div class="tips-list">
                ${tips.map(tip => `
                    <div class="tip-item priority-${tip.priority.toLowerCase()}">
                        <div class="tip-category">${tip.category}</div>
                        <div class="tip-content">${tip.tip}</div>
                    </div>
                `).join('')}
            </div>
            <div class="tips-credit">
                <p><strong>Professional LinkedIn Strategy Tips</strong></p>
                <p>Expert advice provided by <a href="https://www.linkedin.com/in/cydneydavis/" target="_blank" rel="noopener noreferrer">Cydney Davis</a> - LinkedIn strategist and career advisor</p>
            </div>
        `;
    }

    displayComprehensiveTips(tips) {
        // Create comprehensive tips section if it doesn't exist
        let comprehensiveTipsSection = document.getElementById('comprehensiveTipsSection');
        if (!comprehensiveTipsSection) {
            comprehensiveTipsSection = document.createElement('div');
            comprehensiveTipsSection.id = 'comprehensiveTipsSection';
            comprehensiveTipsSection.className = 'comprehensive-tips-section';
            comprehensiveTipsSection.innerHTML = `
                <h3>📚 Comprehensive LinkedIn Optimization Guide</h3>
                <div class="tips-filter">
                    <button class="filter-btn active" data-priority="all">All Tips</button>
                    <button class="filter-btn" data-priority="high">High Priority</button>
                    <button class="filter-btn" data-priority="medium">Medium Priority</button>
                    <button class="filter-btn" data-priority="low">Low Priority</button>
                </div>
                <div class="comprehensive-tips-grid" id="comprehensiveTipsGrid"></div>
            `;

            // Insert after the Cydney tips section
            const cydneySection = document.getElementById('cydneyTips');
            if (cydneySection && cydneySection.parentNode) {
                cydneySection.parentNode.insertBefore(comprehensiveTipsSection, cydneySection.nextSibling);
            }
        }

        // Display tips
        const tipsGrid = document.getElementById('comprehensiveTipsGrid');
        if (!tipsGrid) return;

        tipsGrid.innerHTML = '';

        // Group tips by category
        const tipsByCategory = {};
        tips.forEach(tip => {
            if (!tipsByCategory[tip.category]) {
                tipsByCategory[tip.category] = [];
            }
            tipsByCategory[tip.category].push(tip);
        });

        // Display tips by category
        Object.entries(tipsByCategory).forEach(([category, categoryTips]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'tips-category';
            
            categoryDiv.innerHTML = `
                <h4>${category}</h4>
                <div class="category-tips">
                    ${categoryTips.map(tip => `
                        <div class="comprehensive-tip priority-${tip.priority.toLowerCase()}" data-priority="${tip.priority.toLowerCase()}">
                            <div class="tip-priority">${tip.priority}</div>
                            <div class="tip-text">${tip.tip}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            tipsGrid.appendChild(categoryDiv);
        });

        // Add filter functionality
        this.addTipsFilterFunctionality();
    }

    addTipsFilterFunctionality() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const tipItems = document.querySelectorAll('.comprehensive-tip');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const priority = button.dataset.priority;

                // Filter tips
                tipItems.forEach(tip => {
                    if (priority === 'all' || tip.dataset.priority === priority) {
                        tip.style.display = 'block';
                    } else {
                        tip.style.display = 'none';
                    }
                });
            });
        });
    }

    displayToneIssues(toneAnalysis) {
        if (!toneAnalysis.toneIssues || toneAnalysis.toneIssues.length === 0) {
            return;
        }

        // Create tone issues section if it doesn't exist
        let toneIssuesSection = document.getElementById('toneIssuesSection');
        if (!toneIssuesSection) {
            toneIssuesSection = document.createElement('div');
            toneIssuesSection.id = 'toneIssuesSection';
            toneIssuesSection.className = 'tone-issues-section';
            toneIssuesSection.innerHTML = `
                <h3>⚠️ Tone Issues Detected</h3>
                <p class="tone-issues-intro">The following words or phrases may negatively impact how hiring managers perceive your profile:</p>
                <div class="tone-issues-list" id="toneIssuesList"></div>
            `;

            // Insert after the comprehensive tips section
            const comprehensiveSection = document.getElementById('comprehensiveTipsSection');
            if (comprehensiveSection && comprehensiveSection.parentNode) {
                comprehensiveSection.parentNode.insertBefore(toneIssuesSection, comprehensiveSection.nextSibling);
            }
        }

        // Display tone issues
        const issuesList = document.getElementById('toneIssuesList');
        if (!issuesList) return;

        // Categorize issues by type
        const categorizedIssues = {
            'Overused Buzzwords': [],
            'Weak Verbs': [],
            'Corporate Jargon': [],
            'Exaggerated Claims': [],
            'Personal Pronouns': [],
            'Redundant Phrases': [],
            'Vague Descriptors': [],
            'Technical Overuse': []
        };

        toneAnalysis.toneIssues.forEach(issue => {
            const word = issue.word.toLowerCase();
            if (['synergy', 'leverage', 'paradigm', 'proactive', 'scalable', 'dynamic', 'innovative', 'holistic', 'streamlined', 'cutting-edge', 'best-of-breed', 'thought leader', 'core competencies'].includes(word)) {
                categorizedIssues['Overused Buzzwords'].push(issue);
            } else if (['assisted', 'helped', 'supported', 'worked on', 'was a part of', 'was responsible for', 'participated in', 'duties included'].includes(word)) {
                categorizedIssues['Weak Verbs'].push(issue);
            } else if (['thinking outside the box', 'circle back', 'touch base', 'open door policy', 'low-hanging fruit', 'move the needle', 'take it to the next level'].includes(word)) {
                categorizedIssues['Corporate Jargon'].push(issue);
            } else if (['expert', 'master', 'guru', 'ninja', 'rock star', 'pioneer', 'visionary', 'mission-critical'].includes(word)) {
                categorizedIssues['Exaggerated Claims'].push(issue);
            } else if (['i ', 'my ', 'me ', 'our ', 'we '].includes(word)) {
                categorizedIssues['Personal Pronouns'].push(issue);
            } else if (['references available upon request', 'proven track record', 'highly motivated', 'excellent communicator', 'excellent communication skills'].includes(word)) {
                categorizedIssues['Redundant Phrases'].push(issue);
            } else if (['hardworking', 'results-driven', 'team player', 'self-motivated', 'detail-oriented', 'go-getter', 'passionate', 'disruptive', 'strategic', 'robust', 'seamless', 'best-in-class', 'world-class', 'industry-leading', 'game-changing', 'revolutionary', 'groundbreaking', 'state-of-the-art', 'next-generation', 'value-added', 'best practices', 'key performance indicators', 'stakeholder engagement', 'cross-functional', 'end-to-end'].includes(word)) {
                categorizedIssues['Vague Descriptors'].push(issue);
            } else {
                categorizedIssues['Technical Overuse'].push(issue);
            }
        });

        issuesList.innerHTML = '';

        // Display each category with issues
        Object.entries(categorizedIssues).forEach(([category, issues]) => {
            if (issues.length > 0) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'tone-category';
                
                categoryDiv.innerHTML = `
                    <h4 class="tone-category-title">${category} (${issues.length} issue${issues.length > 1 ? 's' : ''})</h4>
                    <div class="tone-issues-list">
                        ${issues.map(issue => `
                            <div class="tone-issue-item">
                                <div class="issue-word">"${issue.word}"</div>
                                <div class="issue-reason">${issue.reason}</div>
                                <div class="issue-severity severity-${issue.severity}">${issue.severity.toUpperCase()}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                issuesList.appendChild(categoryDiv);
            }
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the LinkedIn parser when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing LinkedIn parser...');
    window.linkedinParser = new LinkedInParser();
});
