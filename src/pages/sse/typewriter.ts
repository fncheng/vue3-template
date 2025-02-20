interface TypewriterOptions {
    chunkSize?: number
    delay?: number
}

class Typewriter {
    private target: HTMLElement
    private chunkSize: number
    private delay: number
    private buffer: string[]
    private isRendering: boolean
    constructor(targetEl: HTMLElement, { chunkSize = 5, delay = 30 }: TypewriterOptions = {}) {
        this.target = targetEl
        this.chunkSize = chunkSize
        this.delay = delay
        this.buffer = []
        this.isRendering = false
    }

    addText(text: string) {
        this.buffer.push(...text.split(''))
        if (!this.isRendering) this.render()
    }

    async render(): Promise<void> {
        this.isRendering = true
        while (this.buffer.length > 0) {
            const chunk = this.buffer.splice(0, this.chunkSize)
            // 使用 DocumentFragment 避免多次 DOM 更新
            const fragment = document.createDocumentFragment()
            const span = document.createElement('span')
            span.innerHTML = chunk.join('')
            fragment.appendChild(span)
            this.target.appendChild(fragment)
            await new Promise((resolve) =>
                requestAnimationFrame(() => setTimeout(resolve, this.delay))
            )
        }
        this.isRendering = false
    }
}

export default Typewriter

// 使用
// const writer = new Typewriter(document.getElementById('output')!, { chunkSize: 10 })
// writer.addText('Hello, World!')
