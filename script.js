// Update time in menu bar
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

// Window management
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
    const windowWidth = 400; // Default width
    const windowHeight = 300; // Default height
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
