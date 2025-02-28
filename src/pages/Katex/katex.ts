import katex from "katex"

export const katexStr = `**欧拉公式**（Euler's Formula）是复分析和复数理论中的一个基础公式，它将复指数函数与三角函数之间建立了联系。其形式为：\n\n\\[\ne^{ix} = \\cos(x) + i \\sin(x)\n\\]\n\n其中：\n- \\( e \\) 是自然对数的底数，约等于 2.71828。\n- \\( i \\) 是虚数单位，满足 \\( i^2 = -1 \\)。\n- \\( x \\) 是实数。\n\n### 欧拉公式的含义\n欧拉公式揭示了复数指数形式和三角函数的关系。特别地：\n- \\( \\cos(x) \\) 是复指数函数的**实部**。\n- \\( \\sin(x) \\) 是复指数函数的**虚部**。\n\n### 欧拉公式的推导\n\n欧拉公式的推导通常是通过级数展开。首先，考虑自然指数函数、余弦函数和正弦函数的泰勒级数展开：\n\n- **自然指数函数** \\( e^x \\) 的泰勒级数：\n  \\[\n  e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\dots\n  \\]\n\n- **余弦函数** \\( \\cos(x) \\) 的泰勒级数...`

// Function to render display math mode formulas
// 渲染块级数学公式
export const renderBlockMath = (content: string) => {
    return content.replace(/\\\[((.|\n)+?)\\\]/g, (match, formula) => {
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