# Deploying aetherr.site

Domain: **aetherr.site** (Namecheap, $1.18/yr).
Hosting: GitHub Pages (free, Student Pack covered).
Total time end-to-end: ~10 minutes after the order confirms.

## Step-by-step

### 1. Push `web/` to a new repo

Easiest: dedicated repo named `aether-site`, contents of this folder at the root.

```bash
cd web/
git init
git add .
git commit -m "initial landing"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aether-site.git
git push -u origin main
```

The `CNAME` file with `aetherr.site` in it is already committed — that's
what GitHub Pages reads to know it should serve traffic for that domain.

### 2. Enable GitHub Pages

Repo on github.com:

1. **Settings → Pages**
2. *Build and deployment* → **Source: Deploy from a branch**
3. **Branch: `main` / folder: `/ (root)`** → Save

You'll see *"Your site is live at `https://YOUR_USERNAME.github.io/aether-site/`"*
within 30 sec. Open it, confirm everything renders. Hard-refresh (Ctrl+F5)
if styles look broken — first deploy caches aggressively.

### 3. Plug placeholders in `index.html`

Open `index.html` and search/replace:

| Placeholder            | Replace with                                              |
|------------------------|-----------------------------------------------------------|
| `DISCORD_INVITE_URL`   | Your permanent invite — `https://discord.gg/xxxx` (×2)    |
| `VIRUSTOTAL_SCAN_URL`  | Link to VT scan of latest build                           |
| `CONTACT_EMAIL`        | Contact address (proton, simplelogin, whatever)           |

Commit + push. Pages rebuilds in ~20 sec.

### 4. Point Namecheap DNS at GitHub

In Namecheap dashboard:

**Domain List → Manage `aetherr.site` → Advanced DNS tab**

Delete every row that's there by default (the parking redirect, the
URL-forwarding record, etc. — all of it).

Add **4 A records** (one per row, all with Host = `@`):

| Type | Host | Value                | TTL       |
|------|------|----------------------|-----------|
| A    | @    | 185.199.108.153      | Automatic |
| A    | @    | 185.199.109.153      | Automatic |
| A    | @    | 185.199.110.153      | Automatic |
| A    | @    | 185.199.111.153      | Automatic |

Add **1 CNAME record** so `www.aetherr.site` works too:

| Type  | Host | Value                          | TTL       |
|-------|------|--------------------------------|-----------|
| CNAME | www  | YOUR_USERNAME.github.io.       | Automatic |

**Important:** trailing dot on the CNAME value. Namecheap usually adds it
automatically, but verify after saving. Hit the green checkmark to save.

### 5. Tell GitHub the domain is yours

Back in the repo: **Settings → Pages → Custom domain → paste `aetherr.site` → Save.**

GitHub runs a DNS check. Two outcomes:

- ✅ green check → DNS already propagated, you're done. Tick **Enforce HTTPS**
  (the box appears once the cert provisions, ~1 min after the green check).
- ⏳ yellow/red → DNS hasn't propagated yet. Wait 5–15 min, refresh the page,
  the check re-runs automatically. Don't worry, this is normal.

Once HTTPS is enforced, `http://aetherr.site` redirects to `https://aetherr.site`
and you have a free Let's Encrypt cert auto-renewed forever.

### 6. Verify

Open these in a private window (avoid cache):
- `https://aetherr.site/` — main landing
- `https://aetherr.site/asdkjasdkjasdj` — should show the custom 404
- `https://www.aetherr.site/` — should redirect to apex

If anything's wrong, run `nslookup aetherr.site 8.8.8.8` from the terminal
to confirm the A records actually resolve to the four GitHub IPs.

---

## Updating later

```bash
cd web/
# edit whatever
git add .
git commit -m "tweak"
git push
```

Pages rebuilds within ~20 sec. No CI to set up.

## What this site does NOT do

- Track visitors (no analytics).
- Host the cheat build (download stays gated behind Discord captcha).
- Phone home from the cheat (don't add this without thinking hard about it).
