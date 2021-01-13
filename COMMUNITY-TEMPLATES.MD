# Using Graphback With Your Own Templates

Graphback has the ability to include community templates. To add community templates please:

## Step 1: Creating an object for your template

To add your template, you first need to have it in the form of an object which you'll later add to an array. This is best explained by an example:

Let's say you have a template which you want to name `a-sample-template` and the files for it are located in the repository `https://github.com/sample-user/sample-project`. Then the object for your template would look like this:

```
{
    "name": "a-sample-template",
    "description": "Fetching current templates in the sample template",
    "repos": [
      {
        "uri": "https://github.com/sample-user/sample-project",
        "branch": "specify-desired-branch",
        "path": "exact-path-of-the-directory",
        "mountpath": "client"
      },
      {
        "uri": "https://github.com/sample-user/sample-project",
        "branch": "specify-desired-branch",
        "path": "exact-path-of-the-directory"
      }
    ],
  }
```

Note that you can specify as many repositories as you want (with the desired branch and mount path). Files from the specified repositories would be picked up for your template.

## Step 2: Adding your template object

Change your current working directory to: `packages/create-graphback/src/init/`, where you'll find a file named [communityTemplates.ts](./packages/create-graphback/src/init/communityTemplates.ts). This file exports an array called `externalTemplates`. It is in this array that you should add your template object for it to be picked up by the CLI. So the final file would look something like this:

```
export default externalTemplates = [
  {
    "name": "a-sample-template",
    "description": "Fetching current templates in the sample template",
    "repos": [
      {
        "uri": "https://github.com/sample-user/sample-project",
        "branch": "specify-desired-branch",
        "path": "exact-path-of-the-directory",
        "mountpath": "client"
      },
      {
        "uri": "https://github.com/sample-user/sample-project",
        "branch": "specify-desired-branch",
        "path": "exact-path-of-the-directory"
      }
    ],
  }
]
```

With this, you're good to go. Yes, it's that simple! If you still have any doubts or are facing problems feel free to reach out to us!
