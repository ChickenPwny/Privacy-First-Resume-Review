class ResumeReviewApp {
    constructor() {
        this.analyzer = new ResumeAnalyzer();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const jobDescription = document.getElementById('jobDescription');

        // File upload handling
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        fileInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Job description changes
        jobDescription.addEventListener('input', this.debounce(() => {
            if (this.currentResumeText) {
                this.analyzeResume();
            }
        }, 500));
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
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    async processFile(file) {
        if (!file.type.includes('pdf') && !file.type.includes('wordprocessingml')) {
            alert('Please upload a PDF or DOCX file');
            return;
        }

        try {
            this.showLoading();
            const text = await this.extractTextFromFile(file);
            this.currentResumeText = text;
            this.showJobDescriptionSection();
            await this.analyzeResume();
        } catch (error) {
            console.error('Error processing file:', error);
            alert('Error processing file. Please try again.');
            this.hideLoading();
        }
    }

    async extractTextFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    let text = '';

                    if (file.type.includes('pdf')) {
                        text = await this.extractTextFromPDF(arrayBuffer);
                    } else if (file.type.includes('wordprocessingml')) {
                        text = await this.extractTextFromDOCX(arrayBuffer);
                    }

                    resolve(text);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
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
            
            this.displayResults(analysis);
        } catch (error) {
            console.error('Error analyzing resume:', error);
            alert('Error analyzing resume. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    displayResults(analysis) {
        // Update overall score
        document.getElementById('overallScore').textContent = analysis.overallScore;

        // Update individual scores
        this.updateScoreBar('contentScore', analysis.contentQuality.score);
        this.updateScoreBar('keywordScore', analysis.keywordMatch.score);
        this.updateScoreBar('structureScore', analysis.structure.score);
        this.updateScoreBar('actionScore', analysis.actionVerbs.score);

        // Update feedback
        document.getElementById('contentFeedback').textContent = analysis.contentQuality.feedback;
        document.getElementById('keywordFeedback').textContent = analysis.keywordMatch.feedback;
        document.getElementById('structureFeedback').textContent = analysis.structure.feedback;
        document.getElementById('actionFeedback').textContent = analysis.actionVerbs.feedback;

        // Update suggestions
        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = '';
        analysis.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });

        // Update keywords
        this.displayKeywords('foundKeywords', analysis.keywords.found, 'found');
        this.displayKeywords('missingKeywords', analysis.keywords.missing, 'missing');

        // Show results
        document.getElementById('resultsContainer').style.display = 'block';
    }

    updateScoreBar(elementId, score) {
        const scoreBar = document.getElementById(elementId);
        scoreBar.style.width = `${score}%`;
    }

    displayKeywords(containerId, keywords, type) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        keywords.forEach(keyword => {
            const tag = document.createElement('span');
            tag.className = `keyword-tag ${type}`;
            tag.textContent = keyword;
            container.appendChild(tag);
        });
    }

    showLoading() {
        document.getElementById('loadingIndicator').style.display = 'block';
        document.getElementById('resultsContainer').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loadingIndicator').style.display = 'none';
    }

    showJobDescriptionSection() {
        document.getElementById('jobDescriptionSection').style.display = 'block';
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
    new ResumeReviewApp();
});