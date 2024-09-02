const produtos = [
    'leite', 'cafe', 'cerveja', 'pao', 'manteiga', 'arroz', 'feijao'
]

const transacoes = [
    ['cafe', 'pao', 'manteiga'],
    ['leite', 'cerveja', 'pao', 'manteiga'],
    ['cafe', 'pao', 'manteiga'],
    ['leite', 'cafe', 'pao', 'manteiga'],
    ['cerveja'],
    ['manteiga'],
    ['pao'],
    ['feijao'],
    ['arroz', 'feijao'],
    ['arroz']
]

const numTransacoes = transacoes.length

function calcSuportes () {
    const suporteEmPares = {}

    for (let i = 0; i < produtos.length; i++) {
        for (let j = i + 1; j < produtos.length; j++) {
            const produtoA = produtos[i]
            const produtoB = produtos[j]

            let cont = 0
            transacoes.forEach(transacao => {
                if (transacao.includes(produtoA) && transacao.includes(produtoB)) {
                    cont++
                }
            })

            const suporte = cont / numTransacoes
            if (suporte >= 0.2) {
                suporteEmPares[`${produtoA},${produtoB}`] = suporte
            }
        }
    }

    return suporteEmPares
}

function calcConfianca (produtoA, produtoB) {
    let contAB = 0
    let contA = 0

    transacoes.forEach(transacao => {
        if (transacao.includes(produtoA)) {
            contA++
            if (transacao.includes(produtoB)) {
                contAB++
            }
        }
    })

    return contAB / contA
}

const suporteEmPares = calcSuportes()
console.log("suporte >= 0.2")
console.log(suporteEmPares);


const regrasAssociativas = {}

Object.keys(suporteEmPares).forEach(parDeProduto => {
    const [produtoA, produtoB] = parDeProduto.split(',')

    const confiancaAparaB = calcConfianca(produtoA, produtoB)
    const confiancaBparaA = calcConfianca(produtoB, produtoA)

    regrasAssociativas[`${produtoA} -> ${produtoB}`] = confiancaAparaB
    regrasAssociativas[`${produtoB} -> ${produtoA}`] = confiancaBparaA
})

console.log("confiancas:")
console.log(regrasAssociativas);
