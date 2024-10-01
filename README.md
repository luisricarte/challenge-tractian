# Apresentação do desafio da tractian
Boa noite, pessoal da Tractian. Gostaria de apresentar pra vocês a minha solução para o desafio:

![image](https://github.com/user-attachments/assets/e4cbdada-f9e5-4012-acd3-66fe0fa4e830)
## Features
### Filtros
- [x] busca em texto
- [x] busca por "status" = alert
- [x] busca por "sensorType" = "vibration"
- [x] busca por "sensorType" = "energy"

Vale ressaltar que é possível combinar os filtros para que a listagem demonste os valores esperados.
### Empresas
- [x] Alterar a empresa a ser renderizada pela página 
É possível trocar de empresa apenas a partir de um clique na parte superior direito da página, disparando uma nova requisição e renderizando a listagem
### Listagem
A listagem demonstra corretamente, segundo as regras do desafio, qual o tipo do item. Podendo ser este um component, asset ou location.

## Melhorias futuras
### Como suposto no desafio, caso eu tivesse mais tempo gostaria de evoluir:
- [ ] Renderizar os valores do component na parte direita da tela, renderizando o componente selecionado <br/>
(eu iniciei esse context, porém acabou que não implementei por falta de tempo)
- [ ] Evoluir a UI da solução <br/>
(acabou que eu dei mais relevância para as features em si do que tentar renderizar uma interface bela, então se eu tivesse mais tempo existem algumas melhorias que gostaria de fazer)
- [ ] Adicionar o tipo do status ao lado do item <br/>
(também algo que não foi implementado por falta de tempo, seria apenas adicionar o ícone correspondente ao status ao lado do item na listagem)

## Vídeo demonstração
https://github.com/user-attachments/assets/a99396be-4028-4f0c-8b68-88d958907ae1

## Como iniciar?
1) ```git clone https://github.com/luisricarte/challenge-tractian.git``` <br/>
2) ```cd challenge-tractian``` <br/>
3) Baixe as dependências do projeto
4) ```yarn start```
https://github.com/tractian/challenges/tree/main/front-end
