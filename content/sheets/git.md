---
title: Git Cheat Sheet
topic: Git
description: A cheat sheet to using Git
publishedAt: 2023-05-27 10:00:00
isToc: true
---

- [Piotr Jura Cheat Sheet](https://www.fadocodecamp.com/posts/git-commands-cheat-sheet-for-beginners)

----

# Git Commands Cheat Sheet
Git is a distributed version control system that helps developers track and manage changes to their codebase. It enables multiple contributors to work on a project simultaneously without interfering with each other's progress.

Git tracks the history of changes, allowing developers to revert to previous versions if needed and to understand the evolution of their project over time. It's an essential tool for modern software development, facilitating collaboration, code versioning, and maintaining the integrity of a project's history.

## Key Git Terms
1. Repository (Repo): A storage space where your project lives. It can be local to a folder on your computer, or it can be a storage space on GitHub or another online host.

2. Commit: An individual change to a file (or set of files). It's like taking a snapshot of your project at a specific point in time.

3. Branch: A parallel version of a repository. It diverges from the main project to prevent disrupting the main line of development.

4. Merge: Taking the changes from one branch (in the same repository or from a fork) and applying them into another.

5. Clone: A copy of a repository that resides on your computer instead of on a website's server.

6. Fork: A personal copy of someone else's project. Forking a repository allows you to freely experiment with changes without affecting the original project.

7. Pull Request (PR): A method of submitting contributions to an open source project. It's a request to the project owner to pull your changes into their repository.

8. Push: Sending your committed changes to a remote repository on GitHub or another online host.

9. Pull: Fetching and merging changes from a remote repository to your local repository.

10. Remote: This is the version of a repository or branch that is hosted on a server, most likely on GitHub. It's where you push your changes when you are done working locally.

## Common Commands
### Initializing & Cloning
- `git init`: Initialize a new repository
- `git clone <url>`: Clone an existing repository
### Branching
- `git branch <branch-name>`: Create a new branch
- `git checkout <branch-name>`: Switch to a specific branch
- `git switch <branch-name>`: (Modern alternative to git checkout)
### Staging
- `git add <file>`: Add specific file to staging
- `git add .`: Add all changes to staging
- `git add -p`: Stage hunks interactively
### Committing
- `git commit -m "message"`: Commit with a message
- `git commit -am "message"`: Add all tracked changes to staging and commit
### Remote Operations
- `git remote add origin <url>`: Add a remote repository
- `git pull origin <branch>`: Pull changes from remote
- `git push origin <branch>`: Push changes to remote

### Adding Remote with HTTPS and Token (GitHub)
Typically, to work with Git and GitHub you need to set up SSH keys. However, if you don't want to set up SSH keys, you can use HTTPS and a personal access token instead. Here's how:

- Generate a personal access token on GitHub.
- When adding the remote replace `[TOKEN]` with your GitHub token, `[USERNAME]` with your GitHub username and `[REPOSITORY]` with the repository name
```shell
git remote add origin https://[TOKEN]@github.com/[USERNAME]/[REPOSITORY]
git push origin main
```

### Miscellaneous
- `git status`: Check the status of changes
- `git log`: View commit history
- `git revert <commit-hash>`: Revert to a previous commit
### Sync & Merge
- `git merge <branch>`: Merge another branch into your active branch
- `git fetch`: Fetch latest changes from remote (doesn't merge)
- `git pull --rebase`: Fetch and rebase local commits on top
### Stashing
- `git stash`: Stash changes
- `git stash pop`: Apply stashed changes

### Delete Branch
To delete the branch locally and remote use the following two commands.

```shell
git push -d <remote_name> <branchname>
git branch -d <branchname>
```

Note: In most cases, <remote_name> will be origin.