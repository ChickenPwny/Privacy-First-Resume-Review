class ResumeReviewApp {
    constructor() {
        this.analyzer = new ResumeAnalyzer();
        this.aiGenerator = new AIContentGenerator();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const jobDescription = document.getElementById('jobDescription');

        // File upload handling
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => {
                console.log('Upload area clicked');
                fileInput.click();
            });
            
            uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
            uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
            uploadArea.addEventListener('drop', this.handleDrop.bind(this));
            fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        }

        // Job description changes
        if (jobDescription) {
            jobDescription.addEventListener('input', this.debounce(() => {
                if (this.currentResumeText) {
                    this.analyzeResume();
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
            this.analyzeResume();
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        console.log('File selected:', e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    async processFile(file) {
        console.log('Processing file:', file.name, file.type);
        
        if (!file.type.includes('pdf') && !file.type.includes('wordprocessingml') && !file.type.includes('text')) {
            alert('Please upload a PDF, DOCX, or TXT file');
            return;
        }

        try {
            this.showLoading();
            const text = await this.extractTextFromFile(file);
            this.currentResumeText = text;
            this.showJobDescriptionSection();
            this.showAnalyzeButton();
            console.log('Resume text extracted:', text.substring(0, 200) + '...');
        } catch (error) {
            console.error('Error processing file:', error);
            alert('Error processing file. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async extractTextFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    let text = '';

                    if (file.type.includes('pdf')) {
                        text = await this.extractTextFromPDF(e.target.result);
                    } else if (file.type.includes('wordprocessingml')) {
                        text = await this.extractTextFromDOCX(e.target.result);
                    } else if (file.type.includes('text') || file.name.endsWith('.txt')) {
                        text = e.target.result;
                    }

                    resolve(text);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            
            // Use readAsText for text files, readAsArrayBuffer for others
            if (file.type.includes('text') || file.name.endsWith('.txt')) {
                reader.readAsText(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        });
    }

    async extractTextFromPDF(arrayBuffer) {
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            text += pageText + '\n';
        }

        return text;
    }

    async extractTextFromDOCX(arrayBuffer) {
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    }

    async analyzeResume() {
        try {
            this.showLoading();
            
            const jobDescription = document.getElementById('jobDescription').value;
            const analysis = await this.analyzer.analyzeResume(this.currentResumeText, jobDescription);
            
            this.lastAnalysis = analysis;
            this.displayResults(analysis);
        } catch (error) {
            console.error('Error analyzing resume:', error);
            alert('Error analyzing resume. Please try again.');
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

        // Update keywords
        this.displayKeywords('foundKeywords', analysis.keywords.found, 'found');
        this.displayKeywords('missingKeywords', analysis.keywords.missing, 'missing');

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

        // Update resume preview
        this.displayResumePreview();

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
            noIssues.innerHTML = '<span style="color: #2e7d32;">✅ No tone issues detected! Your resume language appears professional and collaborative to hiring managers.</span>';
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

    displayResumePreview() {
        const resumePreview = document.getElementById('resumePreviewText');
        if (resumePreview && this.currentResumeText) {
            resumePreview.textContent = this.currentResumeText;
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

    async generateContent(type) {
        if (!this.currentResumeText) {
            alert('Please upload a resume first');
            return;
        }

        try {
            this.showGenerationLoading();
            
            const jobDescription = document.getElementById('jobDescription').value;
            const analysis = this.lastAnalysis || null;
            
            const result = await this.aiGenerator.generateContent(type, this.currentResumeText, jobDescription, analysis);
            
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

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.resumeApp = new ResumeReviewApp();
});