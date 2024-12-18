import type { DirectiveHook, ObjectDirective } from 'vue'

const bgColorDirective: ObjectDirective<any, string> = {
    beforeMount: (el: HTMLElement, binding) => {
        el.style.backgroundColor = binding.value
    }
}

const colorDirective: DirectiveHook = (el: HTMLElement, binding) => {
    if (binding.value) {
        el.style.color = binding.value
    }
}

export default {
    bgColor: bgColorDirective,
    color: colorDirective
}
