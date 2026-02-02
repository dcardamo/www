---
title: "Using Todoist as an AI Chat Interface with OpenClaw"
description: "How task comments become a powerful async collaboration channel between humans and AI assistants"
pubDate: 2026-02-02
author: "Dan"
draft: false
tags: ["ai", "openclaw", "todoist", "productivity"]
---

Most AI assistants live in chat apps—WhatsApp, Slack, Discord. But there's a surprisingly powerful alternative: Todoist task comments.

I've been using Todoist as one of my primary interfaces with Rocky (my OpenClaw-powered AI assistant), and it's become my favorite way to collaborate on anything that isn't urgent.

## The Setup

OpenClaw supports Todoist webhooks out of the box. When someone comments on a task, the webhook fires, and Rocky can respond in the same thread. The integration is bidirectional:

- **Dan comments** → Webhook → Rocky sees it → Rocky replies
- **Rocky comments** → Todoist API → Dan gets notification

```
┌─────────────┐     Webhook      ┌─────────────┐
│   Todoist   │────────────────►│  OpenClaw   │
│             │◄────────────────│   (Rocky)   │
└─────────────┘    REST API      └─────────────┘
```

## Why This Works So Well

### 1. Conversations Organized by Topic

Each task is a topic. Comments are the conversation. No scrolling through chat history trying to find "that thing we discussed about the blog post."

Want to revisit a decision? Find the task. The full context is right there.

### 2. Async by Default

Unlike chat, there's no expectation of immediate response. I can drop a comment, close Todoist, and come back later. Rocky processes it during the next heartbeat cycle and replies when ready.

This removes the "always on" pressure of synchronous chat.

### 3. Natural Task Handoffs

The workflow becomes:

1. Create a task (either of us can do this)
2. Assign it to Rocky
3. Chat back and forth in comments
4. Rocky marks it `[DONE]` when finished
5. I review and close

Tasks assigned to Rocky show up in his heartbeat checks. He works through them, commenting with progress. I can follow along or ignore until he's done.

### 4. Deep Links Work Everywhere

Todoist deep links (`https://app.todoist.com/app/task/123`) work on mobile, desktop, and web. If Rocky creates a task and sends me the link via WhatsApp, one tap takes me straight there.

```
Rocky (WhatsApp): Created task for the Costa Rica itinerary
                  https://app.todoist.com/app/task/9977858628
```

### 5. Built-in Notification System

Todoist already handles notifications well. When Rocky comments, I get a push notification. No need to build custom alerting—just piggyback on Todoist's infrastructure.

## The Workflow in Practice

Here's a real example from yesterday:

**Task:** "Go through my email. Extract Costa Rica travel info and add to calendar."

**Comment thread:**
1. Rocky: "Found 18 emails in the Travel_2026.03.CostaRica label. Extracting..."
2. Rocky: "Flights: Mar 15 YOW→LIR, Mar 25 return. Villa: Mar 15-20. Activities: Canopy tour, waterfalls..."
3. Me: "Add to Todoist timeblock instead of calendar"
4. Rocky: "Done! Created 6 time blocks for the trip."
5. Rocky: Marks task `[DONE]`
6. I close the task

Total time: ~10 minutes of Rocky's work, 30 seconds of my input. And I have a complete record of what was done.

## Setting It Up

### 1. Create a Todoist App

Go to the [Todoist Developer Console](https://developer.todoist.com/appconsole.html) and create an app. You'll need:
- Client ID and Secret (for OAuth)
- Webhook URL pointing to your OpenClaw instance

### 2. Configure OpenClaw

In your OpenClaw config, add the Todoist channel:

```yaml
channels:
  todoist:
    enabled: true
    clientId: "your-client-id"
    clientSecret: "your-client-secret"
    webhookSecret: "your-webhook-secret"
```

### 3. Set Up the Webhook

Todoist needs to reach your OpenClaw instance. Options:
- **Tailscale Funnel** — Expose a local port securely
- **Cloudflare Tunnel** — Similar, if you use Cloudflare
- **Public server** — If your OpenClaw runs on a VPS

### 4. Authenticate

OAuth flow to connect your Todoist account. OpenClaw handles this with a `/todoist/auth` endpoint.

## Tips for Effective Use

**Use task assignments.** Assign tasks to Rocky (by Todoist user ID) so they show up in his work queue. Don't rely on @mentions in comments.

**Keep one topic per task.** If the conversation drifts, create a new task. This keeps threads focused and searchable.

**Use `[DONE]` prefix.** Rocky marks tasks `[DONE]` when finished but doesn't auto-complete them. This gives me a chance to review before closing.

**Link from other channels.** If a WhatsApp conversation needs tracking, create a Todoist task and share the link. Now it's organized.

## When to Use Chat vs. Todoist

| Use Case | Channel |
|----------|---------|
| Quick questions | WhatsApp/Telegram |
| Urgent alerts | WhatsApp |
| Multi-step work | Todoist |
| Anything needing a record | Todoist |
| Async collaboration | Todoist |

The rule: if it'll take more than one exchange, make it a task.

## Wrapping Up

Todoist-as-chat-interface sounds weird until you try it. The combination of:
- Topic-based organization
- Async expectations
- Natural task lifecycle
- Good mobile experience

...makes it genuinely better than chat for certain workflows. Not everything—urgent stuff still goes to WhatsApp. But for collaborative work with an AI assistant, task comments are surprisingly powerful.

Give it a try. Create a task, assign it to your AI, and start chatting in comments. You might not go back.
