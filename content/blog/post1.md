---
title: "Your Terminal Can Be Much More Productive, Beautiful, and User-Friendly!"
date: "2024-03-19"
---

## How About Saying Goodbye to That Dull and "Dumb" Terminal, Where You Have to Do Everything Manually?

That old black-and-green terminal, reminiscent of a green phosphor monitor, is a thing of the past. Along with it, the need to repeatedly perform the same tasks has also disappeared. After all, isn't automation meant to handle repetitive tasks for us?

The following tips apply to almost all terminals and operating systems, but I strongly recommend using Linux (or at least macOS) and the Kitty terminal. I have to admit, it's my favorite.

### First, Installing Kitty:

For Ubuntu:

```bash
sudo add-apt-repository universe
sudo apt update
sudo apt install kitty
```

For Debian:

```bash
sudo apt-get install kitty
```

For Arch Linux (a.k.a. the best distro in the world):

```bash
sudo pacman -S kitty
```

For Fedora:

```bash
sudo dnf install kitty
```

For OpenSUSE:

```bash
sudo zypper install kitty
```

### Customizing Kitty

After installing Kitty, we need to customize it. It comes with a very basic setup, which is generally a good thing since it allows us to tailor it to our preferences.

First, let's prepare the customization by creating a directory and a configuration file (if they haven't been created already):

```bash
mkdir -p ~/.config/kitty/
touch ~/.config/kitty/kitty.conf
```

Now, let's clone the Gruvbox Material repository (I highly recommend it as it's the most pleasant theme for long programming sessions):

```bash
cd ~/.config/kitty
git clone https://github.com/rsaihe/gruvbox-material-kitty.git
```

Inside the Gruvbox Material folder, there are several theme variations, ranging from light to dark. Choose your favorite and include it at the end of your `kitty.conf` file:

```bash
include "PATH TO THE FILE"
```

### Enhancing Your Terminal Further

To make your terminal even more powerful, I recommend using the [Fira Code font](https://github.com/tonsky/FiraCode/wiki/Installing).

Once that’s done, let's install Oh My Zsh. First, we need to install Zsh.

For Fedora:

```bash
dnf install zsh
```

For Arch:

```bash
pacman -S zsh zsh-completions
```

For OpenSUSE:

```bash
zypper in zsh
```

For Ubuntu:

```bash
apt install zsh
```

For OpenBSD:

```bash
pkg install zsh bash
```

After that, Oh My Zsh will handle the rest of the setup:

```bash
curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh; zsh
```

If your terminal doesn’t switch to Zsh automatically, use this command:

```bash
sudo usermod --shell $(which zsh) $USER
```

### Installing Plugins

Now that the hard part is done, let’s install some useful plugins. Two that I use are `zsh-syntax-highlighting` and `zsh-autosuggestions`. To install them, run the following commands:

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

To activate them, add them to the list of active plugins in your `~/.zshrc` file. Here’s the list I use:

```bash
plugins=(
git
zsh-syntax-highlighting
zsh-autosuggestions
catimg
copybuffer
copyfile
dircycle
dirhistory
extract
git-prompt
gitfast
gitignore
history
jsontools
fzf
)
```

If you want to use the same plugins, you also need to install Fzf (a file search tool) using the following command. Just type “y” to confirm the installation prompts:

```bash
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf && ~/.fzf/install
```

### Bonus Tip: A Cleaner and More Elegant Theme

```bash
git clone https://github.com/cdimascio/lambda-zsh-theme.git && cp cdimascio-lambda.zsh-theme $ZSH_CUSTOM/themes
```

Then, modify the line that starts with `ZSH_THEME` in your `~/.zshrc` file:

```bash
ZSH_THEME="cdimascio-lambda"
```

Finally, apply the changes by running:

```bash
source ~/.zshrc
```

### Final Thoughts

If you followed all the steps correctly, your terminal should now be significantly more powerful, beautiful, and user-friendly!
