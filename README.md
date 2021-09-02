## FakeAtm

Este teste será utilizado para a avaliação técnica dos candidatos para vagas de desenvolvedores fullstack. Se você está vendo isso, parabéns você foi convidado a participar do nosso processo seletivo. Caso você tenha chegado aqui por acaso e queira uma chance ainda é possível participar do nosso processo seletivo enviando um email para rh@frentecorretora.com.br

Este teste é separado em teste para estágio e teste para desenvolvedor fulltime de todos os níveis, ou seja apenas estagiários realizaram um teste diferente, os outros níveis de júnior a sênior seram separados pelo desempenho nos teste.

## O que fazer para participar

Crie um fork deste projeto e desenvolva sua solução em cima do seu fork. Use o README do seu repositório para nos contar a sua linha de pensamento ao resolver o teste, como você abordou os problemas encontrados quais foram suas prioridades no desenvolvimento e qualquer ação necessária para a execução do seu projeto.

Lembre-se que isso é um teste técnico e como tal não existe uma única solução ótima, uma solução sub-ótima bem executada pode valer muito mais do que uma solução ótima mal executada.

## Crítérios de avaliação

- O cumprimento dos requisitos. Um dos pontos mais importantes de uma investida é que ela atinja seus objetivos e portanto soluções que não atendam a todos os requisitos terão nota reduzida.
- Cumprimento do prazo estipulado. Dizer um prazo para seu projeto mostra confiança nas suas habilidades, cumpri-lo mostra competência, divergencias no prazo reduziram a sua nota
- A estrutura de dados. Imagine que essa é só uma feature de um grande sistema que revolucionará o mundo, você sabe o quão importante é uma boa estrutura, e nós sabemos que ela vale uns pontos extra.
- A organização e legibilidade do código. Nós teremos que ler o seu código e quanto mais fácil for nos localizar e ler o seu código mais pontos nós daremos para o seu teste.
- Os teste de funcionalidade. Um código testado é um código feliz e duradouro. Pontos para o candidato.
- O uso das ferramentas. Se uma ferramenta pode cortar o seu tempo de serviço pela metade USE, se uma ferramenta for usada use bem. Pontos extra para o bom uso de versionamento ou qualquer ferramenta usada e documentada.

## Descrição

### Contexto

Uma agência teve uma idéia de ATM que enviará o dinheiro para a casa dos seus cliente, para isso algumas regras precisaram ser criadas para reduzir certos custos e a idéia de pacotes foi elaborada.

Esta agência precisa de uma interface gráfica para que seus clientes possam se cadastrar e operar seus pedidos.

### Regras de negócio

### Pacotes
- Cada pacote tem um limite de notas que pode carregar (50 notas)
- Cada pacote pode conter apenas um tipo de nota (10 - 50 - 100)
- Cada pacote contem informação das operações estão nele
- Quando esse pacote foi aberto
- Quando ele foi fechado
- É criado um pacote aberto toda vez que um pacote alcança seu limite.
- Um pacote é considerado fechado uma vez que ele atinja o seu limite.
- A leitura e listagem dos pacotes deve ser protegida por autenticação.

### Operação
- Toda operação possui um cliente
- Toda operação possui um valor
- Toda operação tem valor limite de 5000
- Uma operação pode possuir preferencia de notas (10 -50 - 100)
- Caso uma operação seja grande demais para entrar em qualquer pacote ela deve ser subdivida em operações menores que referencie a maior.
- Uma operação está aberta quando é criada.
- Uma operação está reservada quando é alocada a um pacote.
- Uma operação está concluída quando o pacote é fechado.
- Deve ser possível criar, ler e listar operações.

### Cliente
- Todo cliente possui nome, endereço, data de nascimento e cpf
- Deve ser possível criar, ler, atualizar e deletar um cliente.

## Resumo de páginas

- Uma page de login.
- Uma page de cadastro de cliente.
- Uma page de atualização e remoção de cliente.
- Uma page de inserção de operação.
- Uma page de listagem de operações deste cliente.
- Uma page de listagem de pacotes.