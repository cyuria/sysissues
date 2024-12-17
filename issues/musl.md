# The Musl Libc

The musl libc is a lightweight, posix compliant glibc alternative. For full
details, see [musl.libc.org](https://musl.libc.org/).

Musl can lead to incompatibilities with many programs. This is because binaries
usually dynamically link with glibc. As it turns out, it is actually not
possible to statically link glibc, so most statically linked binaries on Linux
systems actually use musl.

## Open Source

If you have access to the source code of a program or library or whatever, you
can often just compile it yourself. Sometimes there will be bugs though and
that can cause issues. If this is the case, some of the
[closed source solutions](#proprietary-applications) might be of use.

## Proprietary Applications

Many closed source programs dynamically link to glibc. The solution for open
source code is to compile it yourself, however this isn't exactly possible.

1.  `flatpak` automatically sandboxes glibc, so if you can find the application
    as a flatpak app, they should all work fine.

2.  `docker` and virtualisation. This is probably the next easiest solution,
    however you end up running everything in a sandbox which can be annoying
    and a dealbreaker for some applications.

3.  `libgcompat`. This is a library primarily pioneered by Adelie linux. It
    seems promising, however I've personally never needed to get it working, so
    you're on your own here. The idea is to preload `libgcompat` with
    `LD_PRELOAD` and then it will act as a compatibility layer between musl and
    glibc.

4.  `voidnsrun`. As is often the case, some guy on the internet has had this
    problem before. [gch1p/voidnsrun](https://github.com/gch1p/voidnsrun) is a void linux
    specific utility for creating an isolated namespace containing glibc for
    when your primary environment is musl libc void linux. As it uses linux
    namespace features, most of it should be applicable to any system as long
    as you can get the namespace set up. See
    [ch1p's blog post](https://ch1p.io/void-linux-musl-glibc/).

5.  `chroot`. If you need to, you can set up a chroot environment with glibc,
    as suggested by the
    [void linux documentation](https://docs.voidlinux.org/installation/musl.html#glibc-chroot).

6.  Don't use the program. This isn't really a solution, but there are often
    open source alternatives and it will likely be much easier to get those
    working than using one of the other presented options here. Some packages,
    like nvidia drivers, will not work with any of the other options. The only
    thing you can do is use an alternative, like nouveau drivers.

## NPM node-libcurl

The NPM binaries for `node-libcurl` dynamically link with `libstdc++`. This
itself dynamically links to glibc, and so is often not available on systems
using the musl libc implementation.

The solution is to compile node-libcurl yourself, which can be done with npm.

1.  Ensure all the requisite dependencies have been installed. See the
    [node-libcurl repo](https://github.com/JCMais/node-libcurl#building-on-linux).

2.  Obtain the package itself. This can be done with `npm install` and then
    going into the package directory inside `node_modules/`.

3.  Build the module with `npm run build`.

There are likely other ways to do this as well, however they are not documented
here.

## Copyright

Copyright (c) 2024 Cyuria. All Rights Reserved.
