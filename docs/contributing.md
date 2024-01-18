# Contributing

Here are all of the steps you should follow whenever contributing to this repo!

## Making Changes

1. Before you start making changes, always make sure you're on the main branch, then `git pull`. If you have local uncommitted changes, `git stash`, then `git pull` to get latest from origin, then `git stash pop` to apply the stashed changes to new base.
2. Don't forget to `npm i` in the frontend and `pip3 install -r requirements.txt` in the backend to make sure your dependencies are up to date.
3. Create a branch `git checkout -b <name-of-branch>`
4. Make changes to the code
5. Run the project locally to ensure everything is still working properly with `python3 manage.py runserver` in the backend, and `npm run dev` in the frontend.
6. `npm run lint` to ensure code standards. (running `npm run lint:fix` will fix most of the styling errors)

## Commiting Changes

When interacting with Git/GitHub, feel free to use the command line, VSCode extension, or Github desktop. These steps assume you have already made a branch using `git checkout -b <branch-name>` and you have made all neccessary code changes for the provided task.

1. View diffs of each file you changed using the VSCode Github extension (3rd icon on far left bar of VSCode) or GitHub Desktop
2. `git add .` (to stage all files) or `git add <file-name>` (to stage specific file)
3. `git commit -m "<type>[optional scope]: <description>"` or
   `git commit -m "<type>[optional scope]: <description>" -m "[optional body]"`
4. `git push -u origin <name-of-branch>`

## Making Pull Requests

1. Go to the Pull Requests tab on [github.com](https://github.com/)
2. Find your PR, fill out the PR template
3. (If applicable, provide a screenshot of your work in the comment area)
4. Link your PR to the corresponding **Issue**
5. Request a reviewer to check your code
6. Once approved, your code is ready to be merged in 🎉
