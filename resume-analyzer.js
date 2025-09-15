class ResumeAnalyzer {
    constructor() {
        this.models = {};
        this.isInitialized = false;
        this.carhartFramework = new CarhartResumeFramework();
    }

    async initialize() {
        try {
            await this.loadModels();
            this.isInitialized = true;
            console.log('Resume analyzer initialized successfully');
        } catch (error) {
            console.error('Failed to initialize resume analyzer:', error);
            throw error;
        }
    }

    async loadModels() {
        this.models = {
            nlp: new SimpleNLPModel(),
            keywordMatcher: new KeywordMatcher(),
            contentAnalyzer: new ContentAnalyzer(),
            carhartAnalyzer: this.carhartFramework
        };
    }

    async analyzeResume(resumeText, jobDescription = '') {
        if (!this.isInitialized) {
            await this.initialize();
        }

        const analysis = {
            // Traditional analysis
            contentQuality: this.analyzeContentQuality(resumeText),
            keywordMatch: this.analyzeKeywordMatch(resumeText, jobDescription),
            structure: this.analyzeStructure(resumeText),
            actionVerbs: this.analyzeActionVerbs(resumeText),
            
            // Enhanced Carhart-based analysis
            carhartAnalysis: this.carhartFramework.analyze(resumeText, jobDescription),
            strategicPositioning: this.analyzeStrategicPositioning(resumeText, jobDescription),
            interviewReadiness: this.assessInterviewReadiness(resumeText),
            gatekeepingAnalysis: this.analyzeGatekeepingText(resumeText),
            
            suggestions: this.generateSuggestions(resumeText, jobDescription),
            keywords: this.extractKeywords(resumeText, jobDescription),
            potentialQuestions: this.generateInterviewQuestions(resumeText)
        };

        // Calculate overall score with Carhart weighting
        analysis.overallScore = this.calculateEnhancedScore(analysis);

        return analysis;
    }

    calculateEnhancedScore(analysis) {
        const weights = {
            contentQuality: 0.18,
            keywordMatch: 0.18,
            structure: 0.12,
            actionVerbs: 0.08,
            carhartAnalysis: 0.22,
            strategicPositioning: 0.08,
            gatekeepingAnalysis: 0.14
        };

        let weightedScore = 0;
        for (const [key, weight] of Object.entries(weights)) {
            weightedScore += (analysis[key].score || 0) * weight;
        }

        return Math.round(weightedScore);
    }

    analyzeStrategicPositioning(resumeText, jobDescription) {
        const analysis = {
            score: 75,
            feedback: '',
            strengths: [],
            opportunities: []
        };

        // Check for non-traditional background advantage
        const nonTraditionalKeywords = ['avionics', 'electronics', 'telecommunications', 'military', 'industrial', 'manufacturing'];
        const hasNonTraditional = nonTraditionalKeywords.some(keyword => 
            resumeText.toLowerCase().includes(keyword)
        );

        if (hasNonTraditional) {
            analysis.strengths.push('Non-traditional background can be a strategic advantage');
            analysis.score += 15;
        }

        // Check for personal projects and hobbies
        const projectKeywords = ['home lab', 'ctf', 'capture the flag', 'personal project', 'hobby', 'self-study'];
        const hasProjects = projectKeywords.some(keyword => 
            resumeText.toLowerCase().includes(keyword)
        );

        if (hasProjects) {
            analysis.strengths.push('Personal projects demonstrate genuine interest and persistence');
            analysis.score += 10;
        } else {
            analysis.opportunities.push('Consider adding personal projects to demonstrate foundational knowledge');
            analysis.score -= 10;
        }

        // Check for foundational knowledge indicators
        const foundationalKeywords = ['systems', 'networking', 'operating systems', 'scripting', 'analytical'];
        const foundationalCount = foundationalKeywords.filter(keyword => 
            resumeText.toLowerCase().includes(keyword)
        ).length;

        if (foundationalCount >= 3) {
            analysis.strengths.push('Strong foundational knowledge indicators');
            analysis.score += 10;
        }

        analysis.feedback = analysis.strengths.length > 0 
            ? `Strategic advantages: ${analysis.strengths.join(', ')}`
            : 'Consider highlighting unique background and personal projects';

        return analysis;
    }

    assessInterviewReadiness(resumeText) {
        const analysis = {
            score: 80,
            feedback: '',
            redFlags: [],
            strengths: []
        };

        // Check for claims that might be hard to defend
        const riskyClaims = ['expert', 'master', 'guru', 'ninja', 'rockstar'];
        const hasRiskyClaims = riskyClaims.some(claim => 
            resumeText.toLowerCase().includes(claim)
        );

        if (hasRiskyClaims) {
            analysis.redFlags.push('Avoid superlative claims that are hard to defend in interviews');
            analysis.score -= 15;
        }

        // Check for specific, measurable achievements
        const hasQuantifiedAchievements = /\d+%|\$\d+|\d+\+|\d+ years|\d+ projects/.test(resumeText);
        if (hasQuantifiedAchievements) {
            analysis.strengths.push('Quantified achievements provide concrete talking points');
            analysis.score += 10;
        }

        // Check for technical depth indicators
        const technicalDepth = ['analysis', 'investigation', 'troubleshooting', 'implementation', 'optimization'];
        const depthCount = technicalDepth.filter(term => 
            resumeText.toLowerCase().includes(term)
        ).length;

        if (depthCount >= 3) {
            analysis.strengths.push('Good technical depth for interview discussions');
            analysis.score += 5;
        }

        analysis.feedback = analysis.redFlags.length > 0 
            ? `Interview concerns: ${analysis.redFlags.join(', ')}`
            : 'Resume appears interview-ready with defensible claims';

        return analysis;
    }

    analyzeGatekeepingText(resumeText) {
        const analysis = {
            score: 100,
            feedback: '',
            gatekeepingIssues: [],
            recommendations: [],
            toneIssues: []
        };

        const lines = resumeText.split('\n');
        const text = resumeText.toLowerCase();

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
            if (text.includes(word.toLowerCase())) {
                analysis.toneIssues.push({
                    word: word,
                    reason: reason,
                    severity: 'medium'
                });
                analysis.score -= 5;
            }
        });

        // Define tone and perception patterns that may sound arrogant or dismissive to reviewers
        const tonePatterns = [
            // Arrogant/Overconfident Language
            {
                pattern: /\b(expert|master|guru|ninja|rockstar|elite|superior|exceptional|outstanding|brilliant|genius)\b/gi,
                category: 'Arrogant Tone',
                issue: 'May sound boastful or overconfident to hiring managers',
                suggestion: 'Use more modest language like "experienced", "skilled", or "proficient"'
            },
            // Dismissive/Contemptuous Language
            {
                pattern: /\b(obviously|clearly|simply|just|merely|only|basic|elementary|trivial|easy|simple)\b/gi,
                category: 'Dismissive Tone',
                issue: 'May sound condescending or dismissive of others\' work',
                suggestion: 'Remove minimizing words and be more respectful of complexity'
            },
            // Demanding/Entitled Language
            {
                pattern: /\b(require|demand|insist|expect|must have|need to|should|ought to|deserve|entitled)\b/gi,
                category: 'Demanding Tone',
                issue: 'May sound entitled or demanding rather than collaborative',
                suggestion: 'Use collaborative language like "prefer", "would like", or "looking for"'
            },
            // Superiority Complex
            {
                pattern: /\b(better than|superior to|above|beyond|transcend|surpass|outperform|outclass)\b/gi,
                category: 'Superiority Tone',
                issue: 'May sound arrogant or dismissive of colleagues',
                suggestion: 'Focus on your achievements without comparing to others'
            },
            // Know-it-all Language
            {
                pattern: /\b(always|never|all|every|none|nothing|everything|completely|totally|absolutely)\b/gi,
                category: 'Absolute Language',
                issue: 'Absolute statements may sound arrogant or unrealistic',
                suggestion: 'Use more nuanced language like "typically", "usually", or "often"'
            },
            // Technical Elitism
            {
                pattern: /\b(real programmers|true professionals|serious developers|real work|actual coding|proper way)\b/gi,
                category: 'Technical Elitism',
                issue: 'May sound dismissive of different approaches or skill levels',
                suggestion: 'Be inclusive of different methodologies and experience levels'
            },
            // Gatekeeping Language
            {
                pattern: /\b(if you can't|if you don't|unless you|only if|you must|you need to|you should know)\b/gi,
                category: 'Gatekeeping Tone',
                issue: 'May sound like you\'re lecturing or gatekeeping the field',
                suggestion: 'Share knowledge without sounding preachy or exclusive'
            },
            // Overly Critical Language
            {
                pattern: /\b(wrong|incorrect|bad|terrible|awful|horrible|stupid|dumb|useless|pointless)\b/gi,
                category: 'Critical Tone',
                issue: 'Negative language may sound unprofessional or harsh',
                suggestion: 'Use constructive language and focus on improvements'
            },
            // Impatient/Intolerant Language
            {
                pattern: /\b(obviously|clearly|of course|naturally|surely|certainly|definitely|without question)\b/gi,
                category: 'Impatient Tone',
                issue: 'May sound impatient with others who don\'t understand',
                suggestion: 'Be more patient and explanatory in your language'
            },
            // Self-Aggrandizing Language
            {
                pattern: /\b(revolutionary|groundbreaking|innovative|cutting-edge|state-of-the-art|world-class|industry-leading)\b/gi,
                category: 'Self-Aggrandizing',
                issue: 'May sound like you\'re overselling your contributions',
                suggestion: 'Let achievements speak for themselves with specific examples'
            },
            // Dismissive of Others' Work
            {
                pattern: /\b(amateur|beginner|junior|inexperienced|unskilled|incompetent|mediocre|average)\b/gi,
                category: 'Dismissive of Others',
                issue: 'May sound dismissive or disrespectful of colleagues',
                suggestion: 'Focus on your strengths without putting others down'
            },
            // Overly Technical Jargon
            {
                pattern: /\b(paradigm|leverage|synergy|optimize|streamline|facilitate|implement|utilize|deploy)\b/gi,
                category: 'Corporate Jargon',
                issue: 'Excessive jargon may sound pretentious or insincere',
                suggestion: 'Use clear, direct language that everyone can understand'
            }
        ];

        // Check for tone patterns that may sound arrogant or dismissive
        tonePatterns.forEach(pattern => {
            const matches = text.match(pattern.pattern);
            if (matches) {
                lines.forEach((line, index) => {
                    if (pattern.pattern.test(line.toLowerCase())) {
                        analysis.gatekeepingIssues.push({
                            line: index + 1,
                            text: line.trim(),
                            category: pattern.category,
                            issue: pattern.issue,
                            suggestion: pattern.suggestion
                        });
                    }
                });
                analysis.score -= 8; // Slightly less penalty since this is about tone, not exclusion
            }
        });

        // Check for positive, collaborative language indicators
        const positiveIndicators = [
            'collaborative', 'team player', 'supportive', 'helpful', 'mentoring',
            'learning', 'growing', 'developing', 'improving', 'contributing',
            'working with', 'partnering', 'supporting', 'assisting', 'guiding'
        ];

        const hasPositiveLanguage = positiveIndicators.some(indicator => 
            text.includes(indicator)
        );

        if (hasPositiveLanguage) {
            analysis.score += 5;
            analysis.recommendations.push('Good use of collaborative and positive language detected');
        }

        // Check for humble, professional language
        const humbleIndicators = [
            'experienced', 'skilled', 'proficient', 'knowledgeable', 'capable',
            'familiar with', 'comfortable with', 'strong background in', 'solid understanding'
        ];

        const hasHumbleLanguage = humbleIndicators.some(indicator => 
            text.includes(indicator)
        );

        if (hasHumbleLanguage) {
            analysis.score += 3;
            analysis.recommendations.push('Good use of modest, professional language');
        }

        // Generate feedback
        if (analysis.gatekeepingIssues.length === 0) {
            analysis.feedback = 'No tone issues detected. Resume language appears professional and collaborative.';
        } else {
            analysis.feedback = `Found ${analysis.gatekeepingIssues.length} potential tone issues that may sound arrogant or dismissive to hiring managers.`;
            analysis.recommendations.push('Consider revising language to sound more collaborative and professional');
        }

        return analysis;
    }

    generateInterviewQuestions(resumeText) {
        const questions = [];
        const lines = resumeText.split('\n');

        // Extract key claims and skills
        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.length > 10 && !trimmedLine.match(/^[A-Z\s]+$/)) {
                // Generate questions based on content
                if (trimmedLine.includes('managed') || trimmedLine.includes('led')) {
                    questions.push(`Can you walk me through a specific example of when you ${trimmedLine.toLowerCase()}?`);
                }
                if (trimmedLine.includes('implemented') || trimmedLine.includes('developed')) {
                    questions.push(`What challenges did you face when you ${trimmedLine.toLowerCase()}?`);
                }
                if (trimmedLine.includes('analyzed') || trimmedLine.includes('investigated')) {
                    questions.push(`What methodology did you use to ${trimmedLine.toLowerCase()}?`);
                }
            }
        });

        // Add standard Carhart-based questions
        questions.push(
            "What legal infosec-related hobbies or activities do you engage in outside of work?",
            "Can you describe a time when you had to learn something completely new for a project?",
            "What's the most complex system you've worked with, and how did you approach understanding it?",
            "How do you stay current with cybersecurity trends and threats?"
        );

        return questions.slice(0, 8); // Limit to top 8 questions
    }

    // Enhanced content quality analysis with Carhart principles
    analyzeContentQuality(text) {
        const issues = [];
        const recommendations = [];
        let score = 100;
        const lines = text.split('\n');

        // Carhart's pet peeves with line-specific feedback
        const carhartPetPeeves = [
            { pattern: /expert|master|guru|ninja|rockstar/gi, penalty: 10, issue: 'Avoid superlative claims that are hard to defend', suggestion: 'Replace with specific, measurable achievements' },
            { pattern: /responsible for|duties included|helped with/gi, penalty: 5, issue: 'Weak language - use strong action verbs', suggestion: 'Use verbs like "managed", "developed", "implemented", "analyzed"' },
            { pattern: /synergy|leverage|paradigm|disruptive/gi, penalty: 3, issue: 'Consider reducing buzzwords', suggestion: 'Use clear, specific language instead' }
        ];

        carhartPetPeeves.forEach(peeve => {
            const matches = text.match(peeve.pattern);
            if (matches) {
                // Find specific lines with issues
                lines.forEach((line, index) => {
                    if (peeve.pattern.test(line)) {
                        issues.push(`Line ${index + 1}: "${line.trim()}" - ${peeve.issue}`);
                        recommendations.push(`Line ${index + 1}: ${peeve.suggestion}`);
                    }
                });
                score -= peeve.penalty * matches.length;
            }
        });

        // Check for foundational knowledge indicators
        const foundationalTerms = ['systems', 'networking', 'scripting', 'analysis', 'troubleshooting'];
        const foundationalCount = foundationalTerms.filter(term => 
            text.toLowerCase().includes(term)
        ).length;

        if (foundationalCount < 2) {
            issues.push('Missing foundational technical knowledge indicators');
            recommendations.push('Add specific technical skills like "systems administration", "network analysis", "scripting languages"');
            score -= 10;
        }

        // Check for personal projects/hobbies
        const projectIndicators = ['home lab', 'ctf', 'personal project', 'hobby', 'self-study'];
        const hasProjects = projectIndicators.some(indicator => 
            text.toLowerCase().includes(indicator)
        );

        if (!hasProjects) {
            issues.push('No personal projects or infosec hobbies mentioned');
            recommendations.push('Add a section for personal projects, home lab work, CTF participation, or security-related hobbies');
            score -= 15;
        }

        // Check for quantified achievements
        const hasQuantifiedAchievements = /\d+%|\$\d+|\d+\+|\d+ years|\d+ projects/.test(text);
        if (!hasQuantifiedAchievements) {
            issues.push('No quantified achievements found');
            recommendations.push('Add specific numbers: "increased efficiency by 25%", "managed team of 5", "reduced costs by $50K"');
            score -= 10;
        }

        return {
            score: Math.max(0, score),
            feedback: issues.length > 0 ? issues.join('. ') : 'Content quality aligns with industry best practices',
            issues,
            recommendations
        };
    }

    // Enhanced structure analysis
    analyzeStructure(text) {
        const sections = this.identifySections(text);
        let score = 100;
        const issues = [];
        const recommendations = [];
        const lines = text.split('\n');

        // Check for top two-thirds rule
        const topTwoThirds = lines.slice(0, Math.floor(lines.length * 0.67));
        const topContent = topTwoThirds.join(' ').toLowerCase();

        const keyElements = ['experience', 'skills', 'summary', 'objective'];
        const hasKeyElementsInTop = keyElements.some(element => 
            topContent.includes(element)
        );

        if (!hasKeyElementsInTop) {
            issues.push('Key information not in top two-thirds of first page');
            recommendations.push('Move your most important experience, skills, or summary to the top of the resume');
            score -= 15;
        }

        // Check for professional formatting
        const unprofessionalFonts = ['comic', 'papyrus', 'curlz', 'chalkduster'];
        const hasUnprofessionalFont = unprofessionalFonts.some(font => 
            text.toLowerCase().includes(font)
        );

        if (hasUnprofessionalFont) {
            issues.push('Unprofessional font detected');
            recommendations.push('Use professional fonts like Arial, Calibri, or Times New Roman');
            score -= 20;
        }

        // Check for spelling errors (basic check)
        const commonMisspellings = ['recieve', 'seperate', 'occured', 'definately'];
        commonMisspellings.forEach(misspelling => {
            if (text.toLowerCase().includes(misspelling)) {
                lines.forEach((line, index) => {
                    if (line.toLowerCase().includes(misspelling)) {
                        issues.push(`Line ${index + 1}: Possible spelling error - "${misspelling}"`);
                        recommendations.push(`Line ${index + 1}: Check spelling of "${misspelling}"`);
                    }
                });
                score -= 10;
            }
        });

        // Check for proper section organization
        if (sections.length < 2) {
            issues.push('Resume lacks clear section organization');
            recommendations.push('Add clear section headers like "Experience", "Education", "Skills"');
            score -= 10;
        }

        // Check for contact information at top
        const firstLines = lines.slice(0, 5).join(' ').toLowerCase();
        const hasContactInfo = firstLines.includes('@') || firstLines.includes('phone') || firstLines.includes('email');
        
        if (!hasContactInfo) {
            issues.push('Contact information not clearly visible at top');
            recommendations.push('Ensure name, phone, and email are prominently displayed at the top');
            score -= 5;
        }

        return {
            score: Math.max(0, score),
            feedback: issues.length > 0 ? issues.join('. ') : 'Resume structure follows professional standards',
            issues,
            recommendations
        };
    }

    // Rest of the existing methods remain the same...
    analyzeKeywordMatch(resumeText, jobDescription) {
        if (!jobDescription) {
            return {
                score: 75,
                feedback: 'No job description provided for keyword matching',
                foundKeywords: [],
                missingKeywords: []
            };
        }

        const resumeWords = this.extractWords(resumeText.toLowerCase());
        const jobWords = this.extractWords(jobDescription.toLowerCase());
        
        const importantKeywords = jobWords.filter(word => 
            word.length > 3 && 
            !this.isCommonWord(word) &&
            this.isRelevantKeyword(word)
        );

        const foundKeywords = importantKeywords.filter(keyword => 
            resumeWords.some(word => word.includes(keyword) || keyword.includes(word))
        );

        const missingKeywords = importantKeywords.filter(keyword => 
            !foundKeywords.includes(keyword)
        );

        const matchPercentage = (foundKeywords.length / importantKeywords.length) * 100;
        const score = Math.round(matchPercentage);

        return {
            score: Math.max(0, score),
            feedback: `Found ${foundKeywords.length} of ${importantKeywords.length} important keywords`,
            foundKeywords,
            missingKeywords: missingKeywords.slice(0, 10)
        };
    }

    analyzeActionVerbs(text) {
        const strongActionVerbs = [
            'achieved', 'accomplished', 'analyzed', 'built', 'created', 'delivered',
            'developed', 'executed', 'generated', 'implemented', 'improved', 'increased',
            'launched', 'managed', 'optimized', 'produced', 'reduced', 'streamlined',
            'transformed', 'utilized', 'designed', 'established', 'expanded', 'facilitated',
            'investigated', 'troubleshot', 'configured', 'deployed', 'monitored'
        ];

        const textWords = this.extractWords(text.toLowerCase());
        const foundVerbs = strongActionVerbs.filter(verb => 
            textWords.some(word => word.includes(verb))
        );

        const verbScore = Math.min(100, (foundVerbs.length / 5) * 100);

        return {
            score: Math.round(verbScore),
            feedback: foundVerbs.length > 0 
                ? `Found ${foundVerbs.length} strong action verbs` 
                : 'Consider using more strong action verbs',
            foundVerbs
        };
    }

    generateSuggestions(resumeText, jobDescription) {
        const suggestions = [];

        // Carhart-based suggestions
        if (!resumeText.match(/\d+/g)) {
            suggestions.push('Add quantified achievements (numbers, percentages, dollar amounts)');
        }

        if (!resumeText.toLowerCase().includes('project') && !resumeText.toLowerCase().includes('hobby')) {
            suggestions.push('Include personal projects or infosec-related hobbies to demonstrate genuine interest');
        }

        if (resumeText.toLowerCase().includes('expert') || resumeText.toLowerCase().includes('master')) {
            suggestions.push('Replace superlative claims with specific, measurable achievements');
        }

        // Traditional suggestions
        if (resumeText.length < 500) {
            suggestions.push('Consider expanding your resume with more detailed descriptions');
        }

        if (resumeText.length > 2000) {
            suggestions.push('Consider condensing your resume to 1-2 pages');
        }

        if (jobDescription) {
            const jobWords = this.extractWords(jobDescription.toLowerCase());
            const resumeWords = this.extractWords(resumeText.toLowerCase());
            
            const missingSkills = jobWords.filter(word => 
                word.length > 4 && 
                !this.isCommonWord(word) &&
                !resumeWords.some(rWord => rWord.includes(word))
            ).slice(0, 3);

            if (missingSkills.length > 0) {
                suggestions.push(`Consider mentioning: ${missingSkills.join(', ')}`);
            }
        }

        if (!resumeText.includes('•') && !resumeText.includes('-')) {
            suggestions.push('Use bullet points to make your experience more readable');
        }

        return suggestions;
    }

    extractKeywords(resumeText, jobDescription) {
        const resumeWords = this.extractWords(resumeText.toLowerCase());
        const jobWords = jobDescription ? this.extractWords(jobDescription.toLowerCase()) : [];
        
        const foundKeywords = jobWords.filter(word => 
            word.length > 3 && 
            resumeWords.some(rWord => rWord.includes(word))
        );

        const missingKeywords = jobWords.filter(word => 
            word.length > 3 && 
            !foundKeywords.includes(word)
        );

        return {
            found: [...new Set(foundKeywords)].slice(0, 15),
            missing: [...new Set(missingKeywords)].slice(0, 15)
        };
    }

    // Helper methods
    extractWords(text) {
        return text.match(/\b\w+\b/g) || [];
    }

    isCommonWord(word) {
        const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'within', 'without', 'upon', 'across', 'behind', 'beyond', 'under', 'over', 'around', 'near', 'far', 'here', 'there', 'where', 'when', 'why', 'how', 'what', 'who', 'which', 'that', 'this', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall'];
        return commonWords.includes(word.toLowerCase());
    }

    isRelevantKeyword(word) {
        return word.length > 3 && !this.isCommonWord(word);
    }

    identifySections(text) {
        const sections = [];
        const lines = text.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.length === 0) continue;
            
            const lowerLine = line.toLowerCase();
            if (lowerLine.includes('experience') || lowerLine.includes('work history')) {
                sections.push({ type: 'experience', line: i });
            } else if (lowerLine.includes('education') || lowerLine.includes('academic')) {
                sections.push({ type: 'education', line: i });
            } else if (lowerLine.includes('skills') || lowerLine.includes('technical')) {
                sections.push({ type: 'skills', line: i });
            } else if (lowerLine.includes('summary') || lowerLine.includes('objective')) {
                sections.push({ type: 'summary', line: i });
            }
        }
        
        return sections;
    }
}

// Carhart Resume Framework Implementation
class CarhartResumeFramework {
    constructor() {
        this.petPeeves = [
            { pattern: /expert|master|guru|ninja|rockstar/gi, severity: 'high', message: 'Avoid superlative claims' },
            { pattern: /responsible for|duties included/gi, severity: 'medium', message: 'Use strong action verbs' },
            { pattern: /synergy|leverage|paradigm/gi, severity: 'low', message: 'Reduce buzzwords' }
        ];

        this.roleSpecificSkills = {
            'blue_team': ['windows', 'linux', 'network analysis', 'ids', 'yara', 'sysinternals'],
            'penetration_testing': ['programming', 'scripting', 'assembly', 'systems administration'],
            'ot_ics': ['electronics', 'industrial', 'process', 'scada', 'plc'],
            'general': ['curiosity', 'analytical', 'scripting', 'python', 'ruby']
        };
    }

    analyze(resumeText, jobDescription) {
        const analysis = {
            score: 100,
            feedback: '',
            issues: [],
            strengths: []
        };

        // Check pet peeves
        this.petPeeves.forEach(peeve => {
            const matches = resumeText.match(peeve.pattern);
            if (matches) {
                analysis.issues.push(`${peeve.message} (${matches.length} instances)`);
                analysis.score -= peeve.severity === 'high' ? 15 : peeve.severity === 'medium' ? 10 : 5;
            }
        });

        // Check for foundational knowledge
        const foundationalTerms = ['systems', 'networking', 'scripting', 'analysis'];
        const foundationalCount = foundationalTerms.filter(term => 
            resumeText.toLowerCase().includes(term)
        ).length;

        if (foundationalCount >= 3) {
            analysis.strengths.push('Strong foundational knowledge indicators');
            analysis.score += 10;
        }

        // Check for personal projects
        const projectIndicators = ['home lab', 'ctf', 'personal project', 'hobby'];
        const hasProjects = projectIndicators.some(indicator => 
            resumeText.toLowerCase().includes(indicator)
        );

        if (hasProjects) {
            analysis.strengths.push('Personal projects demonstrate genuine interest');
            analysis.score += 15;
        }

        analysis.feedback = analysis.strengths.length > 0 
            ? `Strengths: ${analysis.strengths.join(', ')}`
            : 'Consider adding personal projects and foundational knowledge indicators';

        return analysis;
    }
}

// Simple models for demonstration
class SimpleNLPModel {
    // Placeholder for more sophisticated NLP analysis
}

class KeywordMatcher {
    // Placeholder for keyword matching logic
}

class ContentAnalyzer {
    // Placeholder for content analysis logic
}
