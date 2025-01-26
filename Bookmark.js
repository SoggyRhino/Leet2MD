javascript: (() => {
    if (!document.URL.toLocaleLowerCase().includes('leetcode')) {
        const f = document.createElement('div');
        Object.assign(f.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            color: 'white',
            borderRadius: '4px',
            zIndex: '10000',
            fontFamily: 'Arial, sans-serif',
            background: '#d10000'
        });
        f.textContent = 'Not on Leetcode You Fucking Idiot';
        document.body.appendChild(f);
        setTimeout(() => document.body.removeChild(f), 10000)
    } else {
        let success = true;
        const tags = Array.from(document.querySelectorAll('a[href^="/tag/"]')).map(a => '[[' + a.textContent.trim() + ']]').join(', ');
        const questions = Array.from(document.querySelectorAll('a[href^="/problems/"]')).filter(a => a.textContent.trim() !== '' && !document.URL.includes(a.href) && a.children.length === 0).map(a => '[[' + a.textContent.trim() + ']]').join(', ');
        let question = '';
        try {
            question = Array.from(document.querySelector('.elfjS').children).map(i => {
                if (i.tagName === 'P') {
                    const element = i.cloneNode(true);
                    Array.from(element.querySelectorAll('span')).forEach(span => span.replaceWith(span.textContent));
                    return i.textContent.includes('Example') || i.textContent.includes('Constraints') ? '### ' + element.textContent + '\n' : element.innerHTML
                }
                if (i.tagName === 'PRE') return '```java\n' + i.innerHTML.replaceAll('<strong>', '').replaceAll('</strong>', '').trim() + '\n```\n';
                if (i.tagName === 'UL') return Array.from(i.children).map(i => '- ' + i.innerHTML).join('\n');
                if (i.tagName === 'IMG') return `![IMG](${i.src})`;
                return ''
            }).filter(Boolean).map(str => str.replaceAll('<code>', '`').replaceAll('</code>', '`').replaceAll('<sup>', '^').replaceAll('</sup>', '').replaceAll('&nbsp;', '\n').replaceAll('&lt;', '<').replaceAll('<strong>', '**').replaceAll('</strong>', '**').replaceAll('<em>', '_').replaceAll('</em>', '_')).join('\n')
        } catch (e) {
            console.log('Failed Question');
            console.log(e);
            success = false
        }
        navigator.clipboard.writeText(`Tags: ${tags}\nSimilar Questions: ${questions}\n## Question\n\n${question}\n\n## Algorithm\n\n## Code\n\n## Links\n[LeetCode](${document.URL})`).then(() => {
            const f = document.createElement('div');
            Object.assign(f.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '10px 20px',
                color: 'white',
                borderRadius: '4px',
                zIndex: '10000',
                fontFamily: 'Arial, sans-serif',
                background: success ? '#4CAF50' : '#d10000'
            });
            f.textContent = success ? 'Copied to clipboard!' : 'Check Console for Error';
            document.body.appendChild(f);
            setTimeout(() => document.body.removeChild(f), 2000)
        }).catch(e => {
            console.error('Failed to copy:', e);
            alert('Failed to copy to clipboard')
        })
    }
})();
