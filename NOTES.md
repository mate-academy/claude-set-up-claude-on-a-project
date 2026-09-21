What did you put in your CLAUDE.md, and what did you deliberately leave out, and why?
I put in CLAUDE.md ## Conventions because I think code style and correct structure of a project it's important part of project. I remove some archecture description because that needs too much place in a file and I'm not sure that Claude.md should have so much details
Which permission rules did you add, and what could go wrong without your deny rule?
I added to `allow` run test and lin because they cant change anything important in a project. I added git push to ask beacuse this operation has some risks in unexpected changes in a repo; I added reading .env and git push force in deny because these comd cand change a repo without any confirmation or some secure creditinals can get public
