import { Probot } from "probot";

module.exports = (app: Probot) => {
  app.log.info("Yay, my app is loaded");
  app.on("push", async (context) => {
    let branchName = context.payload.ref;
    branchName = branchName.replace("refs/heads/", "");
    app.log.info(branchName);
    console.log(branchName);
    app.log.info("hello 2");
  });
};
