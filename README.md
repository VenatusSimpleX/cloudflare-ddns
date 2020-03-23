# Cloudflare DDNS

A quick script to update your DNS for a specific A record.

## Installation

1. Download the script by either the green button at the top right, or via `git clone`
1. `cd cloudflare-ddns`
1. `npm install`

## Configuration

1. Copy `.env.sample`, paste and rename it as `.env`
1. Fill up `.env` with what it needs

## Running the script

1. `npm run ddns`

## Cron

This script is meant to be run via cron.

So for example, I want to run my script at 4:05AM in the morning, what I need to put into my `crontab` is:

```
5 4 * * * cd ~/cloudflare-ddns && npm run ddns
```
