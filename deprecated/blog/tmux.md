# tmux cheat sheet

| Command                           | Description                                            |
|-----------------------------------|--------------------------------------------------------|
| `tmux new`                        | Start a new session                                    |
| `tmux new-session -A -s mysession`| Start a new session or attach to an existing session named mysession |
| `tmux new -s mysession`           | Start a new session with the name mysession            |
| `tmux kill-ses -t mysession`      | Kill/delete session mysession                         |
| `tmux kill-session -t mysession`  | Kill/delete session mysession                         |
| `tmux kill-session -a`            | Kill/delete all sessions but the current              |
| `tmux kill-session -a -t mysession`| Kill/delete all sessions but mysession               |
| `attach -d`                       | Detach others on the session (Maximize window by detach other clients) |
| `tmux ls`                         | Show all sessions                                     |
| `tmux a`                          | Attach to last session                                |
| `tmux a -t mysession`             | Attach to a session with the name mysession           |

---
---

| Command                           | Description                                            |
|-----------------------------------|--------------------------------------------------------|
| `ctrl + b $`                        | Rename session |
| `ctrl + b d` | Detach from session | 
| `ctrl + b s` | Show all sessions | 
| `ctrl + b w` | Session and Window Preview | 
| `ctrl + b (` | Move to previous session | 
| `ctrl + b )` | Move to next session | 