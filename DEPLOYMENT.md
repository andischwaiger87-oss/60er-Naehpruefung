# Anleitung zum Veröffentlichen (Deployment)

Dein Projekt ist bereit! Hier sind die Schritte, um es online zu stellen.

## 1. GitHub (Code hochladen)

1.  Logge dich bei **[GitHub](https://github.com)** ein.
2.  Erstelle ein **neues Repository** (Feld oben rechts "+" -> "New repository").
    *   **Repository name:** z.B. `rosas-60er-game`
    *   Drücke auf **Create repository**.
3.  Kopiere den Link zu deinem neuen Repository (z.B. `https://github.com/DEIN_NAME/rosas-60er-game.git`).
4.  Führe folgende Befehle in deinem Terminal (hier in VS Code) aus:

```bash
# Füge dein GitHub-Repo als Ziel hinzu (ersetze den Link!)
git remote add origin https://github.com/DEIN_USER_NAME/DEIN_REPO_NAME.git

# Benenne den Hauptzweig um
git branch -M main

# Lade den Code hoch
git push -u origin main
```

## 2. Cloudflare Pages (Online stellen)

1.  Logge dich bei **[Cloudflare Dashboard](https://dash.cloudflare.com)** ein.
2.  Gehe zu **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3.  Wähle dein GitHub-Konto und das neue Repository (`rosas-60er-game`) aus.
4.  Konfiguriere die Build-Einstellungen:
    *   **Framework preset:** `Vite` (oder `React`, Vite ist besser)
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`
5.  Klicke auf **Save and Deploy**.

Das war's! Cloudflare baut nun deine Seite und gibt dir in wenigen Sekunden eine URL (z.B. `rosas-60er-game.pages.dev`), die du teilen kannst.
