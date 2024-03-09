
# SerieSpot

O "SerieSpot"é uma proposta de plataforma web dedicada aos amantes de séries televisivas, oferecendo um espaço onde os utilizadores podem partilhar opiniões, avaliações e descobrir novos títulos baseados em seus interesses e preferências. Este projeto visa integrar dados de séries de diversas fontes, proporcionando um ambiente interativo e enriquecedor para os seus utilizadores.



## Funcionalidades

- Interface amigável e intuitiva.
- Funcionalidades de avaliação, comentários e recomendação de séries.
- Permite que os usuários criem suas próprias listas de séries preferidas, assistidas e a assistir.
## Instalação

### Front-end (Node.js)
Para instalar o Node.js e o npm (Node Package Manager) em seu sistema é necessário seguir alguns passos:
1. Acesse o site oficial do Node.js em https://nodejs.org/.
2. Faça o download da versão mais recente do Node.js para o seu sistema operacional (Windows, macOS, Linux).
3. Após o download, execute o instalador e siga as instruções na tela para concluir a instalação.
4. Depois de instalado, abra o terminal ou prompt de comando e digite node -v para verificar se o Node.js foi instalado corretamente. Isso mostrará a versão do Node.js instalada.
5. Para verificar a instalação do npm, digite npm -v no terminal. Isso mostrará a versão do npm instalada.
6. No terminal da pasta do projeto executar os seguintes comandos:
```bash
  npm install
  npm start
```
Se tudo estiver correto abrirá uma nova aba no seu navegador com o site.
### Back-end (Java Spring com Maven)
1. Instale o **JDK 21** (Java Development Kit) no seu sistema podendo o mesmo ser encontrado no site oficial da Oracle em https://www.oracle.com/. 
2. Instale o Apache Maven (apache-maven-3.9.6-bin.zip): https://maven.apache.org/.
3. Extraia o Arquivo
4. Localize o arquivo baixado em seu sistema.
5. Configure as Variáveis de Ambiente (opcional, mas recomendado):
Para facilitar o uso do Maven a partir da linha de comando, é recomendável configurar as variáveis de ambiente JAVA_HOME e M2_HOME para apontar para o diretório de instalação do JDK e do Maven, respectivamente.
Além disso, adicione o diretório bin do Maven ao PATH do sistema para que o comando mvn possa ser executado a partir de qualquer lugar no terminal.
6. Verifique a Instalação:
Após configurar as variáveis de ambiente, abra um novo terminal no projeto vscode e digite:
```bash
  mvn -v
```
Se indicar a versão a instalação estará correta.
7. Mover-se para o diretório com o ficheiro pom.xml
```bash
  cd SPbackend
```
8. Instalar os modulos e dependencias:
```bash
  mvn install
```
9. Executar o servidor back-end
```bash
  mvn spring-boot:run
```
## Importante 
O site não funciona sem ser liberado o seu IP, caso não o tenha feito envie o seu endereço IP  para um dos desenvolvedores para que senha liberado o acesso ao site da base de dados.

## Equipa de Desenvolvimento

| Nome                 | Email                      | Numero            | Funções                |
|----------------------|----------------------------|-------------------|------------------------|
| Breno Dias           | breno.dias@my.istec.pt     | 2022326           |Frontend                |
| Diogo Batista        | diogo.batista@my.istec.pt  | 2022166           |Frontend                |
| Filipe Jacinto       | filipe.jacinto@my.istec.pt | 2022052           |Backend / Base de Dados |
| Simão Pires          | simao.pires@my.istec.pt    | 2022063           |Frontend                |
|----------------------|----------------------------|-------------------|------------------------|