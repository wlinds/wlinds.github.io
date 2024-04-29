# Turn your old laptop into an Ubuntu server
Got an old computer just laying around, doing no good? Well, look no further, this guide will turn your old crapbook into a versatile Linux server.

In this guide we will:
- Install and enable openssh to allow remote login.
- Set up a firewall to improve security.
- Open router ports to enable external access.
- Manage power settings to make sure the server stays on.

Bonus content:
- Create and host a simple website with Python, Flask and Ngrok.
- Use tmux to exit an SSH session without terminating running scripts

>If your computer still runs Windows or macOS, head over [here to download Ubuntu](https://ubuntu.com/download/desktop) first.
>
>This guide assumes you have *some* experience using a command line interface and basic network configuration knowledge.


## What can I do with an Ubuntu server?
Anything! While this guide won't cover all of it, some examples include:

- Deploy applications and machine learning models
- Run game servers for multiplayer gaming
- Set up a cloud storage solution
- Host a website
- Run a database
- Create a VPN
- Experiment with IoT
- Build a media server
- Create a CI/CD pipeline
- Deploy web services or APIs for your applications
- Run a monitoring server for network/system monitoring

And much more - the choice is yours!

Let's get started.

## How to enable SSH Server on Ubuntu

To accept connection for SSH sessions, you need to install openssh-server package on Ubuntu. With your server machine, open the terminal and paste the following command:

```
sudo apt install openssh-server
```

To enable SSH server, run: 

```
sudo systemctl enable ssh
```

At any time, you can get the status by running `systemctl status ssh`.


## How to set up a firewall on Ubuntu
UFW is an acronym for Uncomplicated Firewall. In this guide we'll make some basic configurations.

Install UFW with the following command:

```
sudo apt install ufw
```

At any time, you can get the status by running `ufw status`.


UFW is inactive by default. Once you activate UFW (`ufw activate`) it blocks **all incoming traffic**. Only outgoing traffic is allowed. To view UFW’s defaults, type the following command:

```
grep 'DEFAULT_' /etc/default/ufw
```

Use the following commands to set policy to block all incoming connection and only allow outgoing connections from the server/firewall:

```
sudo ufw default allow outgoing
sudo ufw default deny incoming
```


## How to allow connection to SSH (TCP port 22) over local network

To allow allow SSH connections to your server:
```
sudo ufw allow ssh
```


In this example we will configure the server to allow incoming SSH connections, but only from IP 192.168.1.155 and sub/net (CIDR) 192.168.2.0/24:

```
sudo ufw allow from 192.168.1.155 to any port 22
sudo ufw allow from 192.168.2.0/24 to any port 22 proto tcp
```

This will allow a device with address 192.168.1.155 to SSH into your Ubuntu server on your local network:

```
ssh your-ubuntu-username@your-ubuntu-server-local-ip
```

To find your local server IP, simply type `ip a` in the server terminal.



## How to enable port forwarding to allow external access
Sign in to your router and set up the following rule:

| Service    | Protocol | External host | Internal host              | External port | Internal port |
|------------|----------|---------------|----------------------------|---------------|---------------|
| SSH        | TCP - UDP| *             | *Your Ubuntu server local IP* | 22            | 22            |
 
While this rules allows any external host, remember that you need to adjust the **UFW** policy to allow incoming traffic for **every external IP address you want to allow access to**. This is done similarly to how we did it for the local network:

```
sudo ufw allow from your-external-ip to any port 22
```


## How to prevent your Ubuntu server from from sleeping (Laptop only)

You can prevent the machine from sleeping when the lid is closed by adjusting the power management settings.

Open a terminal and edit the logind.conf file:

```
sudo nano /etc/systemd/logind.conf
```

Find the line that starts with `#HandleLidSwitch=`. Uncomment it and change its value to ignore:

```
HandleLidSwitch=ignore
```

Save the file and exit the text editor. Restart systemd-logind with the following command:

```
sudo systemctl restart systemd-logind
```

This will restart the service, and your computer should no longer sleep when the lid is closed.


## Bonus: How to create a simple dashboard with Python & Flask

Simply copy and save the following code as a `.py` script.



```python
from flask import Flask, jsonify
from datetime import datetime

app = Flask(__name__)
start_time = datetime.now()

@app.route('/')
def index():
    return """
    <html>
    <head>
        <title>Uptime</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: black;
                color: white;
                font-family: Arial, sans-serif;
            }
            h1 {
                font-size: 24px;
            }
    </style>
    <script>
        function updateUptime() {
            fetch('/uptime')
            .then(response => response.json())
            .then(data => {
                document.getElementById('uptime').innerText = 'Uptime: ' + data.uptime + ' seconds';
            });
        }
        setInterval(updateUptime, 1000);
    </script>
    </head>
    <body>
        <h1 id="uptime">Uptime: Loading...</h1>
    </body>
    </html>
    """

@app.route('/uptime')
def uptime():
    uptime_seconds = (datetime.now() - start_time).total_seconds()
    return jsonify({'uptime': uptime_seconds})

if __name__ == '__main__':
    app.run(debug=True)
```

How cool isn't that? We're running Javascript within HTML within Flask within Python within an Ubuntu server through another computer using SSH.


## How to securely expose your local website with ngrok

Ngrok is a tool that allows you to expose your local server to the internet by providing temporary public URLs for testing and sharing your local server.


- Visit [ngrok.com/download](https://ngrok.com/download) and follow the installation instructions.

- Start a tunnel to your local server's port (e.g., port 5000 for a web server with Flask) using the following command:
  ```
  ngrok http 5000
  ```

- After starting the ngrok tunnel, ngrok will provide you with a unique URL (e.g., `http://abc123.ngrok.io`) that forwards requests to your local server.
- Share this URL with others to grant them access to your local server over the internet.


## Use tmux to exit the SSH session without terminating running scripts

You can use [terminal multiplexers](https://en.wikipedia.org/wiki/Terminal_multiplexer) to create persistent sessions that remain active even after you disconnect from SSH. In this guide we will use tmux.

Install:

```
sudo apt install tmux
```

Start a new tmux session:

```
tmux new -s your_session_name
```

- Run your script (`ngrok http 5000` in this example) within the tmux session.
- Detach from the tmux session by pressing Ctrl+b followed by d.
- Disconnect from SSH. The tmux session will continue running in the background.
- When you reconnect to the server via SSH, you can reattach to the tmux session using:

```
tmux attach -t your_session_name
```

To show all active sessions:

```
tmux list-sessions
```



With Ubuntu, SSH, firewall configurations, port forwarding, power management tweaks you're well on your way to turning your old hardware into something useful.

Happy tinkering!