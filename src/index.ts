import { Probot, ProbotOctokit } from "probot";

module.exports = (app: Probot) => {
  const octokit = new ProbotOctokit();
  const owner = "JsantanaRoman";
  const repo = "artifact-tester";

  app.on("push", async (context) => {
    let branchName = context.payload.ref;
    branchName = branchName.replace("refs/heads/", "");
    if (branchName.includes("release")) {
      const artifactList = await octokit.request(
        "GET /repos/{owner}/{repo}/actions/artifacts",
        {
          owner: owner,
          repo: repo,
        }
      );

      const latestArtifactId = artifactList.data.artifacts[0].id;
      const latestArtifact = await octokit.request(
        "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}",
        {
          owner: owner,
          repo: repo,
          artifact_id: latestArtifactId,
        }
      );
      const latestArtifactUrl = latestArtifact.data.url;
      app.log.info(latestArtifactUrl);
    }
  });
};
