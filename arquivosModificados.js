const { Octokit } = require("@octokit/core");

async function getCommitChanges(owner, repo, commitSha) {
  const octokit = new Octokit();

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/commits/{commit_sha}', {
      owner: owner,
      repo: repo,
      commit_sha: commitSha
    });

    const commit = response.data;
    const files = commit.files.map(file => ({
      filename: file.filename,
      url: file.raw_url
    }));

    return files;
  } catch (error) {
    console.error('Error retrieving commit changes:', error);
    throw error;
  }
}

// Exemplo de uso:
const owner = 'OWNER';
const repo = 'REPO';
const commitSha = 'commit-SHA'; // SHA do commit desejado

getCommitChanges(owner, repo, commitSha)
  .then(files => {
    console.log('Arquivos modificados no commit:', files);
    // Analise os nomes dos arquivos e suas URLs
  })
  .catch(error => {
    console.error('Erro:', error);
  });
