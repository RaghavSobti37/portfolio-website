# Get found as “Raghav Raj Sobti” + Knowledge Panel path

Site SEO (Person schema, titles, sitemap, robots) is already in the codebase.
Google still decides rankings and Knowledge Panels — this checklist is what you do off-site.

## 1. Make Google know the site exists (do this week)

1. Open https://search.google.com/search-console
2. Add property = your live URL  
   (current: `https://bluepolaroid.com`)
3. Verify (HTML tag or DNS)
4. Sitemaps → submit: `https://…/sitemap.xml`
5. URL Inspection → request indexing for `/` and `/coding`

Optional but strong: attach a **custom domain** you own (`raghavsobti.com` / `bluepolaroid.com`) in Vercel, then update canonical + sitemap to that domain and re-verify in Search Console.

## 2. Same name everywhere (entity consistency)

Use **exactly**: `Raghav Raj Sobti` + `BluePolaroid` + Mumbai / cinematographer on:

- LinkedIn headline
- Instagram bio + name field
- YouTube About
- GitHub profile
- IMDb (create/claim if you have credits)
- Email signature

Google builds Knowledge Panels from **repeated, consistent facts** across the web — not from one portfolio alone.

## 3. Knowledge Panel reality check

A personal Knowledge Panel usually needs **notable public presence**, often including:

- [ ] Wikidata item for you (link sameAs profiles + official website)
- [ ] Wikipedia page *only if* you meet notability (hard for early-career — don’t force)
- [ ] IMDb / film festival / press mentions with your full name
- [ ] Google Search Console + strong branded searches over time

You **cannot buy** a Knowledge Panel. Schema + SEO help Google *understand* you; citations + Wikidata help Google *trust* you enough to show a panel.

### Practical Wikidata path

1. Create account on https://www.wikidata.org  
2. Create item: Raghav Raj Sobti  
3. Add: occupation (cinematographer), location (Mumbai), official website, Instagram, YouTube, LinkedIn  
4. Keep facts sourced (your site, LinkedIn, NYFA where possible)

## 4. Earn branded search

People searching `Raghav Raj Sobti cinematographer` must land on *you*:

- Put the live URL in LinkedIn Featured + About
- YouTube channel description → portfolio link
- Instagram bio link
- Guest posts / credit lists / festival pages that mention full name + link

## 5. After custom domain

Update these files to the new domain:

- `index.html` (canonical, og:url, JSON-LD)
- `public/sitemap.xml`
- `public/robots.txt`
