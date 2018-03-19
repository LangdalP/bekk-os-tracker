# Bekk Open Source Tracker
Skal visualisere bekkere sine bidrag til åpen kildekode.

[Klikk her](https://bekk-os-tracker.azurewebsites.net/api/pages/prs) for å se pull requests.

## Kort om koden
Koden kjøres i Azure Functions, og blir deploya for hver commit til master-greina.
Om du skal kjøre koden lokalt trenger du filen `local.settings.json` som inneholder hemmelige credentials. Spør Peder om denne.

- Funksjonen `update_pr_table` sjekker om det har kommet nye pull requests for hvert medlem i faggruppa, og putter de i en Azure Storage Table. Dette gjør vi for å ikke få problemer med GitHub API-et sine rate limits.
- Funksjonen `prs` spytter ut alle pull requests for alle medlemmer som JSON
- Funksjonen `prs_page` kaller `prs` og viser alle pull requests

## TODO
- Finne ut hva vi vil vise
- Backend må lagre flere data per PR
- Må lage en måte å oppdatere lagrede PR-data (f.eks. status)
    * Akkurat nå kan vi bare legge til nye PRs
- Lage en frontend
