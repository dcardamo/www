---
title: "Giving AI Agents Secure File Access with NFS over Tailscale"
description: "How to safely share files with sandboxed AI agents using NFS mounts over a Tailscale mesh network"
pubDate: 2026-02-02
author: "Dan"
draft: true
tags: ["ai", "self-hosting", "tailscale", "nfs", "security"]
---

AI agents are getting more capable, but with capability comes risk. A coding assistant that can read and write files is incredibly useful—until it decides to `rm -rf /` or exfiltrates your SSH keys. The solution is sandboxing: run the agent on an isolated machine where the blast radius is limited.

But sandboxing creates a new problem: the agent can't access the files it needs to be useful. How do you give an AI assistant access to your email, documents, or media library without giving it the keys to the kingdom?

## The Problem: Sandboxing vs. Utility

I run an AI assistant (Rocky, powered by [OpenClaw](https://openclaw.ai)) on a dedicated NixOS machine. It has its own workspace, can run code, and manages my tasks. But it's sandboxed—it can't reach into my Mac to read email or browse my photo library.

That's a feature, not a bug. I don't want an AI agent with full access to everything. But I *do* want it to:

- Read my email (to summarize newsletters, track follow-ups)
- Access shared documents (trip itineraries, reference materials)  
- Browse media files (for photo management tasks)

The key insight: most of these are **read-only** use cases. The agent needs to see the data, not modify it.

## The Solution: NFS over Tailscale

The answer is NFS (Network File System) mounted over a Tailscale mesh network:

1. **Tailscale** creates a secure, encrypted mesh between your machines—no port forwarding, no public exposure
2. **NFS** shares specific directories with granular permissions
3. **Read-only mounts** ensure the agent can read but never write

Here's how it works:

```
┌─────────────────┐         Tailscale         ┌─────────────────┐
│   Your Mac      │◄────────mesh network─────►│  Agent Machine  │
│   (venus)       │                           │   (neptune)     │
│                 │                           │                 │
│  /Users/dan/    │      NFS export (ro)      │  /mnt/venus/    │
│    Mail/        │─────────────────────────►│    imap/        │
│    Documents/   │                           │    docs/        │
└─────────────────┘                           └─────────────────┘
```

### Setting Up the NFS Server (macOS)

On your Mac, configure NFS exports in `/etc/exports`:

```
/Users/dan/Library/Mail -ro -mapall=nobody venus
/Users/dan/Documents/Shared -ro -mapall=nobody venus
```

The flags:
- `-ro` — read-only (critical!)
- `-mapall=nobody` — all access appears as the `nobody` user
- `venus` — only allow connections from this Tailscale hostname

Enable NFS:

```bash
sudo nfsd enable
sudo nfsd restart
```

### Setting Up the NFS Client (NixOS)

On the agent's machine, add the mount to your NixOS config. Here's a production-ready configuration with all the important options:

```nix
# NFS mounts from mac-server (macOS) over Tailscale
fileSystems."/mnt/mac-server/imap" = {
  device = "100.x.x.x:/Volumes/Data/imap";  # Tailscale IP
  fsType = "nfs";
  options = [
    "ro"                  # Read-only (critical for security!)
    "noauto"              # Don't mount at boot (tailscale may not be ready)
    "nofail"              # Don't fail boot if mount unavailable
    "x-systemd.automount" # Mount on first access
    "x-systemd.idle-timeout=300"  # Unmount after 5 min idle
    "x-systemd.mount-timeout=30"  # Fail mount attempt after 30s
    "x-systemd.requires=tailscaled.service"
    "nfsvers=3"           # macOS NFS compatibility
    "hard"                # Wait for server (data integrity)
    "timeo=150"           # 15 second timeout between retries
    "retrans=3"           # 3 retries per operation
    "actimeo=30"          # Cache attributes for 30 sec
    "noatime"             # Don't update access time
  ];
};
```

The key options explained:

- **`noauto` + `x-systemd.automount`** — Don't mount at boot (Tailscale might not be connected yet), but mount automatically on first access
- **`x-systemd.requires=tailscaled.service`** — Ensures Tailscale is running before attempting mount
- **`x-systemd.idle-timeout=300`** — Unmount after 5 minutes of inactivity (clean reconnect on next access)
- **`x-systemd.mount-timeout=30`** — Fail fast if the server is unreachable (vs. hanging forever)
- **`hard`** — Keep retrying if server goes away (prevents partial reads and data corruption)
- **`nfsvers=3`** — macOS compatibility (macOS NFS server works best with NFSv3)

Or mount manually for testing:

```bash
sudo mount -t nfs -o ro,nfsvers=3 100.x.x.x:/Volumes/Data/imap /mnt/mac-server/imap
```

### Why Tailscale Matters

You could do this with plain NFS over your local network, but Tailscale adds important properties:

1. **Encryption** — NFS traffic is encrypted in transit
2. **No port exposure** — NFS ports aren't open to the internet
3. **Works anywhere** — The agent can access files even if you're on different networks
4. **ACLs** — Tailscale ACLs can restrict which machines can connect

## Use Case: Read-Only Email Access

One killer use case is email. My Mac syncs email to a local Maildir using `mbsync`. The agent mounts that Maildir read-only:

```
/mnt/venus/imap/dan_cardamore_ca/
├── INBOX/
├── Sent/
├── Archive/
├── Labels/
│   └── Travel_2026.03.CostaRica/
└── ...
```

Now the agent can:
- Search through emails
- Summarize newsletters
- Extract travel itineraries from labeled folders
- Track which sent emails need follow-up

But it **cannot**:
- Delete emails
- Send emails (requires separate SMTP credentials)
- Modify anything

The agent has useful read access without the ability to cause damage.

## Security Considerations

This setup is reasonably secure, but think through the implications:

1. **Data exposure** — The agent can read everything in the mounted directories. Don't mount sensitive directories unless the agent needs them.

2. **Read-only isn't bulletproof** — The agent can still exfiltrate data (copy contents, send them elsewhere). Sandboxing limits damage, not data access.

3. **Tailscale key security** — If the agent's machine is compromised, the attacker has NFS access. Treat the agent machine's Tailscale key as sensitive.

4. **Principle of least privilege** — Mount only what's needed. Separate mounts for email vs. documents vs. media, so you can revoke access granularly.

## Wrapping Up

NFS over Tailscale hits a sweet spot for AI agent file access:
- **Secure** — Encrypted, not exposed to the internet
- **Controlled** — Read-only mounts, specific directories only  
- **Simple** — Standard tools, no custom code
- **Flexible** — Works across different machines and networks

My AI assistant can now read my email, browse shared documents, and access reference materials—all without the ability to modify or delete anything. It's the best of both worlds: useful access with limited risk.

The sandboxing philosophy: give agents access to what they need, in the most restricted way possible. NFS read-only mounts are one piece of that puzzle.
