function formatoDoc(cmd, value=null) {
    if(value) {
        document.execCommand(cmd, false, value)
    } else {
        document.execCommand(cmd)
    }
}

function adicionarLink() {
    const url = prompt('Insira a url')
    formatoDoc('createLink', url)
}

const content = document.getElementById('content')

content.addEventListener('mouseenter', function() {
    const a = content.querySelectorAll('a')
    // console.log(a)
    a.forEach(item => {
        item.addEventListener('mouseenter', function() {
            content.setAttribute('contenteditable', false)
            item.target = '_blank';
        })
        item.addEventListener('mouseleave', function() {
            content.setAttribute('contenteditable', true)
        })
    })
})

const btnCodigo = document.getElementById('codigo')
let ativado = false;

btnCodigo.addEventListener('click', function() {
    btnCodigo.dataset.active = !ativado
    ativado = !ativado
    if(ativado) {
        content.textContent = content.innerHTML
        content.setAttribute('contenteditable', false)
    } else {
        content.innerHTML = content.textContent
        content.setAttribute('contenteditable', true)
    }
})


const filename = document.getElementById('filename')

function tipoArquivo(value) {
    if(value === 'new') {
        content.innerHTML = '';
        filename.value = "arquivo novo"
    } else if(value === 'txt') {
        const blob = new Blob([content.innerText])
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${filename.value}.txt`
        link.click()
    } else if(value === 'pdf') {
        html2pdf(content).save(filename.value)
    }
}