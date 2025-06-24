import os
import re
import requests

TOKEN = os.getenv('GITHUB_TOKEN')
REPO = os.getenv('GITHUB_REPO')  # e.g. "owner/repo"

if not TOKEN or not REPO:
    raise SystemExit('GITHUB_TOKEN and GITHUB_REPO environment variables are required')

API_URL = f'https://api.github.com/repos/{REPO}/issues'
HEADERS = {
    'Authorization': f'token {TOKEN}',
    'Accept': 'application/vnd.github+json'
}

issues = []
current = None
body_lines = []

with open('docs/GITHUB_ISSUES.md', 'r', encoding='utf-8') as f:
    for line in f:
        issue_match = re.match(r'### Issue #\d+: (.*)', line)
        if issue_match:
            if current:
                current['body'] = ''.join(body_lines).strip()
                issues.append(current)
                body_lines = []
            current = {
                'title': issue_match.group(1).strip(),
                'labels': [],
                'assignee': None
            }
            continue
        if current:
            label_match = re.match(r'\*\*Labels\*\*: (.*)', line)
            if label_match:
                current['labels'] = [l.strip('`') for l in label_match.group(1).split(',')]
                continue
            assignee_match = re.match(r'\*\*Assignee\*\*: (.*)', line)
            if assignee_match:
                assignee = assignee_match.group(1).strip()
                if assignee.lower() != 'none':
                    current['assignee'] = assignee
                continue
            end_match = re.match(r'^---', line)
            if end_match:
                if current:
                    current['body'] = ''.join(body_lines).strip()
                    issues.append(current)
                    current = None
                    body_lines = []
                continue
            body_lines.append(line)
    if current:
        current['body'] = ''.join(body_lines).strip()
        issues.append(current)

for issue in issues:
    data = {
        'title': issue['title'],
        'body': issue['body'],
        'labels': issue['labels'],
    }
    if issue['assignee']:
        data['assignees'] = [issue['assignee']]
    resp = requests.post(API_URL, json=data, headers=HEADERS)
    if resp.status_code == 201:
        print(f"Created issue: {issue['title']}")
    else:
        print(f"Failed to create issue {issue['title']}: {resp.status_code} {resp.text}")
