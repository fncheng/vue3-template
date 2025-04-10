import katex from 'katex'

// Function to render display math mode formulas
// 渲染块级数学公式
export const renderBlockMath = (content: string) => {
    return content.replace(/\\\[((.|\n)+?)\\\]/g, (match, formula) => {
        // debugger
        // console.log('match: ', match);
        // console.log('formula: ', formula);
        try {
            return katex.renderToString(formula, {
                displayMode: true,
                throwOnError: true
            })
        } catch (e) {
            console.error('KaTeX display math error:', e)
            return match
        }
    })
}

// Function to render inline math mode formulas
// 渲染行内数学公式
export const renderInlineMath = (content: string) => {
    return content.replace(/\\\((.+?)\\\)/g, (match, formula) => {
        // console.log('match2: ', match);
        // console.log('formula2: ', formula);
        try {
            const str = katex.renderToString(formula, {
                displayMode: false,
                throwOnError: true
            })
            return str
        } catch (e) {
            console.error('KaTeX inline math error:', e)
            return match
        }
    })
}
