const { Octokit } = require("@octokit/core");

async function getCommitSSHURLsByAuthorAndDate(owner, repo, author, sinceDate) {
    const octokit = new Octokit();
  
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: owner,
        repo: repo,
        author: author,
        since: sinceDate
      });
  
      const commits = response.data;
      const commitSSHURLs = commits.map(commit => commit.html_url.replace('https://github.com/', ''));
  
      return commitSSHURLs;
    } catch (error) {
      console.error('Error retrieving commits:', error);
      throw error;
    }
  }
  
  // Exemplo de uso:
  const owner = 'OWNER';
  const repo = 'REPO';
  const author = 'AUTHOR'; // Nome do autor desejado
  const sinceDate = '2023-05-17T00:00:00Z'; // Data de início desejada (no formato ISO 8601 - ANO-MES-DIA)
  
  getCommitSSHURLsByAuthorAndDate(owner, repo, author, sinceDate)
    .then(commitSSHURLs => {
      console.log('SSH URLs dos commits do autor desde a data especificada:', commitSSHURLs);
      // Utilize a lista de SSH URLs dos commits conforme necessário
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  