# NVidia Drivers

NVidia drivers have been notoriously painful on linux systems.

Also see the [Arch wiki page](https://wiki.archlinux.org/title/NVIDIA).

## Installing Drivers

Most of the time, you'll be able to just install via your systems package
manager. This will be something like `sudo apt install nvidia-driver-550` or
`sudo pacman -Syu nvidia`. This **WILL** vary between systems, so I recommend
you find a guide somewhere in your chosen distribution's documentation.

Sometimes you won't be able to install from your systems package manager. There
can be a few reasons for this, for example if you want a newer driver version
than the latest package.

Sometimes you'll be able to install newer driver versions through resources
like the
[Arch User Repository](https://wiki.archlinux.org/title/Arch_User_Repository).

If you can't get the drivers you want from a prepackaged repository of some
sort, the most reliable way to get drivers is to install them manually from
nvidia's website. This is a simple 5 step process, however no online guide
seems to be able to properly explain it. In fact the ordering of the first 3
steps doesn't even matter, as long as they all happen at some point before the
last two.

Detailed instructions can be found on nvidia's website, in the same place you
download the drivers, under "additional information". Click on the `README`
link to get an in depth and very useful set of instructions. At the time of
writing, the latest feature drivers are at version `565.77`. The link to the
instructions for this specific driver is
[here](http://us.download.nvidia.com/XFree86/Linux-x86_64/565.77/README/installdriver.html).

1.  Download the drivers you want from
    [NVidia's website](https://www.nvidia.com/en-us/drivers/unix/)

2.  Uninstall any nvidia related packages. An example of how to do this is with
    `apt purge '*nvidia*'` for debian based systems.

3.  Install DKMS (optional). If you ever update your linux kernel version,
    you'll need to reinstall your drivers. If you install dkms, the same
    drivers can be used with different kernel versions (not all of them
    though).

4.  Run `sh ./NVIDIA-Linux-x86_64-565.77.run` (or whatever your file is called)
    as root, such as with `sudo`, and follow the prompts. See also
    [MIT/GPL or Proprietary](#mitgpl-or-prioprietary).

5.  Reboot your system.

### MIT/GPL or Prioprietary

Some time during step 4 above you'll likely encounter a question asking if you
want to install MIT/GPL (i.e. open source) kernel modules or proprietary nvidia
ones. Both of them are offically supported and developed by nvidia, and they
have pretty much reached feature parity afaik. This means the decision won't
really matter.

It appears that, as of the time of writing (2024-12-17), the open source kernel
modules don't implement RTD3 on turing cards, which basically means if you have
a computer with a new nvidia gpu you won't get the same power savings as you
will with the proprietary modules.

More information can be found on the
[nvidia open gpu kernel repo](https://github.com/NVIDIA/open-gpu-kernel-modules/discussions/457)
and the linked
[forum post for 560 drivers](https://forums.developer.nvidia.com/t/clarifying-560-series-drivers-open-sourcedness-vs-kernel-module-type-proprietary/292698/2).

## New GPU

If you have a very new graphics card, for example a 4000 series card, you will
need newer drivers which can support it. These won't always be available on
some distributions such as debian.

See [Installing Drivers](#installing-drivers).

## Musl Libc

Proprietary nvidia drivers dynamically link with glibc, so they won't work on
musl libc systems.

The only real solution is to use nouveau drivers instead. Yay.

As usual, someone on the internet seems to have had this issue before and
posted some stuff on github [git-bruh/nvidia-musl](https://github.com/git-bruh/nvidia-musl).
Maybe it'll help. It is likely also somewhat outdated. Good luck.

See also [musl](/issues/musl.md).

## Wayland

If you plan on running wayland, it is a good idea to have drivers which are at
least version 555, as that is when nvidia added explicit sync support.

Wayland is a new window management protocol to replace Xorg/X11. It's got a lot
of backing behind it and is supposed to be faster and better. It really is, but
there are a lot of X11 based hacks out there which make the X11 experience good
enough for most people, especially with a mainstream desktop environment.

If you do want to use wayland, NVidia has had issues with explicit sync. These
are fortunately pretty much all resolved, so you shouldn't encounter any
problems. But there's a catch. You need at least the 555 drivers.

See [Installing Drivers](#installing-drivers) for how to get newer or specific
driver versions.

## Copyright

Copyright (c) 2024 Cyuria. All Rights Reserved.
