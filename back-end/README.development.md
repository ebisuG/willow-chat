# Development

# Overview
On 2024/9/25, Vercel doesn't support Golang fully. It only surpports it as Serverless Functions.<br>
Serverless Functions handles Golang like script. There are some name and folder conventions.<br>
Please check:
https://vercel.com/docs/functions/runtimes/go

## File/Folders

### vercel.json
key property can't have duplicated key, make sure select one value.
Top one is for preview, bottom one is for production.
```bash
                {
                    "key": "Access-Control-Allow-Origin",
                    "value": "https://willow-chat-git-develop-ebisus-projects-5461df08.vercel.app"
                },
                {
                    "key": "Access-Control-Allow-Origin",
                    "value": "https://willow-chat-phi.vercel.app"
                },
```