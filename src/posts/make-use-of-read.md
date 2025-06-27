---
title: Make use of read command
subtitle: 
date: 2025-06-27
language: English
tags:
  - Nodejs
  - bash
---
So the read command allows us to read from stdin. When we use it the execution of the script is stopped until user clicks Enter. If we specify a variable after that command, the user's input is assigned to that variable and then can be used in the rest of the script.

```bash
# wait for user to review changes
echo "Review changes and press Enter to continue"
read

# ask for commit message
echo "Enter commit message: "
read commit_message

git commit -m "$commit_message"

# ask to push it or cancel
echo "Press Enter to push or type 'cancel' to cancel"
read push_or_cancel

if [ "$push_or_cancel" = "cancel" ]; then
  echo "Canceled"
  exit 0
fi

git push
```