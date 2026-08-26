# SkillPath

SkillPath is a local-first learning and portfolio planning site for people exploring legitimate online work. It uses browser storage for plans and builder outputs; it does not require an account.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Production configuration

Set `SKILLPATH_SITE_URL` to the public HTTPS origin before launch. This enables absolute URLs in `robots.txt` and `sitemap.xml`. Analytics is deliberately disabled by default in `public/index.html`; configure a reviewed provider only after updating the privacy policy.

## Monetization configuration

Resources are defined centrally in `RESOURCE_CATALOG` in `public/index.html`. All current resources use official non-affiliate URLs. A resource may use an affiliate URL only when its `affiliateStatus` is `"active"` and its verified `affiliateUrl` is a valid HTTPS URL; otherwise SkillPath falls back to `officialUrl`.
