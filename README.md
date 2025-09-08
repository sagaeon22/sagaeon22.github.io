# GitHub Pages Starter

This repo contains a minimal, responsive **portfolio** ready for GitHub Pages.

## 1) Create the repo
- Name it `USERNAME.github.io` (replace with your username).
- Make it **Public**.
- Upload these files (`index.html`, `style.css`) to the root and commit.

## 2) Turn on Pages
- Open **Settings → Pages**.
- **Source:** Branch = `main`, Folder = `/root` (or `/docs` if you prefer keeping site files there).

> If you don’t see “Pages”: ensure the repo is **public**, you’ve made at least **one commit**, and you’re in **repo settings** (not account settings).

## 3) Set a custom domain (optional)
- In **Settings → Pages → Custom domain**, enter your domain (e.g., `sagaeon.com`) and save.
- Then add DNS at your registrar (Namecheap example):

**A records (apex)** for `@` →
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME** for `www` → `USERNAME.github.io`

- Wait for DNS to resolve, then toggle **Enforce HTTPS** in Pages.

## 4) Edit content
- Replace text in `index.html` with your bio and links.
- Duplicate a `.card` block for more projects.
- Colors live in `style.css` `:root` variables.

Enjoy! 🎉
