// ==UserScript==
// @name         arXiv → alphaXiv
// @namespace    https://github.com/shaneisley/arxiv-to-alphaxiv
// @version      1.0.0
// @description  Adds a link on arXiv abstract pages to open the paper on alphaXiv.
// @author       You
// @match        https://arxiv.org/abs/*
// @match        http://arxiv.org/abs/*
// @icon         https://www.alphaxiv.org/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // Pull the paper id (incl. any version suffix like "v2") from the URL.
    const m = window.location.pathname.match(/^\/abs\/(.+?)\/?$/);
    if (!m) return;
    const paperId = m[1];
    const alphaxivUrl = `https://www.alphaxiv.org/abs/${paperId}`;

    // Preferred location: append to the "Access Paper" list in the sidebar
    // so it matches arXiv's native link styling (View PDF, HTML, TeX Source, ...).
    const accessList = document.querySelector('.full-text ul');

    if (accessList) {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.href = alphaxivUrl;
        a.textContent = 'alphaXiv';
        a.title = 'Open this paper on alphaXiv (interactive view)';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        li.appendChild(a);
        accessList.appendChild(li);
        return;
    }

    // Fallback: floating button if arXiv's layout changes and the list isn't found.
    const btn = document.createElement('a');
    btn.href = alphaxivUrl;
    btn.textContent = 'Open in alphaXiv';
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#b31b1b', // arXiv red
        color: '#fff',
        padding: '10px 16px',
        borderRadius: '4px',
        textDecoration: 'none',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: '10000',
    });
    document.body.appendChild(btn);
})();
