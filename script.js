// Update time in menu bar
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

/* Add fade-in effect when webpage loads for the first time
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});
*/

// Handling window management
let zIndex = 1;

function openWindow(contentType) {
    const window = document.createElement('div');
    window.className = 'window';
    window.style.zIndex = ++zIndex;

    const header = document.createElement('div');
    header.className = 'window-header';
    header.innerHTML = `
        <div class="window-buttons">
            <div class="window-button close" onclick="closeWindow(this)"></div>
            <div class="window-button minimize"></div>
            <div class="window-button maximize"></div>
        </div>
        <div class="window-title">${contentType.charAt(0).toUpperCase() + contentType.slice(1)}</div>
    `;

    const content = document.createElement('div');
    content.className = 'window-content';
    content.innerHTML = getWindowContent(contentType);

    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';

    window.appendChild(header);
    window.appendChild(content);
    window.appendChild(resizeHandle);

    document.body.appendChild(window);

    // Center the window
    const windowWidth = 600; // Default width
    const windowHeight = 400; // Default height
    window.style.width = `${windowWidth}px`;
    window.style.height = `${windowHeight}px`;
    window.style.left = `${(document.body.clientWidth - windowWidth) / 2}px`;
    window.style.top = `${(document.body.clientHeight - windowHeight) / 2}px`;

    makeDraggable(window);
    makeResizable(window);
    addClickToFront(window);
}

function closeWindow(closeButton) {
    closeButton.closest('.window').remove();
}

function getWindowContent(contentType) {
    switch(contentType) {
        case 'resume':
            return `<div class="experience">
                        <div class="job-title">General Motors (GM), Roswell, GA — Information & Digital Technology Intern</div>
                        <div class="date-range">MAY 2024 - AUG 2024</div>
                        <ul class="responsibilities">
                            <li class="responsibility">Engineered robust CI/CD pipelines using GitHub Actions deploying 12+ Java microservices across 130+ web servers in development, testing, and production environments, ensuring service uptime using server API endpoints.</li>
                            <li class="responsibility">Developed configuration-based automation for Apache TomEE server environments using Python and Bash scripts, significantly reducing deployment time by 98.5% and production downtime by 50%.</li>
                            <li class="responsibility">Authored 30+ pages of comprehensive pipeline documentation, ensuring ease-of-use and long-term maintainability for a team of 15+ developers.</li>
                        </ul>
                    </div>

                    <div class="experience">
                        <div class="job-title">General Motors (GM), Roswell, GA — Software Development Intern</div>
                        <div class="date-range">MAY 2023 - AUG 2023</div>
                        <ul class="responsibilities">
                            <li class="responsibility">Developed a full-stack Angular.js and Unity-based game application, integrating augmented reality and social networking features, increasing employee engagement by 30% within the first two months of launch.</li>
                            <li class="responsibility">Implemented key user functionalities, including secure authentication, profile management, leaderboard ranking, and search using Ionic for the frontend, and Node.js, Typescript, and NoSQL databases with REST APIs for the backend.</li>
                            <li class="responsibility">Collaborated in Agile design sprints (Figma), ensured 95% alignment with project software architecture.</li>
                        </ul>
                    </div>

                    <div class="experience">
                        <div class="job-title">Richmond Public Defenders, Richmond, VA — Web Dev. Intern</div>
                        <div class="date-range">JUN 2021 - AUG 2021</div>
                        <img class="image" src="images/public_defenders.png" alt="Redesigned Public Defenders website" onclick="window.open('https://vadefenders.org/richmond/index.html', '_blank')">
                        <ul class="responsibilities">
                            <li class="responsibility">Developed a redesigned, mobile-responsive website using Bootstrap, boosting web traffic by 65% year-over-year.</li>
                            <li class="responsibility">Transformed a 25+ page client handbook into an interactive legal resource hub with visual diagrams and explainer videos, improving information accessibility and reducing average user time spent finding resources by 70%.</li>
                            <li class="responsibility">Streamlined the hiring process by implementing PHP-based web forms, automating 90% of hiring and data collection processes, increasing job application completion rates by 45%, and eliminating redirects to external hiring pages.</li>
                        </ul>
                    </div>

                    <div class="experience">
                        <div class="job-title">Virginia Commonwealth University, Richmond, VA — Research Intern</div>
                        <div class="date-range">JUN 2019 - JUN 2021</div>
                        <ul class="responsibilities">
                            <li class="responsibility">Co-authored 6 research papers in peer-reviewed journals with 110+ citations, applying advanced machine learning techniques in Python to analyze epidemiological data and inform public health strategies.</li>
                            <li class="responsibility">Developed a Python-based linear optimization algorithm that simulated COVID-19 vaccine allocation, identifying strategies to maximize regional coverage, minimize costs, and reduce disease transmission.</li>
                            <li class="responsibility">Implemented a reinforcement learning (RL) model using Python to inform policy decisions during COVID-19 lockdowns, effectively balancing public safety measures with economic recovery efforts.</li>
                            <li class="responsibility">Utilized Python for web scraping from 50+ sources, collecting and preprocessing over 10,000 data points to create a comprehensive datasets and data visualizations, enabling in-depth analysis into the economic impacts of COVID-19.</li>
                        </ul>
                    </div>`;
        case 'projects':
            return `<h2>My Projects</h2>`;
        case 'about':
            return `<h2>About Me</h2>`;
        default:
            return 'Content not found';
    }
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.querySelector('.window-header').onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        bringToFront(element);
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        const newTop = element.offsetTop - pos2;
        const newLeft = element.offsetLeft - pos1;
        element.style.top = `${Math.max(0, Math.min(newTop, window.innerHeight - element.offsetHeight))}px`;
        element.style.left = `${Math.max(0, Math.min(newLeft, window.innerWidth - element.offsetWidth))}px`;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function makeResizable(element) {
    const resizeHandle = element.querySelector('.resize-handle');
    resizeHandle.addEventListener('mousedown', initResize, false);

    function initResize(e) {
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
    }

    function resize(e) {
        e.preventDefault();
        const newWidth = e.clientX - element.offsetLeft;
        const newHeight = e.clientY - element.offsetTop;
        element.style.width = `${Math.max(300, newWidth)}px`;
        element.style.height = `${Math.max(200, newHeight)}px`;
    }

    function stopResize(e) {
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }
}

function addClickToFront(element) {
    element.addEventListener('mousedown', function() {
        bringToFront(element);
    });
}

function bringToFront(element) {
    element.style.zIndex = ++zIndex;
}

// Sticky Note functionality
function closeStickyNote() {
    document.getElementById('sticky-note').style.display = 'none';
}

// Make sticky note draggable
makeDraggable(document.getElementById('sticky-note'));